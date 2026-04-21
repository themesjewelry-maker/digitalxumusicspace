import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Wind,
  AudioLines,
  Waves,
  Activity,
  Zap,
  Target,
  Mic2,
  ChevronRight,
  Flame,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import WaveShader from "../components/WaveShader";

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                  */
/* ------------------------------------------------------------------ */
function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const initial =
    direction === "up"
      ? { opacity: 0, y: 80 }
      : direction === "left"
      ? { opacity: 0, x: -60 }
      : { opacity: 0, x: 60 };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={
        isInView
          ? { opacity: 1, y: 0, x: 0 }
          : initial
      }
      transition={{ duration: 1, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page-level scroll progress for shader color                        */
/* ------------------------------------------------------------------ */
function usePageScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const p = docHeight > 0 ? window.scrollY / docHeight : 0;
      setProgress(Math.min(p, 1));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

/* ------------------------------------------------------------------ */
/*  Hero Section                                                       */
/* ------------------------------------------------------------------ */
function HeroSection({ scrollProgress }: { scrollProgress: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden">
      <WaveShader scrollProgress={scrollProgress} intensity={1.2} />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <span className="inline-block text-[10px] sm:text-xs tracking-[0.4em] uppercase text-white/50 mb-6 font-medium">
            琴鸣声乐工作室 · VOCAL TRAINING
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-5xl sm:text-6xl md:text-8xl lg:text-[110px] font-bold text-white leading-[0.95] tracking-tighter uppercase"
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
        >
          Find
          <br />
          Your Voice
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1.5 }}
          className="mt-8 text-base sm:text-lg md:text-xl text-white/50 max-w-lg leading-relaxed font-light"
        >
          你的身体就是乐器。
          <br className="hidden sm:block" />
          每一个音符，都是一次对自我的重新发现。
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-14 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/30">
              Scroll
            </span>
            <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Navigation                                                         */
/* ------------------------------------------------------------------ */
function PageNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between h-16 sm:h-14">
          <Link
            to="/"
            className="text-sm font-bold tracking-tight text-white hover:text-white/70 transition-colors uppercase"
          >
            琴鸣 · Qinming
          </Link>
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/40">
            声乐教育理念
          </span>
        </div>
      </div>
    </motion.nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Stats Bar                                                          */
/* ------------------------------------------------------------------ */
const stats = [
  { value: "∞", label: "音域可能", desc: "每个人的声带都是独一无二的" },
  { value: "3.5", label: "八度起步", desc: "未经训练的平均自然音域" },
  { value: "90%", label: "肌肉记忆", desc: "歌唱是运动，不只是艺术" },
  { value: "0.3s", label: "反应时间", desc: "从大脑指令到声带振动" },
];

function StatsSection() {
  return (
    <section className="relative z-10 bg-black py-16 sm:py-20 border-y border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {stats.map((s, i) => (
            <ScrollReveal key={s.label} delay={i * 0.1}>
              <div className="text-center lg:text-left">
                <span
                  className="block text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tighter"
                  style={{
                    background: "linear-gradient(135deg, #fff 0%, #888 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {s.value}
                </span>
                <span className="block mt-2 text-sm font-semibold text-white/80 tracking-wide uppercase">
                  {s.label}
                </span>
                <span className="block mt-1 text-xs text-white/40">
                  {s.desc}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Science Grid — Vocal Training Principles                           */
/* ------------------------------------------------------------------ */
const principles = [
  {
    icon: <Wind className="w-8 h-8" />,
    title: "呼吸支撑",
    subtitle: "BREATH SUPPORT",
    desc: "横膈膜是歌声的发动机。正确的腹式呼吸能提供稳定、持久的气流支持，让每一个长音都有足够的燃料。我们使用『惊讶式呼吸』和『嘶声练习』来唤醒沉睡的横膈膜。",
    metric: "吸气容量提升 40%",
    accent: "from-cyan-500 to-blue-600",
  },
  {
    icon: <Waves className="w-8 h-8" />,
    title: "共鸣腔体",
    subtitle: "RESONANCE",
    desc: "声音不是从喉咙出来的，而是从整个身体共振出来的。胸腔、口腔、头腔三大共鸣区构成了人声的三频均衡器。通过『哼鸣练习』和『管道音』训练，学员能找到自己最饱满的音色。",
    metric: "音色饱满度 +60%",
    accent: "from-violet-500 to-purple-600",
  },
  {
    icon: <AudioLines className="w-8 h-8" />,
    title: "声带闭合",
    subtitle: "VOCAL FOLD CLOSURE",
    desc: "声带是两根精密的橡皮筋。闭合过紧会疲劳甚至病变，闭合不足则气息浪费、声音虚弱。我们使用『气泡音』和『滑音练习』找到恰到好处的『甜蜜闭合点』。",
    metric: "发声效率提升 55%",
    accent: "from-emerald-400 to-teal-600",
  },
  {
    icon: <Target className="w-8 h-8" />,
    title: "音准控制",
    subtitle: "PITCH ACCURACY",
    desc: "音准不是天赋，是肌肉记忆。大脑听觉皮层与声带肌肉的神经回路，可以通过系统训练被重塑。我们使用『半音阶滑音』和『音程跳跃』练习，让准确的音高成为本能。",
    metric: "跑音率下降 70%",
    accent: "from-amber-400 to-orange-500",
  },
  {
    icon: <Activity className="w-8 h-8" />,
    title: "动态范围",
    subtitle: "DYNAMICS",
    desc: "ppp 到 fff，从最轻柔的耳语到最有力的呐喊。动态控制能力决定了演唱的情感表现力。通过『渐强渐弱长音』练习，学员学会像画家调色一样控制自己的声音。",
    metric: "音量跨度 ×3",
    accent: "from-rose-400 to-red-500",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "敏捷转换",
    subtitle: "AGILITY",
    desc: "快速的音阶跑动、灵巧的转音、干净的起音与收音——这些都是声带的敏捷性训练。我们借鉴运动员的『HIIT』理念，设计高强度的声乐间歇训练。",
    metric: "音阶速度 +120%",
    accent: "from-sky-400 to-indigo-500",
  },
];

function ScienceGrid() {
  return (
    <section className="relative z-10 bg-[#050508] py-24 sm:py-32 md:py-40">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8">
        <ScrollReveal className="mb-16 sm:mb-20">
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-medium">
            科学原理
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight">
            你的声音，
            <br />
            比你想象的更精密
          </h2>
          <p className="mt-6 text-base sm:text-lg text-white/40 max-w-xl leading-relaxed">
            歌唱不是玄学。每一次发声，都是呼吸系统、声带振动、共鸣腔体
            与神经系统协同完成的精密工程。
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {principles.map((p, i) => (
            <ScrollReveal key={p.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="group relative h-full p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-500 overflow-hidden"
              >
                {/* Accent glow */}
                <div
                  className={`absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-700 bg-gradient-to-br ${p.accent}`}
                />

                <div className="relative">
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${p.accent} text-white mb-6 group-hover:scale-110 transition-transform duration-500`}
                  >
                    {p.icon}
                  </div>

                  <span className="block text-[10px] tracking-[0.25em] uppercase text-white/30 mb-2">
                    {p.subtitle}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 tracking-tight">
                    {p.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed mb-6">
                    {p.desc}
                  </p>

                  <div className="flex items-center gap-2">
                    <Flame className="w-3.5 h-3.5 text-white/30" />
                    <span className="text-xs text-white/40 font-medium">
                      {p.metric}
                    </span>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Vocal Range Explorer — Interactive Shader Zone                     */
/* ------------------------------------------------------------------ */
const ranges = [
  {
    name: "低音区",
    freq: "82–330 Hz",
    note: "E2–E4",
    color: "#3B82F6",
    desc: "胸腔共鸣主导。像大提琴一样深沉、温暖。需要放松喉部，让声音『坐』在胸口。",
    intensity: 0.8,
  },
  {
    name: "中音区",
    freq: "330–700 Hz",
    note: "E4–F5",
    color: "#8B5CF6",
    desc: "口腔共鸣主导。人声最自然、最舒适的区域。大多数说话和歌唱在此完成。",
    intensity: 1.0,
  },
  {
    name: "高音区",
    freq: "700–1318 Hz",
    note: "F5–E6",
    color: "#F59E0B",
    desc: "头腔共鸣主导。明亮、穿透力强。需要精准的气息支撑，避免喉部挤压。",
    intensity: 1.6,
  },
  {
    name: "哨音区",
    freq: "1046+ Hz",
    note: "C6+",
    color: "#EF4444",
    desc: "边缘振动模式。像长笛一样轻盈飘逸。需要极致的放松与气息控制。",
    intensity: 2.2,
  },
];

function RangeExplorer() {
  const [activeRange, setActiveRange] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const intensity = activeRange !== null ? ranges[activeRange].intensity : 1;

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-black overflow-hidden">
      {/* Shader background for this section */}
      <div className="absolute inset-0">
        <WaveShader
          scrollProgress={0.5 + (activeRange !== null ? activeRange * 0.12 : 0)}
          intensity={intensity}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-8 py-24 sm:py-32 md:py-40">
        <ScrollReveal className="mb-16 sm:mb-20">
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-medium">
            探索音域
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight">
            感受频率的流动
          </h2>
          <p className="mt-6 text-base sm:text-lg text-white/40 max-w-xl leading-relaxed">
            将鼠标悬停在不同音域上，观察背景 Shader 的波动频率随之变化——
            这就是声音在你身体中实际产生的振动。
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ranges.map((r, i) => (
            <ScrollReveal key={r.name} delay={i * 0.1}>
              <motion.div
                onMouseEnter={() => setActiveRange(i)}
                onMouseLeave={() => setActiveRange(null)}
                whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
                className={`relative p-6 sm:p-8 rounded-2xl border cursor-pointer transition-all duration-500 ${
                  activeRange === i
                    ? "bg-white/10 border-white/30 shadow-[0_0_60px_-12px_rgba(255,255,255,0.15)]"
                    : "bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.06]"
                }`}
              >
                {/* Frequency bar visual */}
                <div className="mb-6 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    animate={{
                      width: activeRange === i ? "100%" : "30%",
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: r.color }}
                  />
                </div>

                <span
                  className="text-[10px] tracking-[0.25em] uppercase font-medium"
                  style={{ color: r.color }}
                >
                  {r.note}
                </span>
                <h3 className="mt-2 text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {r.name}
                </h3>
                <span className="block mt-1 text-sm text-white/30 font-mono">
                  {r.freq}
                </span>
                <p className="mt-4 text-sm text-white/50 leading-relaxed">
                  {r.desc}
                </p>

                <div className="mt-6 flex items-center gap-1 text-xs text-white/30 group-hover:text-white/60 transition-colors">
                  <span>悬停体验波动</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Training System — Masonry-like Grid                                */
/* ------------------------------------------------------------------ */
const trainingModules = [
  {
    title: "呼吸重塑",
    tag: "基础必修",
    weeks: "2–4 周",
    desc: "从胸式呼吸切换到横膈膜驱动的腹式呼吸。建立气息支持的肌肉记忆。",
    size: "large",
  },
  {
    title: "音域拓展",
    tag: "进阶",
    weeks: "4–8 周",
    desc: "通过混声技术（Mix Voice）无缝连接胸声与头声，消除换声点断裂感。",
    size: "small",
  },
  {
    title: "风格塑造",
    tag: "专项",
    weeks: "8–12 周",
    desc: "流行、爵士、R&B、音乐剧——根据你的音色特质定制风格化演唱路径。",
    size: "small",
  },
  {
    title: "舞台表现",
    tag: "高阶",
    weeks: "持续",
    desc: "麦克风技术、肢体语言、情绪传递。从『会唱』到『会演』的终极跨越。",
    size: "large",
  },
];

function TrainingGrid() {
  return (
    <section className="relative z-10 bg-[#050508] py-24 sm:py-32 md:py-40">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8">
        <ScrollReveal className="mb-16 sm:mb-20">
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-medium">
            训练体系
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight">
            从呼吸到舞台
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {trainingModules.map((m, i) => (
            <ScrollReveal
              key={m.title}
              delay={i * 0.1}
              direction={i % 2 === 0 ? "left" : "right"}
            >
              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className={`group relative p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-white/[0.05] to-white/[0.01] border border-white/[0.08] hover:border-white/[0.15] transition-all duration-500 overflow-hidden ${
                  m.size === "large" ? "md:min-h-[320px]" : "md:min-h-[280px]"
                }`}
              >
                <div className="absolute top-0 right-0 p-6 sm:p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <ArrowRight className="w-6 h-6 text-white/30 group-hover:text-white/60 transition-colors" />
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <span className="text-[10px] tracking-[0.2em] uppercase px-3 py-1 rounded-full bg-white/10 text-white/60 font-medium">
                    {m.tag}
                  </span>
                  <span className="text-xs text-white/30">{m.weeks}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight">
                  {m.title}
                </h3>
                <p className="text-base text-white/40 leading-relaxed max-w-md">
                  {m.desc}
                </p>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Feature Statement                                                  */
/* ------------------------------------------------------------------ */
function FeatureStatement() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-black py-32 sm:py-40 md:py-52">
      <motion.div
        style={{ x }}
        className="whitespace-nowrap text-[12vw] sm:text-[10vw] font-bold text-white/[0.04] tracking-tighter select-none"
      >
        BREATHE · SING · RESONATE · BREATHE · SING · RESONATE ·
      </motion.div>

      <div className="absolute inset-0 flex items-center justify-center px-6">
        <ScrollReveal className="text-center max-w-3xl">
          <Mic2 className="w-10 h-10 text-white/20 mx-auto mb-8" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
            在深圳，
            <br />
            我们训练歌手，
            <br />
            不是制造回声
          </h2>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CTA / Epilogue                                                     */
/* ------------------------------------------------------------------ */
function CtaSection() {
  return (
    <section className="relative z-10 bg-gradient-to-b from-black to-[#0a0a12] py-24 sm:py-32 md:py-40">
      <div className="max-w-[720px] mx-auto px-6 sm:px-8 text-center">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight mb-8">
            你的第一声，
            <br />
            从这里开始
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-base sm:text-lg text-white/40 leading-relaxed mb-10 max-w-lg mx-auto">
            每一位伟大的歌手，都是从第一个颤抖的音符开始的。
            琴鸣的试听课，会带你找到那个属于你的起点。
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black text-sm font-bold tracking-wide hover:bg-white/90 transition-colors"
            >
              预约声乐试听课
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors tracking-wide"
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

/* ------------------------------------------------------------------ */
/*  Main Page                                                          */
/* ------------------------------------------------------------------ */
export default function VocalPage() {
  const scrollProgress = usePageScrollProgress();

  return (
    <div className="min-h-screen bg-black text-white antialiased selection:bg-white/20">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        html { scroll-behavior: smooth; }
        body { font-family: 'Inter', system-ui, sans-serif; }
      `}</style>

      <Navigation />
      <HeroSection scrollProgress={scrollProgress} />
      <StatsSection />
      <ScienceGrid />
      <FeatureStatement />
      <RangeExplorer />
      <TrainingGrid />
      <CtaSection />
    </div>
  );
}
