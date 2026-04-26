import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  ChevronRight,
  Music,
  Mic2,
  Users,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Star,
  Play,
  Award,
  Heart,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "../../components/Navigation";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

interface CourseCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  imageUrl: string;
  reverse?: boolean;
}

interface MentorCardProps {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}

/* ------------------------------------------------------------------ */
/*  Animation Variants                                                 */
/* ------------------------------------------------------------------ */
const fadeInUp = {
  hidden: { opacity: 0, y: 60, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.9, ease: "easeOut" as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: "easeOut" as const },
  },
};

/* ------------------------------------------------------------------ */
/*  Reusable Components                                                */
/* ------------------------------------------------------------------ */

function AnimatedSection({
  children,
  className = "",
  id,
}: SectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <motion.span
      variants={fadeInUp}
      className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-[#64748B] mb-4"
    >
      {text}
    </motion.span>
  );
}

function SectionTitle({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.h2
      variants={fadeInUp}
      className={`text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-semibold tracking-tight text-[#0F172A] leading-[1.1] ${className}`}
    >
      {children}
    </motion.h2>
  );
}

function SectionDesc({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.p
      variants={fadeInUp}
      className={`text-base sm:text-lg md:text-xl text-[#64748B] leading-relaxed max-w-2xl ${className}`}
    >
      {children}
    </motion.p>
  );
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
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%]">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=1920&q=80"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://cdn.coverr.co/videos/coverr-playing-the-piano-2535/1080p.mp4"
            type="video/mp4"
          />
        </video>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-[#0F172A]/50" />
      </motion.div>

      {/* Hero Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 flex flex-col items-start justify-center h-full text-left px-8 sm:px-16 md:px-24 lg:px-32"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" as const }}
          className="backdrop-blur-md bg-white/5 rounded-3xl px-8 py-10 sm:px-14 sm:py-14 border border-white/10 shadow-2xl max-w-2xl"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="inline-block text-[10px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-white/70 mb-4"
          >
            深圳 · 高端一对一音乐教育
          </motion.span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[88px] font-semibold text-white tracking-tight leading-[1.05] mb-4">
            琴鸣声乐
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-light tracking-wide mb-2">
            让每一次发声，都成为艺术
          </p>
          <p className="text-sm sm:text-base text-white/60 max-w-md mx-auto leading-relaxed">
            专注钢琴与声乐一对一私教 · 深圳福田中心区
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-white/40 flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-white/60 rounded-full" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Philosophy Section                                                 */
/* ------------------------------------------------------------------ */
function PhilosophySection() {
  const values = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "因材施教",
      desc: "每位学员都有独特的声线与指尖，我们拒绝流水线式教学，只为你的天赋定制成长路径。",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "专业深耕",
      desc: "导师均毕业于海内外顶尖音乐学府，平均教龄10年以上，深谙英皇考级与艺考体系。",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "一对一尊享",
      desc: "深圳少有的全一对一教学模式，每节课60-90分钟，确保老师100%的注意力在你身上。",
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "舞台实践",
      desc: "定期举办学员音乐会与大师班，让练习不只是练习，而是通往舞台的每一步。",
    },
  ];

  return (
    <AnimatedSection id="philosophy" className="py-24 sm:py-32 md:py-40 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
        <div className="text-center mb-16 sm:mb-20">
          <SectionLabel text="工作室理念" />
          <SectionTitle className="mb-6">
            音乐不是技巧的堆砌，
            <br className="hidden sm:block" />
            而是灵魂的对话
          </SectionTitle>
          <SectionDesc className="mx-auto">
            在深圳这座快节奏的城市里，琴鸣坚持慢下来——
            用专业的态度，守护每一位学员对音乐最纯粹的热爱。
          </SectionDesc>
          <motion.div variants={fadeInUp} className="mt-8">
            <Link
              to="/philosophy"
              className="inline-flex items-center gap-2 text-sm text-[#0F172A] hover:text-[#64748B] transition-colors tracking-wide font-medium"
            >
              琴鸣教育理念
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6"
        >
          {values.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeInUp}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="group text-center sm:text-left p-6 sm:p-8 rounded-2xl hover:bg-[#F1F5F9] transition-colors duration-500"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#0F172A] text-white mb-5 group-hover:scale-110 transition-transform duration-500">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-[#0F172A] mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-[#64748B] leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

/* ------------------------------------------------------------------ */
/*  Course Card                                                        */
/* ------------------------------------------------------------------ */
function CourseCard({
  icon,
  title,
  subtitle,
  description,
  features,
  imageUrl,
  reverse = false,
}: CourseCardProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={`flex flex-col ${
        reverse ? "lg:flex-row-reverse" : "lg:flex-row"
      } items-center gap-10 lg:gap-16`}
    >
      {/* Image Side */}
      <motion.div
        variants={scaleIn}
        className="w-full lg:w-1/2 aspect-[4/3] sm:aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#F1F5F9]"
      >
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </motion.div>

      {/* Content Side */}
      <div className="w-full lg:w-1/2">
        <SectionLabel text={subtitle} />
        <SectionTitle className="mb-5 sm:mb-6">{title}</SectionTitle>
        <SectionDesc className="mb-6 sm:mb-8">{description}</SectionDesc>

        <motion.ul variants={staggerContainer} className="space-y-3 sm:space-y-4">
          {features.map((feature) => (
            <motion.li
              key={feature}
              variants={fadeInUp}
              className="flex items-start gap-3 text-sm sm:text-base text-[#0F172A]/80"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#64748B] mt-0.5 shrink-0" />
              <span>{feature}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Piano Section                                                      */
/* ------------------------------------------------------------------ */
function PianoSection() {
  return (
    <AnimatedSection id="piano" className="py-24 sm:py-32 md:py-40 bg-[#F8FAFC]">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
        <CourseCard
          icon={<Music className="w-10 h-10 sm:w-12 sm:h-12" />}
          subtitle="钢琴课程"
          title="指尖下的诗与远方"
          description="从启蒙到演奏级，我们采用国际主流的英皇（ABRSM）与中央音乐学院考级体系，结合学员个性制定专属进阶路线。全工作室配备演奏级三角钢琴教学。"
          features={[
            "幼儿启蒙（4-6岁）：奥尔夫+铃木教学法，快乐入门",
            "青少年进阶：系统化技巧训练+音乐表现力塑造",
            "成人零基础：灵活排课，圆你一个钢琴梦",
            "艺考与留学作品集辅导：历年名校录取率92%",
            "英皇乐理与演奏考级：Level 1 - LRSM 全级别覆盖",
          ]}
          imageUrl="https://images.unsplash.com/photo-1552422535-c45813c61732?w=800&h=600&fit=crop&q=80"
        />
        <motion.div variants={fadeInUp} className="mt-10 text-center">
          <Link
            to="/piano-philosophy"
            className="inline-flex items-center gap-2 text-sm text-[#0F172A] hover:text-[#64748B] transition-colors tracking-wide font-medium"
          >
            探索钢琴教育理念
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

/* ------------------------------------------------------------------ */
/*  Vocal Section                                                      */
/* ------------------------------------------------------------------ */
function VocalSection() {
  return (
    <AnimatedSection id="vocal" className="py-24 sm:py-32 md:py-40 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
        <CourseCard
          icon={<Mic2 className="w-10 h-10 sm:w-12 sm:h-12" />}
          subtitle="声乐课程"
          title="找到属于你的声音"
          description="无论美声、民族还是流行演唱，我们的声乐导师都具备扎实的学院派功底与丰富的舞台经验。一对一科学发声训练，让你的声音更有力量、更自由。"
          features={[
            "科学发声体系：呼吸支撑、共鸣位置、声带闭合专项训练",
            "流行演唱：R&B、爵士、民谣等风格化演唱技巧",
            "古典声乐：意大利美声体系，歌剧咏叹调作品指导",
            "艺考声乐：选曲策略+舞台表现+应试心理全方位辅导",
            "嗓音康复：针对声带小结、疲劳用嗓的专业恢复训练",
          ]}
          imageUrl="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop&q=80"
          reverse
        />
        <motion.div variants={fadeInUp} className="mt-10 text-center">
          <Link
            to="/vocal"
            className="inline-flex items-center gap-2 text-sm text-[#0F172A] hover:text-[#64748B] transition-colors tracking-wide font-medium"
          >
            探索声乐教育理念
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

/* ------------------------------------------------------------------ */
/*  Mentor Card                                                        */
/* ------------------------------------------------------------------ */
function MentorCard({ name, role, bio, imageUrl }: MentorCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -8, transition: { duration: 0.4 } }}
      className="group text-center"
    >
      <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-5 sm:mb-6 rounded-full overflow-hidden bg-gradient-to-br from-[#E8E8ED] to-[#D2D2D7] group-hover:shadow-xl transition-shadow duration-500">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
      </div>
      <h3 className="text-lg sm:text-xl font-semibold text-[#0F172A] mb-1">
        {name}
      </h3>
      <p className="text-xs sm:text-sm text-[#64748B] font-medium mb-3 tracking-wide">
        {role}
      </p>
      <p className="text-sm text-[#64748B] leading-relaxed max-w-xs mx-auto">
        {bio}
      </p>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mentors Section                                                    */
/* ------------------------------------------------------------------ */
function MentorsSection() {
  const mentors = [
    {
      name: "数码旭",
      role: "创始人 / 声乐教学总监",
      bio: "毕业于华南师范大学音乐学专业声乐教育方向，师从日本留学的罗晓梅教授学习声乐两年，师从美国留学的王朝霞教授学习音乐教育两年。曾跟随名师学习古筝、钢琴、舞蹈，毕业后从事声乐教育工作至今十余年。在音乐教师技能大赛中获声乐一等奖、全能一等奖，专注儿童声乐与成年人声乐教育。",
      imageUrl: "/teacher-avatar.png",
    },
    {
      name: "林韵然",
      role: "声乐教学总监",
      bio: "上海音乐学院声乐表演硕士，曾获意大利贝里尼国际声乐比赛银奖，深耕美声与流行跨界教学，擅长挖掘学员独特音色。",
      imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&q=80",
    },
    {
      name: "张牧之",
      role: "钢琴 / 乐理导师",
      bio: "英国皇家音乐学院（RCM）钢琴演奏学士，ABRSM官方认证教师，精通英皇考级体系，课堂严谨而不失幽默，深受学员喜爱。",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80",
    },
    {
      name: "王若溪",
      role: "声乐 / 音乐剧导师",
      bio: "中央音乐学院声乐歌剧系本科，后赴纽约进修音乐剧表演，擅长流行演唱与音乐剧选段指导，让学员在表演中释放声音魅力。",
      imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&q=80",
    },
  ];

  return (
    <AnimatedSection id="mentors" className="py-24 sm:py-32 md:py-40 bg-[#F8FAFC]">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
        <div className="text-center mb-14 sm:mb-20">
          <SectionLabel text="导师阵容" />
          <SectionTitle className="mb-6">
            遇见你的引路人
          </SectionTitle>
          <SectionDesc className="mx-auto">
            每一位导师，都是曾在舞台中央发光的音乐家。
            如今，他们把光芒化作烛火，照亮你的音乐之路。
          </SectionDesc>
          <motion.div variants={fadeInUp} className="mt-8">
            <Link
              to="/teacher"
              className="inline-flex items-center gap-2 text-sm text-[#0F172A] hover:text-[#64748B] transition-colors tracking-wide font-medium"
            >
              了解创始人
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8"
        >
          {mentors.map((m) => (
            <MentorCard key={m.name} {...m} />
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

/* ------------------------------------------------------------------ */
/*  Booking Section                                                    */
/* ------------------------------------------------------------------ */
function BookingSection() {
  const [form, setForm] = useState({ name: "", phone: "", course: "", duration: "", note: "" });
  const [durationMode, setDurationMode] = useState<"longterm" | "months" | "">("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const courseOptions = ["钢琴启蒙", "钢琴进阶", "声乐演唱", "艺考辅导"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.course) {
      setStatus("error");
      setMessage("请填写姓名、电话并选择课程");
      return;
    }
    setLoading(true);
    setStatus("idle");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("提交失败");
      setStatus("success");
      setMessage("预约提交成功！我们将在24小时内与您联系。");
      setForm({ name: "", phone: "", course: "", duration: "", note: "" });
      setDurationMode("");
    } catch (err) {
      setStatus("error");
      setMessage("提交失败，请检查网络或稍后重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatedSection id="booking" className="py-24 sm:py-32 md:py-40 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
        <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-20">
          <SectionLabel text="预约试听" />
          <SectionTitle className="mb-6">
            开启你的第一节课
          </SectionTitle>
          <SectionDesc>
            我们提供免费一对一试听课（30分钟）。
            让导师了解你的基础与目标，也让你感受琴鸣的教学氛围。
          </SectionDesc>
        </div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-2xl mx-auto"
        >
          {status === "success" && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 text-emerald-700 text-sm text-center">
              {message}
            </div>
          )}
          {status === "error" && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-700 text-sm text-center">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              <div>
                <label className="block text-xs font-medium text-[#64748B] mb-2 uppercase tracking-wider">
                  姓名
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="您的称呼"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#F1F5F9] border-0 text-[#0F172A] placeholder:text-[#64748B]/60 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F172A]/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#64748B] mb-2 uppercase tracking-wider">
                  电话
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="联系电话"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#F1F5F9] border-0 text-[#0F172A] placeholder:text-[#64748B]/60 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F172A]/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#64748B] mb-2 uppercase tracking-wider">
                感兴趣的课程
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {courseOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setForm({ ...form, course: opt })}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                      form.course === opt
                        ? "bg-[#0F172A] text-white"
                        : "bg-[#F1F5F9] text-[#0F172A] hover:bg-[#0F172A] hover:text-white"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#64748B] mb-2 uppercase tracking-wider">
                期望学习时长
              </label>
              <div className="flex flex-wrap gap-3 mb-3">
                <button
                  type="button"
                  onClick={() => {
                    setDurationMode("longterm");
                    setForm({ ...form, duration: "长期系统学习" });
                  }}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                    durationMode === "longterm"
                      ? "bg-[#0F172A] text-white"
                      : "bg-[#F1F5F9] text-[#0F172A] hover:bg-[#0F172A] hover:text-white"
                  }`}
                >
                  长期系统学习
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDurationMode("months");
                    setForm({ ...form, duration: "" });
                  }}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                    durationMode === "months"
                      ? "bg-[#0F172A] text-white"
                      : "bg-[#F1F5F9] text-[#0F172A] hover:bg-[#0F172A] hover:text-white"
                  }`}
                >
                  具体月份
                </button>
              </div>
              {durationMode === "months" && (
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={1}
                    max={120}
                    value={form.duration.replace(/[^0-9]/g, "")}
                    onChange={(e) => setForm({ ...form, duration: e.target.value ? `${e.target.value}个月` : "" })}
                    placeholder="例如：6"
                    className="flex-1 px-4 py-3 rounded-xl bg-[#F1F5F9] border-0 text-[#0F172A] placeholder:text-[#64748B]/60 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F172A]/20 transition-all"
                  />
                  <span className="text-sm text-[#64748B]">个月</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-[#64748B] mb-2 uppercase tracking-wider">
                备注
              </label>
              <textarea
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                rows={4}
                placeholder="请简述您的音乐基础、学习目标或希望预约的时间..."
                className="w-full px-4 py-3.5 rounded-xl bg-[#F1F5F9] border-0 text-[#0F172A] placeholder:text-[#64748B]/60 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F172A]/20 transition-all resize-none"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-[#0F172A] text-white text-sm font-semibold tracking-wide hover:bg-[#1E293B] transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <Calendar className="w-4 h-4" />
              {loading ? "提交中..." : "提交预约申请"}
            </motion.button>

            <p className="text-center text-xs text-[#64748B] mt-4">
              提交后我们将在24小时内与您联系确认试听时间
            </p>
          </form>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

/* ------------------------------------------------------------------ */
/*  Contact Bar                                                        */
/* ------------------------------------------------------------------ */
function ContactBar() {
  return (
    <AnimatedSection className="py-16 sm:py-20 bg-[#0F172A]">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 text-center"
        >
          <motion.div variants={fadeInUp} className="flex flex-col items-center">
            <MapPin className="w-5 h-5 text-white/40 mb-3" />
            <h4 className="text-sm font-semibold text-white mb-1"> studio地址</h4>
            <p className="text-sm text-white/50">
              深圳市福田区中心四路嘉里建设广场3座
            </p>
          </motion.div>
          <motion.div variants={fadeInUp} className="flex flex-col items-center">
            <Phone className="w-5 h-5 text-white/40 mb-3" />
            <h4 className="text-sm font-semibold text-white mb-1">预约热线</h4>
            <p className="text-sm text-white/50">0755-8888-9999</p>
          </motion.div>
          <motion.div variants={fadeInUp} className="flex flex-col items-center">
            <Mail className="w-5 h-5 text-white/40 mb-3" />
            <h4 className="text-sm font-semibold text-white mb-1">电子邮箱</h4>
            <p className="text-sm text-white/50">hello@qinming.studio</p>
          </motion.div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */
function Footer() {
  return (
    <footer className="py-8 sm:py-10 bg-[#0F172A] border-t border-white/10">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © 2024 琴鸣声乐工作室 Qinming Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">
              隐私政策
            </a>
            <a href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">
              服务条款
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  Main App                                                           */
/* ------------------------------------------------------------------ */
export default function HomePageV2() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased selection:bg-[#0F172A] selection:text-white">
      {/* Inter font via Google Fonts - add to your index.html head:
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
      */}
      <style>{`
        html {
          scroll-behavior: smooth;
        }
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
      `}</style>

      <Navigation />
      <HeroSection />
      <PhilosophySection />
      <PianoSection />
      <VocalSection />
      <MentorsSection />
      <BookingSection />
      <ContactBar />
      <Footer />
    </div>
  );
}
