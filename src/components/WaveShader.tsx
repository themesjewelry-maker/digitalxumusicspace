import { useRef, useEffect } from "react";

/* ------------------------------------------------------------------ */
/*  Vertex Shader                                                      */
/* ------------------------------------------------------------------ */
const VERT = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

/* ------------------------------------------------------------------ */
/*  Fragment Shader — Sonic Wave Fluid                                 */
/* ------------------------------------------------------------------ */
const FRAG = `
precision highp float;

uniform float u_time;
uniform vec2  u_resolution;
uniform vec2  u_mouse;
uniform float u_scroll;
uniform float u_intensity;

// ── Pseudo-random ──
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

// ── Value noise ──
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

// ── FBM ──
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = rot * p * 2.0 + vec2(100.0);
    a *= 0.5;
  }
  return v;
}

// ── Color palettes ──
vec3 deepBlue(vec2 uv, float t) {
  vec3 c1 = vec3(0.02, 0.04, 0.12);
  vec3 c2 = vec3(0.06, 0.15, 0.30);
  vec3 c3 = vec3(0.10, 0.25, 0.45);
  float n = fbm(uv * 2.5 + t * 0.15);
  vec3 col = mix(c1, c2, n);
  col = mix(col, c3, smoothstep(0.4, 0.8, n));
  return col;
}

vec3 warmOrange(vec2 uv, float t) {
  vec3 c1 = vec3(0.15, 0.05, 0.02);
  vec3 c2 = vec3(0.40, 0.12, 0.04);
  vec3 c3 = vec3(0.95, 0.45, 0.15);
  vec3 c4 = vec3(1.00, 0.75, 0.35);
  float n = fbm(uv * 2.5 + t * 0.2);
  vec3 col = mix(c1, c2, n);
  col = mix(col, c3, smoothstep(0.3, 0.7, n));
  col = mix(col, c4, smoothstep(0.6, 0.95, n));
  return col;
}

// ── Main ──
void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  vec2 p = uv * 2.0 - 1.0;
  p.x *= u_resolution.x / u_resolution.y;

  // Mouse influence
  vec2 mouse = u_mouse * 2.0 - 1.0;
  mouse.x *= u_resolution.x / u_resolution.y;
  float mouseDist = length(p - mouse);
  float mouseInfluence = smoothstep(1.5, 0.0, mouseDist) * 0.5;

  // Sonic wave rings
  float t = u_time;
  float freq = 3.0 + u_intensity * 4.0 + mouseInfluence * 3.0;
  float wave1 = sin(length(p) * freq - t * 2.5) * 0.5 + 0.5;
  float wave2 = sin(dot(p, vec2(0.7, 0.3)) * (freq * 0.7) + t * 1.8) * 0.5 + 0.5;
  float wave3 = sin(p.y * 4.0 + t * 1.2 + fbm(p * 1.5 + t * 0.1) * 2.0) * 0.5 + 0.5;

  // Fluid distortion
  vec2 q = vec2(0.0);
  q.x = fbm(p + t * 0.08);
  q.y = fbm(p + vec2(1.0) + t * 0.06);
  vec2 r = vec2(0.0);
  r.x = fbm(p + q + vec2(1.7, 9.2) + t * 0.12);
  r.y = fbm(p + q + vec2(8.3, 2.8) + t * 0.09);
  float fluid = fbm(p + r * 1.5);

  // Combine waves + fluid
  float pattern = wave1 * 0.25 + wave2 * 0.20 + wave3 * 0.15 + fluid * 0.40;
  pattern += mouseInfluence * 0.3;

  // Scroll-driven color blend
  float scroll = clamp(u_scroll, 0.0, 1.0);
  vec3 blueCol = deepBlue(uv + r * 0.15, t);
  vec3 orangeCol = warmOrange(uv + r * 0.15, t);
  vec3 baseCol = mix(blueCol, orangeCol, scroll);

  // Add brightness bands
  float band = smoothstep(0.3, 0.7, pattern);
  vec3 brightCol = mix(
    vec3(0.15, 0.35, 0.65),
    vec3(1.0, 0.55, 0.15),
    scroll
  );
  baseCol = mix(baseCol, brightCol, band * 0.35);

  // Vignette
  float vig = 1.0 - smoothstep(0.4, 1.4, length(uv * 2.0 - 1.0));
  baseCol *= 0.7 + vig * 0.3;

  gl_FragColor = vec4(baseCol, 1.0);
}
`;

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
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

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
interface WaveShaderProps {
  scrollProgress?: number;
  intensity?: number;
}

export default function WaveShader({ scrollProgress = 0, intensity = 1 }: WaveShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const intensityRef = useRef(intensity);

  // Keep intensity ref in sync without re-triggering useEffect
  intensityRef.current = intensity;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: false, antialias: false });
    if (!gl) return;

    const prog = createProgram(gl, VERT, FRAG);
    if (!prog) return;

    // Full-screen quad
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const aPos = gl.getAttribLocation(prog, "a_position");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uRes = gl.getUniformLocation(prog, "u_resolution");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");
    const uScroll = gl.getUniformLocation(prog, "u_scroll");
    const uIntensity = gl.getUniformLocation(prog, "u_intensity");

    let raf = 0;
    let start = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: 1.0 - (e.clientY - rect.top) / rect.height,
      };
    };

    const render = () => {
      const t = (performance.now() - start) / 1000;
      gl.useProgram(prog);
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
      gl.uniform1f(uTime, t);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);
      gl.uniform1f(uScroll, scrollProgress);
      gl.uniform1f(uIntensity, intensityRef.current);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      raf = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [scrollProgress]); // scrollProgress drives color change; intensity via ref

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
    />
  );
}
