import React, { useState } from "react";

/* ================================================================
   中等水平 AI 生成的首页 —— 结构一致，有基础美化但模板化
   ================================================================ */

const theme = {
  primary: "#2563EB",
  primaryDark: "#1D4ED8",
  text: "#1F2937",
  textLight: "#6B7280",
  bg: "#FFFFFF",
  bgGray: "#F3F4F6",
  border: "#E5E7EB",
  radius: "8px",
  shadow: "0 4px 6px rgba(0,0,0,0.1)",
  maxWidth: "1100px",
};

export default function MidAIHomePage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    course: "",
    note: "",
  });
  const [msg, setMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.course) {
      setMsg("请填写完整信息");
      return;
    }
    setMsg("提交成功！我们将尽快与您联系。");
    setForm({ name: "", phone: "", course: "", note: "" });
  };

  const sectionStyle: React.CSSProperties = {
    padding: "60px 20px",
    maxWidth: theme.maxWidth,
    margin: "0 auto",
  };

  const headingStyle: React.CSSProperties = {
    fontSize: "32px",
    fontWeight: 700,
    color: theme.text,
    textAlign: "center",
    marginBottom: "12px",
  };

  const subHeadingStyle: React.CSSProperties = {
    fontSize: "18px",
    color: theme.textLight,
    textAlign: "center",
    marginBottom: "40px",
  };

  const cardStyle: React.CSSProperties = {
    background: theme.bg,
    borderRadius: theme.radius,
    boxShadow: theme.shadow,
    padding: "24px",
    textAlign: "center",
  };

  const btnStyle: React.CSSProperties = {
    display: "inline-block",
    background: theme.primary,
    color: "#fff",
    padding: "12px 32px",
    borderRadius: theme.radius,
    textDecoration: "none",
    fontWeight: 600,
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px",
    borderRadius: theme.radius,
    border: `1px solid ${theme.border}`,
    fontSize: "15px",
    marginBottom: "16px",
    boxSizing: "border-box",
  };

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", background: theme.bg, color: theme.text }}>
      {/* ---------- 导航 ---------- */}
      <nav
        style={{
          background: theme.bg,
          borderBottom: `1px solid ${theme.border}`,
          padding: "16px 20px",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div
          style={{
            maxWidth: theme.maxWidth,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "20px", fontWeight: 700, color: theme.primary }}>
            琴鸣声乐
          </span>
          <div style={{ display: "flex", gap: "24px" }}>
            {["首页", "课程", "导师", "预约"].map((item) => (
              <a
                key={item}
                href="#"
                style={{ color: theme.textLight, textDecoration: "none", fontSize: "15px" }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ---------- Hero ---------- */}
      <section
        style={{
          background: `linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)`,
          color: "#fff",
          padding: "100px 20px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: theme.maxWidth, margin: "0 auto" }}>
          <p
            style={{
              fontSize: "14px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              opacity: 0.8,
              marginBottom: "16px",
            }}
          >
            深圳 · 高端一对一音乐教育
          </p>
          <h1 style={{ fontSize: "52px", fontWeight: 800, margin: "0 0 12px" }}>
            琴鸣声乐工作室
          </h1>
          <p style={{ fontSize: "22px", opacity: 0.9, margin: "0 0 40px" }}>
            让每一次发声，都成为艺术
          </p>
          <a href="#booking" style={btnStyle}>
            预约试听
          </a>
          <a
            href="#philosophy"
            style={{
              display: "inline-block",
              marginLeft: "16px",
              color: "#fff",
              textDecoration: "underline",
              fontSize: "15px",
            }}
          >
            了解更多
          </a>
        </div>
      </section>

      {/* ---------- 理念 ---------- */}
      <section id="philosophy" style={{ background: theme.bgGray, borderBottom: `1px solid ${theme.border}` }}>
        <div style={sectionStyle}>
          <h2 style={headingStyle}>音乐不是技巧的堆砌，而是灵魂的对话</h2>
          <p style={subHeadingStyle}>
            在深圳这座快节奏的城市里，琴鸣坚持慢下来——用专业的态度，守护每一位学员对音乐最纯粹的热爱。
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "24px",
            }}
          >
            {[
              {
                title: "因材施教",
                desc: "每位学员都有独特的声线与指尖，我们拒绝流水线式教学，只为你的天赋定制成长路径。",
                color: "#DBEAFE",
              },
              {
                title: "专业深耕",
                desc: "导师均毕业于海内外顶尖音乐学府，平均教龄10年以上，深谙英皇考级与艺考体系。",
                color: "#D1FAE5",
              },
              {
                title: "一对一尊享",
                desc: "深圳少有的全一对一教学模式，每节课60-90分钟，确保老师100%的注意力在你身上。",
                color: "#FCE7F3",
              },
              {
                title: "舞台实践",
                desc: "定期举办学员音乐会与大师班，让练习不只是练习，而是通往舞台的每一步。",
                color: "#FEF3C7",
              },
            ].map((item) => (
              <div key={item.title} style={{ ...cardStyle, borderTop: `4px solid ${theme.primary}` }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    background: item.color,
                    margin: "0 auto 16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                  }}
                >
                  {item.title[0]}
                </div>
                <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "8px" }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: "14px", color: theme.textLight, lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- 钢琴课程 ---------- */}
      <section id="piano" style={{ borderBottom: `1px solid ${theme.border}` }}>
        <div style={sectionStyle}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "40px",
            }}
          >
            <div style={{ flex: "1 1 400px" }}>
              <span
                style={{
                  color: theme.primary,
                  fontWeight: 600,
                  fontSize: "14px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                钢琴课程
              </span>
              <h2 style={{ ...headingStyle, textAlign: "left", marginTop: "8px" }}>
                指尖下的诗与远方
              </h2>
              <p style={{ color: theme.textLight, lineHeight: 1.7, marginBottom: "24px" }}>
                从启蒙到演奏级，我们采用国际主流的英皇（ABRSM）与中央音乐学院考级体系，结合学员个性制定专属进阶路线。全工作室配备演奏级三角钢琴教学。
              </p>
              <ul style={{ padding: 0, listStyle: "none" }}>
                {[
                  "幼儿启蒙（4-6岁）：奥尔夫+铃木教学法，快乐入门",
                  "青少年进阶：系统化技巧训练+音乐表现力塑造",
                  "成人零基础：灵活排课，圆你一个钢琴梦",
                  "艺考与留学作品集辅导：历年名校录取率92%",
                  "英皇乐理与演奏考级：Level 1 - LRSM 全级别覆盖",
                ].map((f) => (
                  <li
                    key={f}
                    style={{
                      padding: "8px 0",
                      borderBottom: `1px solid ${theme.border}`,
                      fontSize: "15px",
                    }}
                  >
                    <span style={{ color: theme.primary, marginRight: "8px" }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ flex: "1 1 300px" }}>
              <img
                src="https://images.unsplash.com/photo-1552422535-c45813c61732?w=800&h=600&fit=crop&q=80"
                alt="钢琴"
                style={{
                  width: "100%",
                  borderRadius: theme.radius,
                  boxShadow: theme.shadow,
                  height: "300px",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- 声乐课程 ---------- */}
      <section id="vocal" style={{ background: theme.bgGray, borderBottom: `1px solid ${theme.border}` }}>
        <div style={sectionStyle}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "40px",
              flexDirection: "row-reverse",
            }}
          >
            <div style={{ flex: "1 1 400px" }}>
              <span
                style={{
                  color: theme.primary,
                  fontWeight: 600,
                  fontSize: "14px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                声乐课程
              </span>
              <h2 style={{ ...headingStyle, textAlign: "left", marginTop: "8px" }}>
                找到属于你的声音
              </h2>
              <p style={{ color: theme.textLight, lineHeight: 1.7, marginBottom: "24px" }}>
                无论美声、民族还是流行演唱，我们的声乐导师都具备扎实的学院派功底与丰富的舞台经验。一对一科学发声训练，让你的声音更有力量、更自由。
              </p>
              <ul style={{ padding: 0, listStyle: "none" }}>
                {[
                  "科学发声体系：呼吸支撑、共鸣位置、声带闭合专项训练",
                  "流行演唱：R&B、爵士、民谣等风格化演唱技巧",
                  "古典声乐：意大利美声体系，歌剧咏叹调作品指导",
                  "艺考声乐：选曲策略+舞台表现+应试心理全方位辅导",
                  "嗓音康复：针对声带小结、疲劳用嗓的专业恢复训练",
                ].map((f) => (
                  <li
                    key={f}
                    style={{
                      padding: "8px 0",
                      borderBottom: `1px solid ${theme.border}`,
                      fontSize: "15px",
                    }}
                  >
                    <span style={{ color: theme.primary, marginRight: "8px" }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ flex: "1 1 300px" }}>
              <img
                src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop&q=80"
                alt="声乐"
                style={{
                  width: "100%",
                  borderRadius: theme.radius,
                  boxShadow: theme.shadow,
                  height: "300px",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- 导师阵容 ---------- */}
      <section id="mentors" style={{ borderBottom: `1px solid ${theme.border}` }}>
        <div style={sectionStyle}>
          <h2 style={headingStyle}>遇见你的引路人</h2>
          <p style={subHeadingStyle}>
            每一位导师，都是曾在舞台中央发光的音乐家。如今，他们把光芒化作烛火，照亮你的音乐之路。
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "24px",
            }}
          >
            {[
              {
                name: "数码旭",
                role: "创始人 / 声乐教学总监",
                bio: "毕业于华南师范大学音乐学专业声乐教育方向，师从日本留学的罗晓梅教授学习声乐两年，师从美国留学的王朝霞教授学习音乐教育两年。曾跟随名师学习古筝、钢琴、舞蹈，毕业后从事声乐教育工作至今十余年。",
                img: "/teacher-avatar.png",
              },
              {
                name: "林韵然",
                role: "声乐教学总监",
                bio: "上海音乐学院声乐表演硕士，曾获意大利贝里尼国际声乐比赛银奖，深耕美声与流行跨界教学，擅长挖掘学员独特音色。",
                img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&q=80",
              },
              {
                name: "张牧之",
                role: "钢琴 / 乐理导师",
                bio: "英国皇家音乐学院（RCM）钢琴演奏学士，ABRSM官方认证教师，精通英皇考级体系，课堂严谨而不失幽默，深受学员喜爱。",
                img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80",
              },
              {
                name: "王若溪",
                role: "声乐 / 音乐剧导师",
                bio: "中央音乐学院声乐歌剧系本科，后赴纽约进修音乐剧表演，擅长流行演唱与音乐剧选段指导，让学员在表演中释放声音魅力。",
                img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&q=80",
              },
            ].map((m) => (
              <div key={m.name} style={cardStyle}>
                <img
                  src={m.img}
                  alt={m.name}
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginBottom: "16px",
                    border: `3px solid ${theme.primary}`,
                  }}
                />
                <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "4px" }}>
                  {m.name}
                </h3>
                <p style={{ fontSize: "13px", color: theme.primary, fontWeight: 600, marginBottom: "12px" }}>
                  {m.role}
                </p>
                <p style={{ fontSize: "14px", color: theme.textLight, lineHeight: 1.6 }}>
                  {m.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- 预约试听 ---------- */}
      <section id="booking" style={{ background: theme.bgGray, borderBottom: `1px solid ${theme.border}` }}>
        <div style={sectionStyle}>
          <h2 style={headingStyle}>开启你的第一节课</h2>
          <p style={subHeadingStyle}>
            我们提供免费一对一试听课（30分钟）。让导师了解你的基础与目标，也让你感受琴鸣的教学氛围。
          </p>
          <div
            style={{
              maxWidth: "560px",
              margin: "0 auto",
              background: theme.bg,
              borderRadius: theme.radius,
              boxShadow: theme.shadow,
              padding: "40px",
            }}
          >
            {msg && (
              <div
                style={{
                  background: msg.includes("成功") ? "#D1FAE5" : "#FEE2E2",
                  color: msg.includes("成功") ? "#065F46" : "#991B1B",
                  padding: "12px",
                  borderRadius: theme.radius,
                  marginBottom: "20px",
                  textAlign: "center",
                  fontSize: "14px",
                }}
              >
                {msg}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <label style={{ display: "block", fontSize: "14px", fontWeight: 600, marginBottom: "6px" }}>
                姓名
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="您的称呼"
                style={inputStyle}
              />

              <label style={{ display: "block", fontSize: "14px", fontWeight: 600, marginBottom: "6px" }}>
                电话
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="联系电话"
                style={inputStyle}
              />

              <label style={{ display: "block", fontSize: "14px", fontWeight: 600, marginBottom: "6px" }}>
                感兴趣的课程
              </label>
              <select
                value={form.course}
                onChange={(e) => setForm({ ...form, course: e.target.value })}
                style={inputStyle}
              >
                <option value="">请选择课程</option>
                <option>钢琴启蒙</option>
                <option>钢琴进阶</option>
                <option>声乐演唱</option>
                <option>艺考辅导</option>
              </select>

              <label style={{ display: "block", fontSize: "14px", fontWeight: 600, marginBottom: "6px" }}>
                备注
              </label>
              <textarea
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                placeholder="请简述您的音乐基础、学习目标或希望预约的时间..."
                rows={4}
                style={{ ...inputStyle, resize: "vertical" }}
              />

              <button type="submit" style={{ ...btnStyle, width: "100%", marginTop: "8px" }}>
                提交预约申请
              </button>
              <p style={{ textAlign: "center", fontSize: "13px", color: theme.textLight, marginTop: "12px" }}>
                提交后我们将在24小时内与您联系确认试听时间
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* ---------- 联系方式 ---------- */}
      <section style={{ background: "#1F2937", color: "#fff", padding: "60px 20px" }}>
        <div
          style={{
            maxWidth: theme.maxWidth,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "32px",
            textAlign: "center",
          }}
        >
          {[
            { label: "studio地址", value: "深圳市福田区中心四路嘉里建设广场3座" },
            { label: "预约热线", value: "0755-8888-9999" },
            { label: "电子邮箱", value: "hello@qinming.studio" },
          ].map((item) => (
            <div key={item.label}>
              <p style={{ fontSize: "14px", fontWeight: 600, color: "#9CA3AF", marginBottom: "8px" }}>
                {item.label}
              </p>
              <p style={{ fontSize: "16px" }}>{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- 页脚 ---------- */}
      <footer style={{ background: "#111827", color: "#9CA3AF", padding: "24px 20px", textAlign: "center", fontSize: "14px" }}>
        <p>© 2024 琴鸣声乐工作室 Qinming Studio. All rights reserved.</p>
        <div style={{ marginTop: "8px" }}>
          <a href="#" style={{ color: "#9CA3AF", textDecoration: "none", marginRight: "16px" }}>
            隐私政策
          </a>
          <a href="#" style={{ color: "#9CA3AF", textDecoration: "none" }}>
            服务条款
          </a>
        </div>
      </footer>
    </div>
  );
}
