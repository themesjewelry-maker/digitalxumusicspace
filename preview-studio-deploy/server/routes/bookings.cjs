const express = require("express");
const db = require("../db.cjs");
const router = express.Router();

// POST /api/bookings — 提交新预约
router.post("/", (req, res) => {
  const { name, phone, course, note } = req.body;

  if (!name || !phone || !course) {
    return res.status(400).json({ error: "姓名、电话和课程为必填项" });
  }

  try {
    const stmt = db.prepare(
      `INSERT INTO bookings (name, phone, course, note) VALUES (?, ?, ?, ?)`
    );
    const result = stmt.run(name, phone, course, note || "");
    res.status(201).json({
      id: result.lastInsertRowid,
      name,
      phone,
      course,
      note,
      status: "pending",
      created_at: new Date().toISOString(),
    });
  } catch (err) {
    console.error("[API] POST /api/bookings error:", err.message);
    res.status(500).json({ error: "数据库错误，请稍后重试" });
  }
});

// GET /api/bookings — 获取所有预约
router.get("/", (req, res) => {
  try {
    const stmt = db.prepare(
      `SELECT * FROM bookings ORDER BY created_at DESC`
    );
    const rows = stmt.all();
    res.json(rows);
  } catch (err) {
    console.error("[API] GET /api/bookings error:", err.message);
    res.status(500).json({ error: "查询失败" });
  }
});

// PATCH /api/bookings/:id — 更新状态
router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const allowed = ["pending", "contacted", "confirmed"];
  if (!allowed.includes(status)) {
    return res.status(400).json({ error: "无效的状态值" });
  }

  try {
    const stmt = db.prepare(
      `UPDATE bookings SET status = ? WHERE id = ?`
    );
    const result = stmt.run(status, id);
    if (result.changes === 0) {
      return res.status(404).json({ error: "记录不存在" });
    }
    res.json({ id: Number(id), status });
  } catch (err) {
    console.error("[API] PATCH /api/bookings/:id error:", err.message);
    res.status(500).json({ error: "更新失败" });
  }
});

module.exports = router;
