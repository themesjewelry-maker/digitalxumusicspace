import React, { useState } from "react";

/* ================================================================
   过往 AI 生成的首页 —— 结构一致，但毫无审美
   ================================================================ */

export default function OldAIHomePage() {
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
    setMsg("提交成功！");
    setForm({ name: "", phone: "", course: "", note: "" });
  };

  return (
    <div style={{ fontFamily: "serif", background: "#f0f0f0" }}>
      {/* ---------- 导航 ---------- */}
      <div
        style={{
          background: "#3333ff",
          color: "yellow",
          padding: "10px",
          textAlign: "center",
          fontSize: "18px",
          fontWeight: "bold",
          borderBottom: "5px solid red",
        }}
      >
        琴鸣声乐工作室
      </div>

      {/* ---------- Hero ---------- */}
      <div
        style={{
          background: "#000080",
          color: "white",
          padding: "60px 20px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "48px", margin: "0 0 20px 0" }}>琴鸣声乐</h1>
        <h2 style={{ fontSize: "24px", margin: "0 0 30px 0", color: "#ccc" }}>
          工作室
        </h2>
        <p style={{ fontSize: "20px", margin: "0 0 10px 0" }}>
          让每一次发声，都成为艺术
        </p>
        <p style={{ fontSize: "14px", color: "#aaa" }}>
          专注钢琴与声乐一对一私教 · 深圳福田中心区
        </p>
        <br />
        <a
          href="#booking"
          style={{
            background: "red",
            color: "white",
            padding: "10px 30px",
            textDecoration: "none",
            fontSize: "16px",
            border: "3px solid yellow",
          }}
        >
          预约试听
        </a>
        <br />
        <br />
        <a href="#philosophy" style={{ color: "#0f0", fontSize: "14px" }}>
          了解更多
        </a>
      </div>

      {/* ---------- 理念 ---------- */}
      <div
        id="philosophy"
        style={{
          background: "white",
          padding: "40px 20px",
          textAlign: "center",
          borderTop: "4px dashed gray",
        }}
      >
        <h2 style={{ fontSize: "32px", color: "red", marginBottom: "10px" }}>
          音乐不是技巧的堆砌，而是灵魂的对话
        </h2>
        <p style={{ fontSize: "16px", color: "#666" }}>
          在深圳这座快节奏的城市里，琴鸣坚持慢下来——
          <br />
          用专业的态度，守护每一位学员对音乐最纯粹的热爱。
        </p>
        <br />
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <tbody>
            <tr>
              <td
                style={{
                  border: "2px solid black",
                  padding: "20px",
                  background: "#ffffcc",
                }}
              >
                <b style={{ color: "blue" }}>因材施教</b>
                <br />
                <span style={{ fontSize: "14px" }}>
                  每位学员都有独特的声线与指尖，我们拒绝流水线式教学，只为你的天赋定制成长路径。
                </span>
              </td>
              <td
                style={{
                  border: "2px solid black",
                  padding: "20px",
                  background: "#ccffcc",
                }}
              >
                <b style={{ color: "green" }}>专业深耕</b>
                <br />
                <span style={{ fontSize: "14px" }}>
                  导师均毕业于海内外顶尖音乐学府，平均教龄10年以上，深谙英皇考级与艺考体系。
                </span>
              </td>
            </tr>
            <tr>
              <td
                style={{
                  border: "2px solid black",
                  padding: "20px",
                  background: "#ffcccc",
                }}
              >
                <b style={{ color: "red" }}>一对一尊享</b>
                <br />
                <span style={{ fontSize: "14px" }}>
                  深圳少有的全一对一教学模式，每节课60-90分钟，确保老师100%的注意力在你身上。
                </span>
              </td>
              <td
                style={{
                  border: "2px solid black",
                  padding: "20px",
                  background: "#ccccff",
                }}
              >
                <b style={{ color: "purple" }}>舞台实践</b>
                <br />
                <span style={{ fontSize: "14px" }}>
                  定期举办学员音乐会与大师班，让练习不只是练习，而是通往舞台的每一步。
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ---------- 钢琴课程 ---------- */}
      <div
        style={{
          background: "#e0e0e0",
          padding: "40px 20px",
          borderTop: "4px dashed gray",
        }}
      >
        <h2
          style={{
            fontSize: "28px",
            color: "darkgreen",
            textAlign: "center",
          }}
        >
          钢琴课程
        </h2>
        <h3
          style={{
            fontSize: "22px",
            color: "#333",
            textAlign: "center",
          }}
        >
          指尖下的诗与远方
        </h3>
        <br />
        <div style={{ textAlign: "center" }}>
          <img
            src="https://images.unsplash.com/photo-1552422535-c45813c61732?w=800&h=600&fit=crop&q=80"
            alt="钢琴"
            style={{
              width: "300px",
              height: "200px",
              border: "3px solid black",
            }}
          />
        </div>
        <br />
        <p style={{ fontSize: "16px", textAlign: "center" }}>
          从启蒙到演奏级，我们采用国际主流的英皇（ABRSM）与中央音乐学院考级体系，结合学员个性制定专属进阶路线。全工作室配备演奏级三角钢琴教学。
        </p>
        <ul
          style={{
            listStyleType: "square",
            fontSize: "15px",
            marginTop: "20px",
            lineHeight: "2",
            color: "#444",
          }}
        >
          <li>幼儿启蒙（4-6岁）：奥尔夫+铃木教学法，快乐入门</li>
          <li>青少年进阶：系统化技巧训练+音乐表现力塑造</li>
          <li>成人零基础：灵活排课，圆你一个钢琴梦</li>
          <li>艺考与留学作品集辅导：历年名校录取率92%</li>
          <li>英皇乐理与演奏考级：Level 1 - LRSM 全级别覆盖</li>
        </ul>
      </div>

      {/* ---------- 声乐课程 ---------- */}
      <div
        style={{
          background: "white",
          padding: "40px 20px",
          borderTop: "4px dashed gray",
        }}
      >
        <h2
          style={{
            fontSize: "28px",
            color: "darkorange",
            textAlign: "center",
          }}
        >
          声乐课程
        </h2>
        <h3
          style={{
            fontSize: "22px",
            color: "#333",
            textAlign: "center",
          }}
        >
          找到属于你的声音
        </h3>
        <br />
        <div style={{ textAlign: "center" }}>
          <img
            src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop&q=80"
            alt="声乐"
            style={{
              width: "300px",
              height: "200px",
              border: "3px solid red",
            }}
          />
        </div>
        <br />
        <p style={{ fontSize: "16px", textAlign: "center" }}>
          无论美声、民族还是流行演唱，我们的声乐导师都具备扎实的学院派功底与丰富的舞台经验。一对一科学发声训练，让你的声音更有力量、更自由。
        </p>
        <ul
          style={{
            listStyleType: "circle",
            fontSize: "15px",
            marginTop: "20px",
            lineHeight: "2",
            color: "#444",
          }}
        >
          <li>科学发声体系：呼吸支撑、共鸣位置、声带闭合专项训练</li>
          <li>流行演唱：R&B、爵士、民谣等风格化演唱技巧</li>
          <li>古典声乐：意大利美声体系，歌剧咏叹调作品指导</li>
          <li>艺考声乐：选曲策略+舞台表现+应试心理全方位辅导</li>
          <li>嗓音康复：针对声带小结、疲劳用嗓的专业恢复训练</li>
        </ul>
      </div>

      {/* ---------- 导师阵容 ---------- */}
      <div
        style={{
          background: "#e0e0e0",
          padding: "40px 20px",
          borderTop: "4px dashed gray",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "28px", color: "darkblue" }}>遇见你的引路人</h2>
        <p style={{ fontSize: "16px", color: "#666" }}>
          每一位导师，都是曾在舞台中央发光的音乐家。
          <br />
          如今，他们把光芒化作烛火，照亮你的音乐之路。
        </p>
        <br />
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
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
            <div
              key={m.name}
              style={{
                width: "220px",
                border: "2px solid #333",
                background: "white",
                padding: "15px",
              }}
            >
              <img
                src={m.img}
                alt={m.name}
                style={{ width: "100px", height: "100px", borderRadius: "50%", border: "2px solid black" }}
              />
              <h4 style={{ margin: "10px 0 5px", color: "blue" }}>{m.name}</h4>
              <p style={{ fontSize: "13px", color: "green", margin: "0 0 10px" }}>
                {m.role}
              </p>
              <p style={{ fontSize: "12px", color: "#555" }}>{m.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- 预约试听 ---------- */}
      <div
        id="booking"
        style={{
          background: "white",
          padding: "40px 20px",
          borderTop: "4px dashed gray",
        }}
      >
        <h2
          style={{
            fontSize: "28px",
            color: "purple",
            textAlign: "center",
          }}
        >
          开启你的第一节课
        </h2>
        <p style={{ fontSize: "16px", textAlign: "center", color: "#666" }}>
          我们提供免费一对一试听课（30分钟）。
          <br />
          让导师了解你的基础与目标，也让你感受琴鸣的教学氛围。
        </p>
        <br />
        <form
          onSubmit={handleSubmit}
          style={{
            maxWidth: "500px",
            margin: "0 auto",
            border: "2px solid black",
            padding: "20px",
            background: "#fafafa",
          }}
        >
          {msg && (
            <p
              style={{
                textAlign: "center",
                color: msg.includes("成功") ? "green" : "red",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              {msg}
            </p>
          )}
          <label style={{ fontSize: "14px", fontWeight: "bold" }}>
            姓名:
          </label>
          <br />
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={{
              width: "100%",
              padding: "5px",
              marginBottom: "10px",
              border: "1px solid #999",
            }}
          />
          <br />
          <label style={{ fontSize: "14px", fontWeight: "bold" }}>
            电话:
          </label>
          <br />
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            style={{
              width: "100%",
              padding: "5px",
              marginBottom: "10px",
              border: "1px solid #999",
            }}
          />
          <br />
          <label style={{ fontSize: "14px", fontWeight: "bold" }}>
            感兴趣的课程:
          </label>
          <br />
          <select
            value={form.course}
            onChange={(e) => setForm({ ...form, course: e.target.value })}
            style={{
              width: "100%",
              padding: "5px",
              marginBottom: "10px",
              border: "1px solid #999",
            }}
          >
            <option value="">请选择</option>
            <option>钢琴启蒙</option>
            <option>钢琴进阶</option>
            <option>声乐演唱</option>
            <option>艺考辅导</option>
          </select>
          <br />
          <label style={{ fontSize: "14px", fontWeight: "bold" }}>
            备注:
          </label>
          <br />
          <textarea
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
            rows={4}
            style={{
              width: "100%",
              padding: "5px",
              marginBottom: "10px",
              border: "1px solid #999",
            }}
          />
          <br />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              background: "#3333ff",
              color: "yellow",
              fontSize: "16px",
              fontWeight: "bold",
              border: "2px solid red",
              cursor: "pointer",
            }}
          >
            提交预约申请
          </button>
          <p
            style={{
              fontSize: "12px",
              color: "#999",
              textAlign: "center",
              marginTop: "10px",
            }}
          >
            提交后我们将在24小时内与您联系确认试听时间
          </p>
        </form>
      </div>

      {/* ---------- 联系方式 ---------- */}
      <div
        style={{
          background: "#333",
          color: "white",
          padding: "30px 20px",
          textAlign: "center",
          borderTop: "4px dashed gray",
        }}
      >
        <table style={{ width: "100%", color: "white" }}>
          <tbody>
            <tr>
              <td style={{ padding: "10px" }}>
                <b style={{ color: "yellow" }}>studio地址</b>
                <br />
                <span style={{ fontSize: "14px" }}>
                  深圳市福田区中心四路嘉里建设广场3座
                </span>
              </td>
              <td style={{ padding: "10px" }}>
                <b style={{ color: "yellow" }}>预约热线</b>
                <br />
                <span style={{ fontSize: "14px" }}>0755-8888-9999</span>
              </td>
              <td style={{ padding: "10px" }}>
                <b style={{ color: "yellow" }}>电子邮箱</b>
                <br />
                <span style={{ fontSize: "14px" }}>hello@qinming.studio</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ---------- 页脚 ---------- */}
      <div
        style={{
          background: "#222",
          color: "#aaa",
          padding: "15px",
          textAlign: "center",
          fontSize: "12px",
          borderTop: "2px solid #555",
        }}
      >
        © 2024 琴鸣声乐工作室 Qinming Studio. All rights reserved.
        <br />
        <a href="#" style={{ color: "#aaa", marginRight: "10px" }}>
          隐私政策
        </a>
        <a href="#" style={{ color: "#aaa" }}>
          服务条款
        </a>
      </div>
    </div>
  );
}
