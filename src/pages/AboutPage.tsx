import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Music,
  Mic2,
  Radio,
  Users,
  Award,
  Clock,
  TrendingUp,
  MapPin,
  Mail,
  Send,
  Loader2,
  CheckCircle2,
  Building2,
  Headphones,
} from "lucide-react";
import { Link } from "react-router-dom";
import Studio3D from "../components/Studio3D";
import Navigation from "../components/Navigation";

/* ------------------------------------------------------------------ */
/*  ScrollReveal                                                       */
/* ------------------------------------------------------------------ */
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
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 1, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Animated Counter                                                   */
/* ------------------------------------------------------------------ */
function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 2,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = target / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Page-level scroll progress                                         */
/* ------------------------------------------------------------------ */
function usePageScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? window.scrollY / docHeight : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

/* ------------------------------------------------------------------ */
/*  Hero Section — Video + Shader Blur Overlay                         */
/* ------------------------------------------------------------------ */
function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.8], [0, 20]);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <motion.div style={{ y }} className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1920&q=80"
        >
          <source
            src="https://cdn.coverr.co/videos/coverr-a-grand-piano-in-a-dark-room-4866/1080p.mp4"
            type="video/mp4"
          />
        </video>
      </motion.div>

      {/* Shader-style blur overlay */}
      <motion.div
        style={{ backdropFilter: blur.get() !== undefined ? `blur(${blur.get()}px)` : undefined }}
        className="absolute inset-0 bg-black/40"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {/* Vignette blur corners (shader-like effect) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: "inset 0 0 150px 60px rgba(0,0,0,0.5)",
        }}
      />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-white/40 mb-6"
        >
          关于琴鸣
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-[88px] font-light text-white leading-[1.05] tracking-tight max-w-5xl"
          style={{ fontFamily: "'Playfair Display', 'Noto Serif SC', serif" }}
        >
          在繁华深处
          <br />
          寻找纯粹共鸣
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 1.5 }}
          className="mt-8 text-base sm:text-lg text-white/50 max-w-xl leading-relaxed font-light"
        >
          琴鸣声乐工作室 — 深圳福田 · 专注高端一对一钢琴与声乐教育
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-14 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-white/30 text-xs tracking-[0.2em] uppercase"
          >
            向下滚动
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  3D Studio Tour Section                                             */
/* ------------------------------------------------------------------ */
const roomLabels = [
  {
    name: "钢琴教室",
    subtitle: "Piano Studio",
    desc: "两间独立钢琴教室，配备演奏级三角钢琴与专业声学处理。",
    icon: <Music className="w-5 h-5" />,
    color: "#8B7355",
  },
  {
    name: "声乐排练厅",
    subtitle: "Vocal Hall",
    desc: "120㎡ 声学排练空间，可调节混响，满足独唱到小型合唱需求。",
    icon: <Mic2 className="w-5 h-5" />,
    color: "#5a7a9a",
  },
  {
    name: "多功能录音棚",
    subtitle: "Recording Studio",
    desc: "专业级隔音录音环境，配备 Neumann 话筒与雅马哈调音台。",
    icon: <Radio className="w-5 h-5" />,
    color: "#7a5a6a",
  },
];

function StudioTourSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const rawProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const smoothProgress = useSpring(rawProgress, { stiffness: 60, damping: 20 });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const unsub = smoothProgress.on("change", (v) => setProgress(v));
    return unsub;
  }, [smoothProgress]);

  const activeRoom =
    progress < 0.25 ? 0 : progress < 0.5 ? 0 : progress < 0.75 ? 1 : 2;

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0a0a0f] overflow-hidden"
      style={{ height: "200vh" }}
    >
      <div className="sticky top-0 h-screen">
        {/* 3D Canvas */}
        <Studio3D scrollProgress={progress} />

        {/* UI Overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="h-full flex flex-col justify-between px-6 sm:px-8 py-8">
            {/* Top label */}
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="max-w-[1200px] mx-auto"
              >
                <span className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-medium">
                  空间导览 · Studio Tour
                </span>
                <h2 className="mt-2 text-2xl sm:text-3xl text-white font-light tracking-tight">
                  滑动探索我们的空间
                </h2>
              </motion.div>
            </div>

            {/* Bottom room cards */}
            <div className="max-w-[1200px] mx-auto w-full">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {roomLabels.map((room, i) => (
                  <motion.div
                    key={room.name}
                    animate={{
                      opacity: activeRoom === i ? 1 : 0.35,
                      scale: activeRoom === i ? 1 : 0.98,
                    }}
                    transition={{ duration: 0.5 }}
                    className="pointer-events-auto backdrop-blur-md bg-white/[0.05] border border-white/[0.08] rounded-xl p-4 sm:p-5"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="p-1.5 rounded-md"
                        style={{ backgroundColor: room.color + "25", color: room.color }}
                      >
                        {room.icon}
                      </div>
                      <div>
                        <span className="text-xs text-white/50 tracking-wide">
                          {room.subtitle}
                        </span>
                        <h3 className="text-sm font-semibold text-white leading-none">
                          {room.name}
                        </h3>
                      </div>
                    </div>
                    <p className="text-xs text-white/40 leading-relaxed">
                      {room.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Stats Section                                                      */
/* ------------------------------------------------------------------ */
const stats = [
  {
    icon: <Clock className="w-5 h-5" />,
    value: 1500,
    suffix: "+",
    label: "累计课时",
    desc: "每一课时都是一对一的专注投入",
  },
  {
    icon: <TrendingUp className="w-5 h-5" />,
    value: 98,
    suffix: "%",
    label: "考级通过率",
    desc: "英皇考级与央音考级的双高保障",
  },
  {
    icon: <Users className="w-5 h-5" />,
    value: 10,
    suffix: "+",
    label: "全硕士导师",
    desc: "毕业于汉诺威、上音、央音等顶尖学府",
  },
  {
    icon: <Award className="w-5 h-5" />,
    value: 92,
    suffix: "%",
    label: "艺考录取率",
    desc: "历年国内外音乐院校录取率",
  },
];

function StatsSection() {
  return (
    <section className="relative z-10 bg-[#0a0a0f] py-24 sm:py-32 border-y border-white/[0.06]">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
        <ScrollReveal className="text-center mb-16 sm:mb-20">
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-medium">
            专业参数
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl text-white font-light tracking-tight">
            数字背后的实力
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((s, i) => (
            <ScrollReveal key={s.label} delay={i * 0.1}>
              <div className="text-center p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/[0.06] text-white/50 mb-5">
                  {s.icon}
                </div>
                <div
                  className="text-4xl sm:text-5xl font-bold tracking-tighter mb-2"
                  style={{
                    background: "linear-gradient(135deg, #fff 0%, #888 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                </div>
                <div className="text-sm font-semibold text-white/80 mb-1">
                  {s.label}
                </div>
                <div className="text-xs text-white/30">{s.desc}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Brand Story                                                        */
/* ------------------------------------------------------------------ */
function BrandStorySection() {
  return (
    <section className="relative z-10 bg-white py-24 sm:py-32 md:py-40">
      <div className="max-w-[720px] mx-auto px-6 sm:px-8">
        <ScrollReveal>
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#8B7355] font-semibold">
            品牌故事
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2
            className="mt-4 text-3xl sm:text-4xl md:text-5xl text-[#1a1a1a] leading-[1.1] tracking-tight mb-10"
            style={{ fontFamily: "'Playfair Display', 'Noto Serif SC', serif" }}
          >
            在繁华的深圳，
            <br />
            寻找最纯粹的艺术共鸣
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="text-lg sm:text-xl leading-[1.8] text-[#333] font-serif mb-8">
            <span className="float-left text-6xl sm:text-7xl md:text-8xl leading-[0.8] mr-3 mt-1 font-serif text-[#1a1a1a]">
              深
            </span>
            圳是一座不相信眼泪的城市。这里的写字楼凌晨两点依然灯火通明，咖啡机的蒸汽声与打印机的嗡鸣构成了都市的白噪音，每个人都在奔跑，仿佛停下来就会被时代的列车甩出轨道。在这样的城市里谈论艺术——尤其是需要耐心、专注与孤独的古典音乐——听起来像是一种奢侈，甚至是一种不合时宜的浪漫。
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="text-lg sm:text-xl leading-[1.8] text-[#333] font-serif mb-8">
            但琴鸣的存在，恰恰是为了证明这种浪漫的可贵与必要。
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="text-lg sm:text-xl leading-[1.8] text-[#333] font-serif mb-8">
            2016年的一个秋日，数码旭老师在福田中心区的一栋写字楼里租下了第一间琴房。那时候，他刚从深圳交响乐团的客座钢琴家岗位上退下来，带着在德国汉诺威音乐学院积攒的七年学识，和一颗想要做点什么的心。很多人不理解——以他的履历，完全可以在任何一所音乐学院谋得教职，何必在寸土寸金的深圳中心区开一家「只教一对一」的工作室？
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="text-lg sm:text-xl leading-[1.8] text-[#333] font-serif mb-8">
            答案很简单：她见过太多被「流水线教学」消磨了热情的学生。在大班的课堂上，老师没有时间倾听一个学生手指的颤抖，没有精力分辨一个声音背后的困惑，更没有可能为每一个人量身定制一条通往音乐的路。音乐教育变成了一项产业，而音乐本身——那种能够让人在深夜独处时热泪盈眶的力量——被遗忘了。
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <blockquote className="my-14 text-center">
            <p className="text-2xl sm:text-3xl md:text-4xl font-serif leading-[1.35] text-[#1a1a1a] tracking-tight">
              <span className="text-[#8B7355] text-5xl sm:text-6xl leading-none mr-2 font-serif">
                "
              </span>
              如果这座城市注定要有一个地方，让人们重新学会慢下来，学会聆听，学会在黑白键上找到自己——那这个地方，应该叫琴鸣。
              <span className="text-[#8B7355] text-5xl sm:text-6xl leading-none ml-1 font-serif">
                "
              </span>
            </p>
          </blockquote>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="text-lg sm:text-xl leading-[1.8] text-[#333] font-serif mb-8">
            八年过去，琴鸣从最初的一个人、一间房，发展成为拥有十位全职导师、三间专业教室和一间录音棚的音乐教育空间。我们的学员里有四五岁的孩童，也有五十岁的企业高管；有准备冲击国际音乐赛事的天才少年，也有仅仅想要在周末弹一首曲子慰藉自己的普通上班族。他们来自深圳的每一个角落——南山科技园、罗湖国贸、龙岗大运、宝安中心——带着各自的故事，走进同一扇门。
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="text-lg sm:text-xl leading-[1.8] text-[#333] font-serif mb-8">
            琴鸣不是一所「培训机构」。我们不做流水线，不追求规模，不贩卖焦虑。我们只做一件事：为每一个走进这里的人，找到属于他的声音。无论你是想要登上舞台的专业演奏者，还是仅仅想要在深夜的客厅里自弹自唱的普通人，琴鸣的门，始终为你敞开。
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="text-lg sm:text-xl leading-[1.8] text-[#333] font-serif">
            在这个一切都被加速的时代，琴鸣选择慢下来。因为我们相信，真正的美，永远属于那些愿意为之付出时间的人。
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Join Form — Mock Database                                          */
/* ------------------------------------------------------------------ */
const STORAGE_APPLICATIONS = "qm_applications";

interface Application {
  id: number;
  name: string;
  email: string;
  role: string;
  message: string;
  status: "pending" | "reviewed" | "accepted";
  time: string;
}

function getApplications(): Application[] {
  try {
    const raw = localStorage.getItem(STORAGE_APPLICATIONS);
    if (raw) return JSON.parse(raw);
  } catch { /* noop */ }
  const seed: Application[] = [
    {
      id: 1,
      name: "李明远",
      email: "limingyuan@email.com",
      role: "钢琴导师",
      message: "上海音乐学院钢琴系硕士，5年教学经验，希望加入琴鸣团队。",
      status: "reviewed",
      time: "2025-01-10",
    },
    {
      id: 2,
      name: "王思琪",
      email: "wangsiqi@email.com",
      role: "声乐导师",
      message: "意大利米兰音乐学院声乐表演硕士，专攻美声与音乐剧。",
      status: "pending",
      time: "2025-01-18",
    },
  ];
  localStorage.setItem(STORAGE_APPLICATIONS, JSON.stringify(seed));
  return seed;
}

function addApplication(app: Application) {
  const list = getApplications();
  list.unshift(app);
  localStorage.setItem(STORAGE_APPLICATIONS, JSON.stringify(list));
}

const roleOptions = ["钢琴导师", "声乐导师", "乐理教师", "课程顾问", "行政助理"];

function JoinSection() {
  const [apps, setApps] = useState<Application[]>(getApplications);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "钢琴导师",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    const newApp: Application = {
      id: Date.now(),
      name: form.name.trim(),
      email: form.email.trim(),
      role: form.role,
      message: form.message.trim(),
      status: "pending",
      time: new Date().toISOString().slice(0, 10),
    };
    addApplication(newApp);
    setApps(getApplications());
    setForm({ name: "", email: "", role: "钢琴导师", message: "" });
    setSubmitted(true);
    setIsSubmitting(false);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const statusBadge = (s: Application["status"]) => {
    const map = {
      pending: { text: "待审核", color: "bg-amber-500/15 text-amber-500" },
      reviewed: { text: "已审阅", color: "bg-blue-500/15 text-blue-500" },
      accepted: { text: "已通过", color: "bg-emerald-500/15 text-emerald-500" },
    };
    return (
      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${map[s].color}`}>
        {map[s].text}
      </span>
    );
  };

  return (
    <section className="relative z-10 bg-[#FAFAFA] py-24 sm:py-32 md:py-40">
      <div className="max-w-[1100px] mx-auto px-6 sm:px-8">
        <ScrollReveal className="text-center mb-12">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#8B7355] font-semibold">
            加入我们
          </span>
          <h2
            className="mt-3 text-3xl sm:text-4xl md:text-5xl text-[#1a1a1a] leading-tight"
            style={{ fontFamily: "'Playfair Display', 'Noto Serif SC', serif" }}
          >
            与琴鸣同行
          </h2>
          <p className="mt-4 text-base text-[#86868B] max-w-md mx-auto">
            如果你热爱音乐教育，认同我们的理念，欢迎投递简历。
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Form */}
          <ScrollReveal className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl border border-[#E5E5E5] p-6 sm:p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#1a1a1a]">职位申请</h3>
                  <p className="text-xs text-[#86868B]">数据存储于 localStorage（模拟 Database）</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-[#86868B] mb-1.5">姓名</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="您的真实姓名"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAFA] border border-[#E5E5E5] text-sm text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#86868B] mb-1.5">邮箱</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAFA] border border-[#E5E5E5] text-sm text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#86868B] mb-1.5">申请职位</label>
                  <div className="grid grid-cols-2 gap-2">
                    {roleOptions.map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setForm({ ...form, role: r })}
                        className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                          form.role === r
                            ? "bg-[#1a1a1a] text-white"
                            : "bg-[#FAFAFA] text-[#86868B] hover:bg-[#F0F0F0]"
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-[#86868B] mb-1.5">自我介绍</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="简述您的教育背景与教学理念..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-[#FAFAFA] border border-[#E5E5E5] text-sm text-[#1a1a1a] placeholder:text-[#86868B]/60 focus:outline-none focus:border-[#1a1a1a] transition-colors resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-6 py-3 rounded-xl bg-[#1a1a1a] text-white text-sm font-semibold hover:bg-[#333] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    提交中...
                  </>
                ) : submitted ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    提交成功
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    提交申请
                  </>
                )}
              </button>
            </form>
          </ScrollReveal>

          {/* Application list */}
          <ScrollReveal delay={0.2} className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FAFAFA] flex items-center justify-center">
                    <Headphones className="w-4 h-4 text-[#86868B]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#1a1a1a]">申请记录</h3>
                    <p className="text-xs text-[#86868B]">
                      共 {apps.length} 条记录 · 实时同步（模拟）
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 max-h-[480px] overflow-y-auto pr-2">
                {apps.map((app) => (
                  <div
                    key={app.id}
                    className="p-4 rounded-xl bg-[#FAFAFA] border border-[#E5E5E5]/50"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold text-[#1a1a1a]">
                            {app.name}
                          </span>
                          {statusBadge(app.status)}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-[#86868B] mb-2">
                          <span>{app.email}</span>
                          <span>·</span>
                          <span>{app.role}</span>
                          <span>·</span>
                          <span>{app.time}</span>
                        </div>
                        <p className="text-xs text-[#555] leading-relaxed">
                          {app.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */
function Footer() {
  return (
    <footer className="py-10 bg-white border-t border-[#E5E5E5]">
      <div className="max-w-[800px] mx-auto px-6 sm:px-8 text-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs text-[#86868B] hover:text-[#1a1a1a] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          返回琴鸣声乐工作室官网
        </Link>
        <p className="mt-4 text-[10px] text-[#86868B]/60">
          © 2024 琴鸣声乐工作室 · 深圳市福田区中心四路嘉里建设广场
        </p>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page                                                          */
/* ------------------------------------------------------------------ */
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Noto+Serif+SC:wght@300;400;500;600;700&display=swap');
        html { scroll-behavior: smooth; }
      `}</style>

      <Navigation />
      <HeroSection />
      <BrandStorySection />
      <StudioTourSection />
      <StatsSection />
      <JoinSection />
      <Footer />
    </div>
  );
}
