import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
} from "framer-motion";
import { ArrowLeft, ArrowRight, Music } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";

/* =====================================================================
   SHADER — Flowing Staff & Notes with Click Ripple
   ===================================================================== */
const VERT = `attribute vec2 a_position;void main(){gl_Position=vec4(a_position,0.0,1.0);}`;

const FRAG = `
precision highp float;
uniform float u_time;
uniform vec2  u_resolution;
uniform vec2  u_mouse;
uniform float u_clickTime;
uniform vec2  u_clickPos;

float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}
float noise(vec2 p){
  vec2 i=floor(p),f=fract(p);
  f=f*f*(3.0-2.0*f);
  float a=hash(i),b=hash(i+vec2(1.,0.)),c=hash(i+vec2(0.,1.)),d=hash(i+vec2(1.,1.));
  return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);
}

// ── Staff lines ──
float staffLine(vec2 uv,float y,float thick){
  float d=abs(uv.y-y);
  return smoothstep(thick,0.0,d);
}

// ── Note head ──
float noteHead(vec2 uv,vec2 center,float rx,float ry){
  vec2 d=(uv-center)/vec2(rx,ry);
  float l=length(d);
  return smoothstep(1.05,0.95,l);
}

// ── Ripple ──
float ripple(vec2 uv,vec2 center,float t){
  if(t<0.0)return 0.0;
  float d=distance(uv,center);
  float wave=sin(d*30.0-t*8.0)*0.5+0.5;
  float ring=smoothstep(t*0.6+0.1,t*0.6-0.05,d)*smoothstep(t*0.6-0.3,t*0.6-0.05,d);
  return wave*ring*exp(-t*1.5);
}

void main(){
  vec2 uv=gl_FragCoord.xy/u_resolution;
  vec2 p=uv*2.0-1.0;
  p.x*=u_resolution.x/u_resolution.y;

  float t=u_time;
  vec3 col=vec3(0.0);

  // Background subtle grain
  col+=vec3(0.02,0.02,0.025)*(hash(uv*1000.0+t)*0.3+0.7);

  // ── Flowing staff lines ──
  float staffY=0.0;
  float lineSpacing=0.08;
  for(int i=0;i<5;i++){
    float y=staffY+float(i)*lineSpacing;
    float wave=sin(p.x*2.0+t*0.3+float(i)*0.5)*0.015;
    float line=staffLine(p,y+wave,0.003);
    col+=vec3(0.18,0.18,0.20)*line;
  }

  // ── Treble clef hint (abstract swirl) ──
  float clef=smoothstep(0.12,0.08,length(p-vec2(-0.55,0.16)));
  float clefSwirl=sin(atan(p.y-0.16,p.x+0.55)*3.0+t)*0.5+0.5;
  col+=vec3(0.15,0.15,0.17)*clef*clefSwirl*0.4;

  // ── Floating note particles ──
  float noteAlpha=0.0;
  for(int i=0;i<12;i++){
    float fi=float(i);
    float nx=hash(vec2(fi,1.0))*2.8-1.4;
    float ny=hash(vec2(fi,2.0))*0.5-0.15;
    float beat=sin(t*2.5+fi*1.3)*0.5+0.5;
    float bounce=beat*0.04;
    float noteX=nx+sin(t*0.4+fi)*0.15;
    float noteY=ny+bounce+sin(t*0.7+fi*2.0)*0.02;
    float noteSize=0.018+beat*0.006;
    float n=noteHead(p,vec2(noteX,noteY),noteSize*1.3,noteSize);
    noteAlpha+=n*0.7;
  }
  col+=vec3(0.22,0.22,0.24)*noteAlpha;

  // ── Stem lines ──
  for(int i=0;i<8;i++){
    float fi=float(i);
    float sx=hash(vec2(fi,3.0))*2.4-1.2;
    float sy=hash(vec2(fi,4.0))*0.4-0.1;
    float stemH=0.12+hash(vec2(fi,5.0))*0.06;
    float stemW=0.003;
    float stem=smoothstep(stemW,0.0,abs(p.x-sx))*smoothstep(sy+stemH,sy+stemH-0.01,p.y)*smoothstep(sy,sy+0.01,p.y);
    col+=vec3(0.16,0.16,0.18)*stem*0.6;
  }

  // ── Click ripple ──
  if(u_clickTime>=0.0){
    vec2 clickUV=u_clickPos/u_resolution*2.0-1.0;
    clickUV.x*=u_resolution.x/u_resolution.y;
    float r=ripple(p,clickUV,u_clickTime);
    col+=vec3(0.25,0.25,0.28)*r;
  }

  // ── Mouse hover glow ──
  vec2 mouseUV=u_mouse/u_resolution*2.0-1.0;
  mouseUV.x*=u_resolution.x/u_resolution.y;
  float mouseDist=distance(p,mouseUV);
  float mouseGlow=smoothstep(0.5,0.0,mouseDist)*0.04;
  col+=vec3(0.2,0.2,0.22)*mouseGlow;

  // Vignette
  float vig=1.0-smoothstep(0.5,1.5,length(uv*2.0-1.0));
  col*=0.85+vig*0.15;

  gl_FragColor=vec4(col,1.0);
}
`;

function createShader(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(s));
    gl.deleteShader(s);
    return null;
  }
  return s;
}

function createProgram(gl: WebGLRenderingContext, vs: string, fs: string) {
  const prog = gl.createProgram()!;
  const vShader = createShader(gl, gl.VERTEX_SHADER, vs);
  const fShader = createShader(gl, gl.FRAGMENT_SHADER, fs);
  if (!vShader || !fShader) return null;
  gl.attachShader(prog, vShader);
  gl.attachShader(prog, fShader);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(prog));
    return null;
  }
  return prog;
}

function StaffShaderCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const clickRef = useRef({ time: -10, x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { alpha: false, antialias: false });
    if (!gl) return;

    const prog = createProgram(gl, VERT, FRAG);
    if (!prog) return;

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);

    const aPos = gl.getAttribLocation(prog, "a_position");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uRes = gl.getUniformLocation(prog, "u_resolution");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");
    const uClickTime = gl.getUniformLocation(prog, "u_clickTime");
    const uClickPos = gl.getUniformLocation(prog, "u_clickPos");

    const mouseRef = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.x = e.clientX - rect.left;
      mouseRef.y = rect.height - (e.clientY - rect.top);
    };
    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      clickRef.current = {
        time: 0,
        x: e.clientX - rect.left,
        y: rect.height - (e.clientY - rect.top),
      };
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    let raf = 0;
    const start = performance.now();
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = (performance.now() - start) / 1000;
      clickRef.current.time += 1 / 60;

      gl.useProgram(prog);
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
      gl.uniform1f(uTime, t);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uMouse, mouseRef.x * (canvas.width / canvas.clientWidth), mouseRef.y * (canvas.height / canvas.clientHeight));
      gl.uniform1f(uClickTime, clickRef.current.time);
      gl.uniform2f(uClickPos, clickRef.current.x * (canvas.width / canvas.clientWidth), clickRef.current.y * (canvas.height / canvas.clientHeight));
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("click", onClick);
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full cursor-pointer"
      style={{ zIndex: 0 }}
      title="点击产生涟漪"
    />
  );
}

/* =====================================================================
   Animation Helpers
   ===================================================================== */
function ScrollReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 1.2, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function LineReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ duration: 1, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* =====================================================================
   Sections
   ===================================================================== */

/* ── Hero ── */
function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden bg-black">
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=1920&q=80"
          alt="Piano keys"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "grayscale(100%) contrast(1.1)" }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-[10px] tracking-[0.5em] uppercase text-white/40 mb-8 font-medium"
        >
          琴鸣声乐工作室 · 钢琴教育理念
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light text-white leading-[1.1] tracking-tight max-w-4xl"
        >
          技术是通往自由的门票
          <br />
          <span className="text-white/50">而情感是音乐的终点</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-16 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ── Color-Reveal Image Section ── */
function ColorRevealSection({
  imageUrl,
  children,
  caption,
}: {
  imageUrl: string;
  children: React.ReactNode;
  caption?: string;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const grayscale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 100, 0, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [8, 8, 0, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  const smoothGray = useSpring(grayscale, { stiffness: 40, damping: 20 });
  const smoothBlur = useSpring(blur, { stiffness: 40, damping: 20 });

  return (
    <section ref={ref} className="relative min-h-[120vh] bg-black overflow-hidden">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ scale }} className="absolute inset-0">
          <motion.img
            src={imageUrl}
            alt={caption || ""}
            className="w-full h-full object-cover"
            style={{
              filter: useTransform(
                [smoothGray, smoothBlur],
                ([g, b]) => `grayscale(${g}%) blur(${b}px)`
              ) as any,
            }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
          {children}
        </div>

        {caption && (
          <div className="absolute bottom-8 left-8 right-8">
            <p className="text-[10px] tracking-[0.2em] uppercase text-white/30">{caption}</p>
          </div>
        )}
      </div>
    </section>
  );
}

/* ── Text Block ── */
function TextBlock({
  label,
  lines,
  align = "center",
}: {
  label?: string;
  lines: string[];
  align?: "left" | "center";
}) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {label && (
        <ScrollReveal>
          <span className="inline-block text-[10px] tracking-[0.4em] uppercase text-white/40 mb-8 font-medium">
            {label}
          </span>
        </ScrollReveal>
      )}
      <div className="space-y-4">
        {lines.map((line, i) => (
          <LineReveal key={i} delay={i * 0.15}>
            <p
              className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-white leading-[1.4] tracking-tight ${
                align === "left" ? "text-left" : ""
              }`}
            >
              {line}
            </p>
          </LineReveal>
        ))}
      </div>
    </div>
  );
}

/* ── Philosophy Manifesto ── */
function ManifestoSection() {
  return (
    <section className="relative bg-white py-32 sm:py-40 md:py-52">
      <div className="max-w-[720px] mx-auto px-6 sm:px-8">
        <ScrollReveal>
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#86868B] font-medium mb-12 block">
            教学哲学
          </span>
        </ScrollReveal>

        <div className="space-y-8">
          <ScrollReveal delay={0.1}>
            <p className="text-lg sm:text-xl md:text-2xl text-[#1a1a1a] leading-[1.7] font-light">
              我们从来不认为钢琴教育是一门手艺。
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-lg sm:text-xl md:text-2xl text-[#1a1a1a] leading-[1.7] font-light">
              手指在黑白键上的每一次起落，都是一次选择——
              选择用怎样的力度触碰琴键，选择用怎样的呼吸连接乐句，
              选择让声音在空气中停留多久才允许它消散。
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p className="text-lg sm:text-xl md:text-2xl text-[#86868B] leading-[1.7] font-light">
              这些选择的总和，构成了演奏者的审美人格。
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <blockquote className="my-16 border-l-2 border-[#1a1a1a] pl-6">
              <p className="text-2xl sm:text-3xl md:text-4xl font-light text-[#1a1a1a] leading-[1.3] tracking-tight">
                技术让你有资格坐在钢琴前，
                <br />
                审美让你值得被聆听。
              </p>
            </blockquote>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p className="text-lg sm:text-xl md:text-2xl text-[#1a1a1a] leading-[1.7] font-light">
              在琴鸣，我们首先教会学生的不是如何弹得快，
              而是如何<span className="font-medium">听得深</span>——
              听每一个和弦的色彩，听声部之间的对话，
              听作曲家在乐谱边缘留下的沉默。
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ── ABRSM Balance Section ── */
function BalanceSection() {
  return (
    <section className="relative bg-[#FAFAFA] py-32 sm:py-40 md:py-52 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <ScrollReveal>
              <span className="text-[10px] tracking-[0.4em] uppercase text-[#86868B] font-medium mb-8 block">
                考级与审美
              </span>
            </ScrollReveal>

            <div className="space-y-6">
              <ScrollReveal delay={0.1}>
                <p className="text-lg sm:text-xl text-[#1a1a1a] leading-[1.7] font-light">
                  英皇考级（ABRSM）是国际上最受认可的钢琴评估体系之一。
                  它严谨、系统、全面——但绝不应该是教学的终点。
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <p className="text-lg sm:text-xl text-[#1a1a1a] leading-[1.7] font-light">
                  我们见过太多「考级机器」：手指可以跑动音阶，
                  却不知道为什么这条音阶要存在；
                  可以准确弹出音符，却听不见和声进行的情绪走向。
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <p className="text-lg sm:text-xl text-[#86868B] leading-[1.7] font-light">
                  琴鸣的做法是：以考级为骨架，以审美为灵魂。
                  技巧训练服务于音乐表达，而不是反过来。
                </p>
              </ScrollReveal>
            </div>
          </div>

          <div className="space-y-6">
            {[
              { num: "01", title: "技巧是基础", desc: "音阶、琶音、八度——没有捷径，只有日复一日地打磨。" },
              { num: "02", title: "乐理是地图", desc: "理解和声、曲式与历史背景，才能知道自己在演奏什么。" },
              { num: "03", title: "审美是终点", desc: "最终评判标准不是分数，而是听众是否被打动。" },
            ].map((item, i) => (
              <ScrollReveal key={item.num} delay={i * 0.15}>
                <div className="group p-6 sm:p-8 bg-white border border-[#E5E5E5] hover:border-[#1a1a1a] transition-colors duration-500">
                  <span className="text-[10px] tracking-[0.3em] text-[#86868B] font-medium">
                    {item.num}
                  </span>
                  <h3 className="mt-2 text-xl sm:text-2xl font-light text-[#1a1a1a]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#86868B] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Shader Showcase Section ── */
function ShaderShowcaseSection() {
  return (
    <section className="relative h-[80vh] sm:h-screen bg-black overflow-hidden">
      <StaffShaderCanvas />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 pointer-events-none">
        <ScrollReveal>
          <span className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-6 block">
            艺术点缀
          </span>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.1] tracking-tight max-w-3xl">
            每一个音符
            <br />
            都在等待被唤醒
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.4}>
          <p className="mt-6 text-sm text-white/30 tracking-wide">
            点击画面，感受涟漪
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ── CTA ── */
function CtaSection() {
  return (
    <section className="relative bg-white py-32 sm:py-40 md:py-52">
      <div className="max-w-[720px] mx-auto px-6 sm:px-8 text-center">
        <ScrollReveal>
          <Music className="w-8 h-8 text-[#86868B]/30 mx-auto mb-10" />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#1a1a1a] leading-[1.1] tracking-tight mb-8">
            琴键有限，
            <br />
            而表达无限
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-base sm:text-lg text-[#86868B] leading-relaxed max-w-lg mx-auto mb-10">
            如果你相信音乐不只是声音的排列组合，
            而是灵魂的另一种语言——
            琴鸣的门，为你敞开。
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/#booking"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#1a1a1a] text-white text-sm font-medium tracking-wide hover:bg-[#333] transition-colors"
            >
              预约钢琴试听课
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-[#86868B] hover:text-[#1a1a1a] transition-colors tracking-wide"
            >
              <ArrowLeft className="w-4 h-4" />
              返回工作室官网
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* =====================================================================
   Main Page
   ===================================================================== */
export default function PianoPhilosophyPage() {
  return (
    <div className="min-h-screen bg-white antialiased selection:bg-[#1a1a1a] selection:text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        html { scroll-behavior: smooth; }
        body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
      `}</style>

      <Navigation />
      <HeroSection />

      <ColorRevealSection
        imageUrl="https://images.unsplash.com/photo-1552422535-c45813c61732?w=1920&q=80"
        caption="钢琴琴键特写"
      >
        <TextBlock
          label="第一章 · 听见"
          lines={[
            "在学琴的第一年，",
            "我们只做一件事：",
            "教会你听见。",
          ]}
        />
      </ColorRevealSection>

      <ManifestoSection />

      <ColorRevealSection
        imageUrl="https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=1920&q=80"
        caption="乐谱手稿"
      >
        <TextBlock
          label="第二章 · 理解"
          lines={[
            "巴赫不是练习曲，",
            "肖邦不是考级曲目，",
            "他们是你与三百年前的某个人",
            "之间的一次秘密对话。",
          ]}
        />
      </ColorRevealSection>

      <BalanceSection />

      <ShaderShowcaseSection />

      <ColorRevealSection
        imageUrl="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1920&q=80"
        caption="演出瞬间"
      >
        <TextBlock
          label="终章 · 表达"
          lines={[
            "当你的手指终于不再是障碍，",
            "当你的心跳开始与节拍器同频，",
            "你会发现——",
            "钢琴从来不是乐器，",
            "而是你灵魂的扩音器。",
          ]}
        />
      </ColorRevealSection>

      <CtaSection />
    </div>
  );
}
