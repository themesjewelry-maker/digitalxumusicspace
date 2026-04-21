import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import { ArrowLeft, Music, Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";

/* ------------------------------------------------------------------ */
/*  Animation Variants                                                 */
/* ------------------------------------------------------------------ */
const fadeInUp = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const fadeInSlow = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 2, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

/* ------------------------------------------------------------------ */
/*  Reusable Components                                                */
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
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{
        duration: 1.2,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function PullQuote({
  text,
  author,
}: {
  text: string;
  author?: string;
}) {
  return (
    <ScrollReveal>
      <blockquote className="my-20 sm:my-28 md:my-36 text-center max-w-4xl mx-auto px-6">
        <p className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-serif leading-[1.35] text-[#1a1a1a] tracking-tight">
          <span className="text-[#8B7355] text-5xl sm:text-6xl md:text-7xl leading-none mr-2 font-serif">
            "
          </span>
          {text}
          <span className="text-[#8B7355] text-5xl sm:text-6xl md:text-7xl leading-none ml-1 font-serif">
            "
          </span>
        </p>
        {author && (
          <cite className="block mt-8 text-sm tracking-[0.2em] uppercase text-[#86868B] not-italic font-medium">
            — {author}
          </cite>
        )}
      </blockquote>
    </ScrollReveal>
  );
}

function ChapterHeading({
  number,
  title,
  subtitle,
}: {
  number: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <ScrollReveal className="mb-12 sm:mb-16 md:mb-20">
      <div className="flex items-baseline gap-4 mb-4">
        <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#8B7355]">
          {number}
        </span>
        <div className="h-px flex-1 bg-[#E5E5E5]" />
      </div>
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-serif text-[#1a1a1a] leading-[1.15] tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg sm:text-xl text-[#86868B] font-light leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </ScrollReveal>
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

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Scale Effect */}
      <motion.div style={{ scale }} className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity, y }}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-white/60 mb-6"
        >
          琴鸣声乐工作室 · 琴鸣工作室理念
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-[88px] font-serif text-white leading-[1.05] tracking-tight max-w-5xl"
        >
          在速度之城
          <br />
          聆听永恒
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1.5 }}
          className="mt-8 text-base sm:text-lg text-white/60 max-w-xl leading-relaxed font-light"
        >
          当深圳的霓虹以每秒三十帧的速度闪烁，
          <br className="hidden sm:block" />
          有人在黑白键上，为时间按下暂停键。
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-white/40 text-xs tracking-[0.2em] uppercase"
          >
            向下滚动
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Drop Cap Lead Section                                              */
/* ------------------------------------------------------------------ */
function LeadSection() {
  return (
    <section className="py-20 sm:py-28 md:py-36 bg-white">
      <div className="max-w-[720px] mx-auto px-6 sm:px-8">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-10 text-[#86868B]">
            <Clock className="w-4 h-4" />
            <span className="text-xs tracking-[0.2em] uppercase">阅读时间约 6 分钟</span>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <p className="text-lg sm:text-xl md:text-[22px] leading-[1.8] text-[#333] font-serif">
            <span className="float-left text-6xl sm:text-7xl md:text-8xl leading-[0.8] mr-3 mt-1 font-serif text-[#1a1a1a]">
              深
            </span>
            圳不是一座鼓励慢下来的城市。这里的时间以毫秒计价，地铁关门提示音响起的间隔精确到零点七秒，科技园的咖啡杯在会议桌上停留的平均时长不超过十一分钟。然而，就在这座城市最核心的地带，在一扇隔绝了车马喧嚣的门后，有人正用指尖触碰一件诞生于三百年前的乐器——而那一刻，时间不再是线性的流逝，而是变成了可以被折叠、被延展、被反复咀嚼的质地。
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="mt-8 text-lg sm:text-xl md:text-[22px] leading-[1.8] text-[#333] font-serif">
            这不仅仅是一堂钢琴课。这是一场关于如何在极速时代守护内心秩序的隐秘修行。当巴赫的赋格在三角钢琴上铺展开来，当肖邦的夜曲让窗外的霓虹变得遥远而朦胧，我们忽然意识到：古典音乐在深圳的传承，从来不只是技艺的传授，而是一种生活哲学的存续。
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Parallax Image Section                                             */
/* ------------------------------------------------------------------ */
function ParallaxImageSection({
  imageUrl,
  caption,
}: {
  imageUrl: string;
  caption: string;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <section ref={ref} className="relative h-[70vh] sm:h-[80vh] md:h-screen overflow-hidden my-16 sm:my-24">
      <motion.div style={{ y, scale }} className="absolute inset-[-20%]">
        <img
          src={imageUrl}
          alt={caption}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </motion.div>
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute bottom-8 left-6 sm:left-12 right-6">
        <p className="text-xs sm:text-sm text-white/70 tracking-wide max-w-md leading-relaxed">
          {caption}
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Black & White to Color Section                                     */
/* ------------------------------------------------------------------ */
function ColorRevealSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const grayscale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [100, 100, 0, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.05, 1]);

  return (
    <section ref={ref} className="relative min-h-[150vh] bg-[#0a0a0a]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ scale }} className="absolute inset-0">
          <motion.div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1552422535-c45813c61732?w=1920&q=80')",
              filter: useTransform(grayscale, (v) => `grayscale(${v}%)`),
            }}
          />
        </motion.div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-[1.1] tracking-tight mb-6">
              从黑白，到色彩
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed font-light">
              初学琴时，世界只有黑与白。音阶是阶梯，节拍器是律法。
              <br className="hidden md:block" />
              直到有一天，你发现黑白键之间，藏着整个宇宙的色谱。
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Timeline Section                                                   */
/* ------------------------------------------------------------------ */
const timelineEvents = [
  {
    year: "1709",
    title: "克里斯托弗里之手",
    desc: "意大利人巴尔托洛梅奥·克里斯托弗里在佛罗伦萨制造了世界上第一架钢琴，名为『gravicembalo col piano e forte』——能演奏强弱的大键琴。那一刻，音乐家第一次拥有了控制音量的自由。",
    image: "https://images.unsplash.com/photo-1514117445516-2ecfc9c4ec90?w=800&q=80",
  },
  {
    year: "1770s",
    title: "维也纳的黎明",
    desc: "莫扎特在萨尔茨堡的镜厅中演奏早期维也纳式钢琴，其轻盈透明的音色成为了古典主义美学的声音化身。那时的钢琴，是贵族沙龙里最奢侈的谈资。",
    image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&q=80",
  },
  {
    year: "1803",
    title: "贝多芬的怒吼",
    desc: "当贝多芬的《月光奏鸣曲》在维也纳首演，钢琴已经能够承受情感的核爆。他拍打琴键，让琴弦在极限中颤抖——钢琴不再只是乐器，而是人类灵魂的扩音器。",
    image: "https://images.unsplash.com/photo-1552422535-c45813c61732?w=800&q=80",
  },
  {
    year: "1850s",
    title: "工业时代的钢铁之心",
    desc: "铸铁框架与交叉弦列的发明，让钢琴获得了前所未有的音量与稳定性。施坦威在纽约成立，钢琴成为了中产阶级客厅的中心，古典音乐第一次走入了寻常人家。",
    image: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=800&q=80",
  },
  {
    year: "1980s",
    title: "深圳的第一声琴音",
    desc: "当蛇口工业区的第一栋厂房封顶时，有人从香港带回了一架立式钢琴。那是改革开放后深圳的第一架钢琴，放置在某个教师公寓的逼仄客厅里，成为了这座城市最早的古典音乐火种。",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80",
  },
  {
    year: "2024",
    title: "琴鸣之声",
    desc: "今天，在深圳福田的中心地带，琴鸣声乐工作室延续着三百年的传统。我们不仅教授指法与乐理，更在传授一种对待时间的敬意——在这个一切都被加速的时代，依然有人愿意为一首曲子，付出一整年的打磨。",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80",
  },
];

function TimelineEvent({
  event,
  index,
}: {
  event: (typeof timelineEvents)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center mb-20 sm:mb-28 last:mb-0"
    >
      {/* Image Side */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -60 : 60, scale: 0.95 }}
        animate={
          isInView
            ? { opacity: 1, x: 0, scale: 1 }
            : { opacity: 0, x: isLeft ? -60 : 60, scale: 0.95 }
        }
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        className={`${isLeft ? "md:order-1" : "md:order-2"}`}
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      </motion.div>

      {/* Text Side */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? 60 : -60 }}
        animate={
          isInView
            ? { opacity: 1, x: 0 }
            : { opacity: 0, x: isLeft ? 60 : -60 }
        }
        transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        className={`${isLeft ? "md:order-2" : "md:order-1"} ${
          isLeft ? "md:text-left" : "md:text-right"
        }`}
      >
        <span className="inline-block text-xs tracking-[0.3em] uppercase text-[#8B7355] font-semibold mb-3">
          {event.year}
        </span>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#1a1a1a] leading-tight mb-4">
          {event.title}
        </h3>
        <p className="text-base sm:text-lg text-[#555] leading-[1.75] font-serif">
          {event.desc}
        </p>
      </motion.div>
    </div>
  );
}

function TimelineSection() {
  const lineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-24 sm:py-32 md:py-40 bg-[#FAFAFA]">
      <div className="max-w-[1100px] mx-auto px-6 sm:px-8">
        <ScrollReveal className="text-center mb-20 sm:mb-28">
          <span className="text-xs tracking-[0.3em] uppercase text-[#8B7355] font-semibold">
            钢琴三百年
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-serif text-[#1a1a1a] leading-[1.1] tracking-tight">
            一条穿越时间的河流
          </h2>
          <p className="mt-6 text-lg text-[#86868B] max-w-2xl mx-auto leading-relaxed">
            从佛罗伦萨的作坊到深圳的摩天楼，这架乐器的每一次演变，
            都是人类对美的不懈追问。
          </p>
        </ScrollReveal>

        <div ref={lineRef} className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[#E5E5E5] md:-translate-x-px">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-[#8B7355]"
            />
          </div>

          {/* Timeline Events */}
          <div className="relative space-y-0">
            {timelineEvents.map((event, index) => (
              <div key={event.year} className="relative pl-12 md:pl-0">
                {/* Dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="absolute left-4 md:left-1/2 top-8 w-3 h-3 rounded-full bg-[#8B7355] border-4 border-white shadow-sm md:-translate-x-1.5"
                />
                <TimelineEvent event={event} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Body Chapters                                                      */
/* ------------------------------------------------------------------ */
function ChapterOne() {
  return (
    <section className="py-20 sm:py-28 md:py-36 bg-white">
      <div className="max-w-[720px] mx-auto px-6 sm:px-8">
        <ChapterHeading
          number="第一章"
          title="速度之城，慢的艺术"
          subtitle="在深圳教钢琴，本质上是一场对抗城市节奏的行为艺术"
        />

        <ScrollReveal>
          <p className="text-lg sm:text-xl md:text-[22px] leading-[1.8] text-[#333] font-serif">
            有人问我，在深圳教古典钢琴是不是一种反讽。这座城市以「深圳速度」闻名——从渔村到国际都市，只用了四十年。而巴赫的一首赋格，可能就需要一个学生花费整整三个月去消化其中的对位关系。速度，在这里似乎是一个不合时宜的词汇。
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="mt-8 text-lg sm:text-xl md:text-[22px] leading-[1.8] text-[#333] font-serif">
            但正是这种张力，让钢琴教育在深圳拥有了别处不具备的深度。我们的学员中有腾讯的工程师，他们在调试完千万级并发的代码后，坐在钢琴前，试图让十根手指以完全不同的节奏运动——左手的三连音对右手的四连音，这种被称为「三对四」的技法，让他们第一次体会到：原来人类的大脑，可以在比服务器更复杂的逻辑中寻找到和谐。
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="mt-8 text-lg sm:text-xl md:text-[22px] leading-[1.8] text-[#333] font-serif">
            也有基金经理，习惯了在K线的起伏中做决策，却在肖邦的一首夜曲前彻底放下了防御。他告诉我，当他第一次不靠乐谱、仅凭肌肉记忆弹完《降E大调夜曲》时，那种掌控感比任何一笔成功的交易都更令人战栗——因为这不是对市场的预测，而是对自己身体的绝对统治。
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

function ChapterTwo() {
  return (
    <section className="py-20 sm:py-28 md:py-36 bg-[#FAFAFA]">
      <div className="max-w-[720px] mx-auto px-6 sm:px-8">
        <ChapterHeading
          number="第二章"
          title="一对一的私密仪式"
          subtitle="在音乐面前，没有标准化的灵魂"
        />

        <ScrollReveal>
          <p className="text-lg sm:text-xl md:text-[22px] leading-[1.8] text-[#333] font-serif">
            琴鸣从成立之初就做了一个在外人看来极其「不商业」的决定：我们只做一对一教学。这意味着我们无法像培训机构那样，用一间大教室、一位老师、三十个学生来实现规模效应。但这也意味着，每一节课都是一次量身定制的对话。
          </p>
        </ScrollReveal>

        <PullQuote
          text="好老师不是把知识灌进容器，而是点燃一把火。而点燃火焰的前提，是你必须看见眼前这个具体的人。"
          author="数码旭，琴鸣创始人"
        />

        <ScrollReveal>
          <p className="text-lg sm:text-xl md:text-[22px] leading-[1.8] text-[#333] font-serif">
            我见过太多被「标准化教学」摧毁了兴趣的孩子。他们在考级体系里疲于奔命，每年考一级，考完了却从来没有完整地弹过一首自己真正喜欢的曲子。他们的手指可以准确地跑动音阶，但他们的心早已逃离了音乐。在琴鸣，我们的第一课从来不谈技巧，而是问学生一个问题：「你为什么会坐在这里？」
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="mt-8 text-lg sm:text-xl md:text-[22px] leading-[1.8] text-[#333] font-serif">
            答案千奇百怪。有人说因为小时候听过《致爱丽丝》，那个旋律在记忆里藏了三十年。有人说因为想要在孩子面前证明自己不是只会工作的父亲。还有人说，只是因为深圳的夜太长了，需要一种方式来证明自己还真实地活着。每一个答案，都决定了一条完全不同的教学路径。
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

function ChapterThree() {
  return (
    <section className="py-20 sm:py-28 md:py-36 bg-white">
      <div className="max-w-[720px] mx-auto px-6 sm:px-8">
        <ChapterHeading
          number="第三章"
          title="传承的另一种可能"
          subtitle="古典音乐不需要被拯救，它需要被重新理解"
        />

        <ScrollReveal>
          <p className="text-lg sm:text-xl md:text-[22px] leading-[1.8] text-[#333] font-serif">
            常常听到一种论调：古典音乐正在死去。年轻人只听短视频神曲，音乐厅里坐满了白发。但我从不认同这种悲观的叙事。在深圳，我看到了完全不同的景象——我们的成人学员数量在过去三年里增长了近三倍。他们不是被父母押送来的孩子，而是主动在加班后的深夜走进琴房的都市人。
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="mt-8 text-lg sm:text-xl md:text-[22px] leading-[1.8] text-[#333] font-serif">
            这些人为什么要学钢琴？不是为了成为演奏家——他们清楚地知道自己起步太晚。而是为了获得一种「深度注意力」。在这个注意力被算法切碎的时代，能够连续四十五分钟专注于一段复杂的乐谱，本身就是一种稀缺的认知能力。钢琴训练的是大脑的前额叶皮层，是工作记忆，是延迟满足的能力。这些能力，恰恰是数字时代最被侵蚀的品质。
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="mt-8 text-lg sm:text-xl md:text-[22px] leading-[1.8] text-[#333] font-serif">
            更有趣的是，这些成年学员往往会成为古典音乐最有力的传播者。他们会在周末的家庭聚会上弹一首德彪西，会在孩子的睡前时间播放巴赫的《哥德堡变奏曲》，会用自己笨拙但真诚的演奏告诉下一代：美不是手机里滑过的碎片，而是需要你坐下来、沉下心、付出时间才能抵达的彼岸。
          </p>
        </ScrollReveal>

        <PullQuote text="在深圳学琴的人，不是在逃离现代性。他们是在用最古老的方式，重新获得对自己的控制权。" />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Epilogue Section                                                   */
/* ------------------------------------------------------------------ */
function EpilogueSection() {
  return (
    <section className="py-24 sm:py-32 md:py-40 bg-[#1a1a1a] text-white">
      <div className="max-w-[720px] mx-auto px-6 sm:px-8 text-center">
        <ScrollReveal>
          <Music className="w-8 h-8 text-[#8B7355] mx-auto mb-8" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-serif leading-[1.1] tracking-tight mb-8">
            琴键有限，
            <br />
            而音乐无限
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-lg sm:text-xl md:text-[22px] leading-[1.8] text-white/60 font-serif max-w-2xl mx-auto">
            如果你在深圳的某个深夜，忽然想要触摸那些穿越了三个世纪的声音——
            琴鸣的门，始终为你敞开。
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-white/40">
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              深圳市福田区中心四路嘉里建设广场
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.5}>
          <Link
            to="/"
            className="inline-flex items-center gap-2 mt-12 text-sm text-white/50 hover:text-white transition-colors tracking-wide"
          >
            <ArrowLeft className="w-4 h-4" />
            返回工作室官网
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page Component                                                */
/* ------------------------------------------------------------------ */
export default function PhilosophyPage() {
  return (
    <div className="min-h-screen bg-white antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Noto+Serif+SC:wght@300;400;500;600;700&display=swap');
        .font-serif {
          font-family: 'Playfair Display', 'Noto Serif SC', 'Songti SC', 'SimSun', Georgia, serif;
        }
      `}</style>
      <Navigation />
      <HeroSection />
      <LeadSection />
      <ChapterOne />

      <ParallaxImageSection
        imageUrl="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1920&q=80"
        caption="深圳福田中心区夜景。在这座以效率为信仰的城市里，琴鸣工作室的灯光每晚亮到十点，为那些想要慢下来的人留着一扇门。"
      />

      <ChapterTwo />
      <ColorRevealSection />
      <ChapterThree />
      <TimelineSection />
      <EpilogueSection />
    </div>
  );
}
