import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Mail,
  Award,
  GraduationCap,
  Calendar,
  Music,
  Heart,
  MessageCircle,
  Send,
  User,
  Lock,
  LogOut,
  Loader2,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                  */
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
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.9, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const radarData = [
  { subject: "声乐演唱", A: 98, fullMark: 100 },
  { subject: "视唱练耳", A: 92, fullMark: 100 },
  { subject: "乐理教学", A: 94, fullMark: 100 },
  { subject: "合唱指挥", A: 90, fullMark: 100 },
  { subject: "儿童声乐", A: 96, fullMark: 100 },
  { subject: "成人声乐", A: 93, fullMark: 100 },
  { subject: "作品演绎", A: 95, fullMark: 100 },
  { subject: "综合素养", A: 91, fullMark: 100 },
];

const lifePhotos = [
  { url: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=600&q=80", aspect: "aspect-[3/4]", caption: "琴房里的专注时刻" },
  { url: "/lifewall-2.jpg", aspect: "aspect-square", caption: "舞台上的光彩瞬间" },
  { url: "https://images.unsplash.com/photo-1514117445516-2ecfc9c4ec90?w=600&q=80", aspect: "aspect-[4/5]", caption: "华南师范大学校园回忆" },
  { url: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=600&q=80", aspect: "aspect-[3/4]", caption: "合唱比赛获奖时刻" },
  { url: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&q=80", aspect: "aspect-square", caption: "与学员的排练日常" },
  { url: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&q=80", aspect: "aspect-[4/5]", caption: "才艺大赛评委席" },
  { url: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=600&q=80", aspect: "aspect-[3/4]", caption: "教学研讨与精进" },
  { url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80", aspect: "aspect-square", caption: "工作室一角" },
  { url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80", aspect: "aspect-[4/5]", caption: "课后的宁静时光" },
];

const timeline = [
  { year: "2008", title: "考入华南师范大学", desc: "进入音乐学专业声乐教育方向，开启系统的声乐与音乐教育学习之路" },
  { year: "2009", title: "师从罗晓梅教授", desc: "跟随日本留学归来的罗晓梅教授系统学习声乐两年，打下扎实的声乐功底" },
  { year: "2011", title: "师从王朝霞教授", desc: "师从美国留学归来的王朝霞教授学习音乐教育两年，拓展教学视野与方法" },
  { year: "2012", title: "多元艺术修习", desc: "跟随名师学习古筝、钢琴、舞蹈，构建多维综合的艺术素养体系" },
  { year: "2013", title: "步入教育岗位", desc: "毕业后从事小学音乐课程教学工作，课余组织训练校合唱梯队" },
  { year: "2015", title: "赛场崭露头角", desc: "带领校合唱队在深圳市及龙岗区比赛中屡次斩获特等奖、一等奖" },
  { year: "2017", title: "教学技能大奖", desc: "在音乐教师技能大赛中荣获声乐一等奖、全能一等奖，专业能力获业界认可" },
  { year: "2019", title: "特邀评委", desc: "受聘为『腾飞中国2019广东省少儿才艺大赛深圳赛区』特邀评委" },
  { year: "2021", title: "创立琴鸣声乐工作室", desc: "十余载声乐教育沉淀后，在深圳福田创立个人声乐工作室，专注儿童与成人声乐教育" },
  { year: "2024", title: "深耕声乐教育", desc: "累计培养数百名学员，从学前儿童到成人，帮助每一位学生找到属于自己的声音" },
];

/* ------------------------------------------------------------------ */
/*  Mock Auth + Database (localStorage)                                */
/* ------------------------------------------------------------------ */
type User = { name: string; email: string };
type Question = { id: number; user: string; text: string; reply: string | null; time: string };

const STORAGE_USER = "qm_teacher_user";
const STORAGE_QUESTIONS = "qm_teacher_questions";

function getMockUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_USER);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setMockUser(user: User | null) {
  if (user) localStorage.setItem(STORAGE_USER, JSON.stringify(user));
  else localStorage.removeItem(STORAGE_USER);
}

function getMockQuestions(): Question[] {
  try {
    const raw = localStorage.getItem(STORAGE_QUESTIONS);
    if (raw) return JSON.parse(raw);
  } catch { /* noop */ }
  const seed: Question[] = [
    { id: 1, user: "小雨妈妈", text: "陈老师，孩子6岁想学唱歌，但音准不太好，需要等到再大一点吗？", reply: "6岁正是声乐启蒙的黄金期，音准完全可以后天训练。建议从视唱练耳小游戏入手，培养孩子的音乐耳朵。", time: "2024-12-10" },
    { id: 2, user: "李先生", text: "成人零基础学声乐，大概多久能完整唱好一首歌？", reply: "因人而异，但一般坚持练习3个月左右就能有明显改善。关键是坚持科学的发声方法，不要急于求成。", time: "2024-12-15" },
    { id: 3, user: "艺考家长", text: "准备考音乐学院声乐系，现在的选曲方向对吗？", reply: "除了规定曲目，建议准备2-3首不同风格的备选，包括一首民歌和一首艺术歌曲。考试时心态很重要。", time: "2025-01-08" },
  ];
  localStorage.setItem(STORAGE_QUESTIONS, JSON.stringify(seed));
  return seed;
}

function addMockQuestion(q: Question) {
  const list = getMockQuestions();
  list.unshift(q);
  localStorage.setItem(STORAGE_QUESTIONS, JSON.stringify(list));
}

/* ------------------------------------------------------------------ */
/*  Hero Section                                                       */
/* ------------------------------------------------------------------ */
function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FAFAFA]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#f5f0eb] via-[#faf8f5] to-[#eef2f5]" />

      <motion.div style={{ y, opacity }} className="relative z-10 text-center px-6 max-w-3xl">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-8"
        >
          <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-[#e8e0d8] to-[#d4ccc4] shadow-2xl">
            <img
              src="/teacher-avatar.png"
              alt="数码旭"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#1a1a1a] rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4 text-white" />
          </div>
        </motion.div>

        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="inline-block text-[10px] tracking-[0.3em] uppercase text-[#8B7355] font-semibold mb-4"
        >
          创始人 / 声乐教学总监
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-[#1a1a1a] leading-[1.05] tracking-tight"
          style={{ fontFamily: "'Playfair Display', 'Noto Serif SC', serif" }}
        >
          数码旭
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1.2 }}
          className="mt-6 text-base sm:text-lg text-[#86868B] leading-relaxed max-w-lg mx-auto"
        >
          毕业于华南师范大学音乐学专业声乐教育方向，师从罗晓梅教授与王朝霞教授，
          十余年声乐教育经验，专注儿童声乐与成年人声乐教育。
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-8 flex items-center justify-center gap-6 text-sm text-[#86868B]"
        >
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            深圳 · 福田
          </span>
          <span className="flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5" />
            华南师范大学
          </span>
          <span className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5" />
            声乐一等奖
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-10"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs text-[#86868B] hover:text-[#1a1a1a] transition-colors tracking-wide"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            返回工作室官网
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <ChevronDown className="w-5 h-5 text-[#86868B]/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Career Timeline                                                    */
/* ------------------------------------------------------------------ */
function TimelineSection() {
  return (
    <section className="py-20 sm:py-28 md:py-32 bg-white">
      <div className="max-w-[800px] mx-auto px-6 sm:px-8">
        <ScrollReveal className="text-center mb-16">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#8B7355] font-semibold">
            履历
          </span>
          <h2
            className="mt-3 text-3xl sm:text-4xl text-[#1a1a1a] leading-tight"
            style={{ fontFamily: "'Playfair Display', 'Noto Serif SC', serif" }}
          >
            琴声与岁月
          </h2>
        </ScrollReveal>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[#E5E5E5] md:-translate-x-px" />

          {timeline.map((item, i) => (
            <ScrollReveal key={item.year} delay={i * 0.08}>
              <div className={`relative flex items-start gap-6 md:gap-12 mb-10 last:mb-0 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}>
                <div className="hidden md:block md:w-1/2 md:text-right" />
                <div className="absolute left-4 md:left-1/2 top-1 w-3 h-3 rounded-full bg-[#8B7355] border-4 border-white shadow-sm md:-translate-x-1.5" />
                <div className={`pl-10 md:pl-0 md:w-1/2 ${
                  i % 2 === 0 ? "md:text-left md:pl-12" : "md:text-right md:pr-12"
                }`}>
                  <span className="text-xs font-semibold text-[#8B7355] tracking-wide">
                    {item.year}
                  </span>
                  <h3 className="mt-1 text-lg font-semibold text-[#1a1a1a]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#86868B] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Life Wall                                                          */
/* ------------------------------------------------------------------ */
function LifeWall() {
  return (
    <section className="relative z-10 py-20 sm:py-28 md:py-32 bg-[#FAFAFA]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8">
        <ScrollReveal className="mb-12 sm:mb-16">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#8B7355] font-semibold">
            生活与演出
          </span>
          <h2
            className="mt-3 text-3xl sm:text-4xl text-[#1a1a1a] leading-tight"
            style={{ fontFamily: "'Playfair Display', 'Noto Serif SC', serif" }}
          >
            舞台之外
          </h2>
        </ScrollReveal>

        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {lifePhotos.map((photo, i) => (
            <ScrollReveal key={i} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className="break-inside-avoid group relative overflow-hidden rounded-xl bg-[#E8E0D8]"
              >
                <div className={photo.aspect}>
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <div className="backdrop-blur-md bg-white/70 rounded-lg px-3 py-2">
                    <p className="text-xs text-[#1a1a1a] font-medium">{photo.caption}</p>
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
/*  Radar Chart                                                        */
/* ------------------------------------------------------------------ */
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-md border border-[#E5E5E5] rounded-lg px-4 py-3 shadow-lg">
        <p className="text-xs text-[#86868B] mb-1">{payload[0].payload.subject}</p>
        <p className="text-lg font-bold text-[#1a1a1a]">{payload[0].value}<span className="text-xs font-normal text-[#86868B]"> / 100</span></p>
      </div>
    );
  }
  return null;
};

function RadarSection() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="py-20 sm:py-28 md:py-32 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <ScrollReveal>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#8B7355] font-semibold">
              专业维度
            </span>
            <h2
              className="mt-3 text-3xl sm:text-4xl text-[#1a1a1a] leading-tight mb-6"
              style={{ fontFamily: "'Playfair Display', 'Noto Serif SC', serif" }}
            >
              八维技能雷达
            </h2>
            <p className="text-base text-[#86868B] leading-relaxed mb-8 max-w-md">
              声乐教学不只是演唱技巧的传授。一名优秀的声乐导师需要在演唱、理论、教育心理学、作品分析等多个维度上保持精进。以下是数码旭老师基于十余年教学实践的自评维度图。
            </p>

            <div className="space-y-3">
              {radarData.map((item) => (
                <button
                  key={item.subject}
                  onMouseEnter={() => setHovered(item.subject)}
                  onMouseLeave={() => setHovered(null)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-lg text-left transition-all duration-300 ${
                    hovered === item.subject
                      ? "bg-[#1a1a1a] text-white shadow-lg"
                      : "bg-[#FAFAFA] text-[#1a1a1a] hover:bg-[#F0F0F0]"
                  }`}
                >
                  <span className="text-sm font-medium">{item.subject}</span>
                  <span className={`text-sm font-bold ${
                    hovered === item.subject ? "text-white" : "text-[#8B7355]"
                  }`}>
                    {item.A}
                  </span>
                </button>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="relative aspect-square max-w-[500px] mx-auto">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="#E5E5E5" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: "#86868B", fontSize: 12, fontWeight: 500 }}
                  />
                  <PolarRadiusAxis
                    angle={30}
                    domain={[0, 100]}
                    tick={false}
                    axisLine={false}
                  />
                  <Radar
                    name="数码旭"
                    dataKey="A"
                    stroke="#1a1a1a"
                    strokeWidth={2}
                    fill="#1a1a1a"
                    fillOpacity={0.08}
                  />
                  <Tooltip content={<CustomTooltip />} />
                </RadarChart>
              </ResponsiveContainer>

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <span className="text-3xl font-bold text-[#1a1a1a]">93</span>
                  <span className="block text-[10px] text-[#86868B] tracking-wider uppercase mt-1">综合评分</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Teaching Philosophy Block                                          */
/* ------------------------------------------------------------------ */
function TeachingPhilosophy() {
  return (
    <section className="py-20 sm:py-28 md:py-32 bg-[#FAFAFA]">
      <div className="max-w-[720px] mx-auto px-6 sm:px-8">
        <ScrollReveal className="text-center mb-12">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#8B7355] font-semibold">
            教学理念
          </span>
          <h2
            className="mt-3 text-3xl sm:text-4xl text-[#1a1a1a] leading-tight"
            style={{ fontFamily: "'Playfair Display', 'Noto Serif SC', serif" }}
          >
            因材施教，多维综合
          </h2>
        </ScrollReveal>

        <ScrollReveal>
          <p className="text-lg sm:text-xl leading-[1.8] text-[#333] font-serif mb-8">
            毕业于华南师范大学音乐学专业声乐教育方向，师从日本留学的罗晓梅教授学习声乐两年，师从美国留学的王朝霞教授学习音乐教育两年。曾跟随名师学习古筝、钢琴、舞蹈，毕业后从事声乐教育工作至今十余年。
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="text-lg sm:text-xl leading-[1.8] text-[#333] font-serif mb-8">
            毕业后从事小学音乐课程教学工作，课余组织训练校合唱梯队，比赛屡次收获深圳市及龙岗区的特等奖、一等奖，多次参与课堂教学示范课，在音乐教师技能大赛中获声乐一等奖、全能一等奖。
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <blockquote className="my-14 text-center">
            <p className="text-2xl sm:text-3xl md:text-4xl font-serif leading-[1.35] text-[#1a1a1a] tracking-tight">
              <span className="text-[#8B7355] text-5xl sm:text-6xl leading-none mr-2 font-serif">
                "
              </span>
              声乐不应该独立于音乐各学科之外，全面且有效的提升音乐技能，才是对每一位学生最大的负责。
              <span className="text-[#8B7355] text-5xl sm:text-6xl leading-none ml-1 font-serif">
                "
              </span>
            </p>
          </blockquote>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="text-lg sm:text-xl leading-[1.8] text-[#333] font-serif mb-8">
            从事社会声乐教育至今，专注儿童声乐和成年人声乐教育。曾在自由节奏艺术培训中心任教；在广东省关心下一代工作委员会指导，广东省公共文化促进会主办的「腾飞中国2019广东省少儿才艺大赛深圳赛区」担任特邀评委。
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
            <div className="text-center p-6 rounded-2xl bg-white border border-[#E5E5E5]">
              <Music className="w-6 h-6 text-[#8B7355] mx-auto mb-3" />
              <h3 className="text-sm font-semibold text-[#1a1a1a] mb-1">教育对象</h3>
              <p className="text-xs text-[#86868B]">学前、中小学、成人</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white border border-[#E5E5E5]">
              <Award className="w-6 h-6 text-[#8B7355] mx-auto mb-3" />
              <h3 className="text-sm font-semibold text-[#1a1a1a] mb-1">教学特点</h3>
              <p className="text-xs text-[#86868B]">多维综合教学</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white border border-[#E5E5E5]">
              <Heart className="w-6 h-6 text-[#8B7355] mx-auto mb-3" />
              <h3 className="text-sm font-semibold text-[#1a1a1a] mb-1">教学理念</h3>
              <p className="text-xs text-[#86868B]">因材施教，全面素养</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Q&A Section — Mock Auth + Database                                 */
/* ------------------------------------------------------------------ */
function QuestionSection() {
  const [user, setUser] = useState<User | null>(getMockUser);
  const [questions, setQuestions] = useState<Question[]>(getMockQuestions);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [loginName, setLoginName] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [qText, setQText] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginName.trim() || !loginEmail.trim()) return;
    const u = { name: loginName.trim(), email: loginEmail.trim() };
    setMockUser(u);
    setUser(u);
  };

  const handleLogout = () => {
    setMockUser(null);
    setUser(null);
  };

  const handleSubmitQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!qText.trim() || !user) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    const newQ: Question = {
      id: Date.now(),
      user: user.name,
      text: qText.trim(),
      reply: null,
      time: new Date().toISOString().slice(0, 10),
    };
    addMockQuestion(newQ);
    setQuestions(getMockQuestions());
    setQText("");
    setIsSubmitting(false);
  };

  return (
    <section className="py-20 sm:py-28 md:py-32 bg-[#FAFAFA]">
      <div className="max-w-[800px] mx-auto px-6 sm:px-8">
        <ScrollReveal className="text-center mb-12">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#8B7355] font-semibold">
            互动交流
          </span>
          <h2
            className="mt-3 text-3xl sm:text-4xl text-[#1a1a1a] leading-tight"
            style={{ fontFamily: "'Playfair Display', 'Noto Serif SC', serif" }}
          >
            向陈老师提问
          </h2>
          <p className="mt-4 text-sm text-[#86868B] max-w-md mx-auto">
            关于声乐学习、艺考准备、或音乐人生的任何疑问。
            <br />
            <span className="text-[#8B7355]">登录后可提交问题，陈老师会亲自回复。</span>
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mb-10">
            <AnimatePresence mode="wait">
              {!user ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-2xl border border-[#E5E5E5] p-6 sm:p-8"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center">
                      <Lock className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-[#1a1a1a]">学员登录</h3>
                      <p className="text-xs text-[#86868B]">模拟身份验证系统</p>
                    </div>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-[#86868B] mb-1.5">姓名</label>
                        <input
                          type="text"
                          value={loginName}
                          onChange={(e) => setLoginName(e.target.value)}
                          placeholder="您的称呼"
                          className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAFA] border border-[#E5E5E5] text-sm text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-[#86868B] mb-1.5">邮箱</label>
                        <input
                          type="email"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAFA] border border-[#E5E5E5] text-sm text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] transition-colors"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#1a1a1a] text-white text-sm font-medium hover:bg-[#333] transition-colors"
                    >
                      登录 / 注册
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="user"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-2xl border border-[#E5E5E5] p-6 sm:p-8"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B7355] to-[#a89080] flex items-center justify-center text-white text-sm font-bold">
                        {user.name[0]}
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-[#1a1a1a]">{user.name}</h3>
                        <p className="text-xs text-[#86868B]">{user.email}</p>
                      </div>
                      <span className="ml-2 px-2 py-0.5 rounded-full bg-[#1a1a1a] text-white text-[10px] font-medium">
                        已认证
                      </span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-1.5 text-xs text-[#86868B] hover:text-[#1a1a1a] transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      退出
                    </button>
                  </div>

                  <form onSubmit={handleSubmitQuestion} className="mt-6">
                    <textarea
                      value={qText}
                      onChange={(e) => setQText(e.target.value)}
                      placeholder="请输入您的问题..."
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAFAFA] border border-[#E5E5E5] text-sm text-[#1a1a1a] placeholder:text-[#86868B]/60 focus:outline-none focus:border-[#1a1a1a] transition-colors resize-none"
                    />
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-[#86868B]">
                        {qText.length} / 300 字
                      </span>
                      <button
                        type="submit"
                        disabled={!qText.trim() || isSubmitting}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#1a1a1a] text-white text-sm font-medium hover:bg-[#333] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            提交中...
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            提交问题
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ScrollReveal>

        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-6">
            <MessageCircle className="w-4 h-4 text-[#86868B]" />
            <span className="text-xs text-[#86868B] tracking-wide">
              共 {questions.length} 条问答 · 数据存储于 localStorage（模拟 Database）
            </span>
          </div>

          <AnimatePresence>
            {questions.map((q, i) => (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl border border-[#E5E5E5] p-5 sm:p-6"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FAFAFA] flex items-center justify-center shrink-0 text-xs font-bold text-[#86868B]">
                    {q.user[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-[#1a1a1a]">{q.user}</span>
                      <span className="text-[10px] text-[#86868B]">{q.time}</span>
                    </div>
                    <p className="text-sm text-[#333] leading-relaxed">{q.text}</p>
                  </div>
                </div>

                {q.reply && (
                  <div className="mt-4 ml-11 pl-4 border-l-2 border-[#8B7355]">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-[#8B7355]">陈老师回复</span>
                    </div>
                    <p className="text-sm text-[#555] leading-relaxed">{q.reply}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
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
          © 2024 琴鸣声乐工作室 · 创始人 数码旭
        </p>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page                                                          */
/* ------------------------------------------------------------------ */
export default function TeacherPage() {
  return (
    <div className="min-h-screen bg-white antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Noto+Serif+SC:wght@300;400;500;600;700&display=swap');
        html { scroll-behavior: smooth; }
      `}</style>

      <Navigation />
      <HeroSection />
      <TeachingPhilosophy />
      <TimelineSection />
      <LifeWall />
      <RadarSection />
      <QuestionSection />
      <Footer />
    </div>
  );
}
