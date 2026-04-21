const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const { execSync } = require("child_process");
const { signToken } = require("./auth.cjs");
const bookingsRouter = require("./routes/bookings.cjs");

const app = express();
const PORT = process.env.PORT || 3001;

// 管理员账号（生产环境请通过环境变量设置）
const ADMIN_USER = process.env.ADMIN_USER || "admin";
const ADMIN_PASS = process.env.ADMIN_PASS || "admin123";

// 全局错误处理
process.on("uncaughtException", (err) => {
  console.error("[FATAL] Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("[FATAL] Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

app.use(cors());
app.use(express.json());

// === API 路由 ===

// 预约相关（ bookings.cjs 内部已区分公开/需认证 ）
app.use("/api/bookings", bookingsRouter);

// 管理员登录
app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;
  if (username !== ADMIN_USER || password !== ADMIN_PASS) {
    return res.status(401).json({ error: "用户名或密码错误" });
  }
  const token = signToken({ username, role: "admin" });
  res.json({ token, username });
});

// 健康检查
app.get("/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// === 静态文件 ===
function findDistPath() {
  const candidates = [
    path.join(__dirname, "../dist"),
    path.join(__dirname, "../../dist"),
    path.join(process.cwd(), "dist"),
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

let distPath = findDistPath();

if (!distPath) {
  console.warn("[WARN] dist/ not found. Attempting auto-build...");
  try {
    execSync("npm run build", {
      cwd: process.cwd(),
      stdio: "inherit",
      timeout: 120000,
    });
    distPath = findDistPath();
    if (distPath) {
      console.log("[OK] Auto-build succeeded. dist/ at:", distPath);
    }
  } catch (err) {
    console.error("[ERROR] Auto-build failed:", err.message);
  }
}

if (distPath) {
  console.log("[OK] Serving static files from:", distPath);
  app.use(express.static(distPath));
  app.get("/{*splat}", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
} else {
  console.error("[ERROR] dist/ folder not found.");
  app.get("/", (req, res) => {
    res.status(503).send(`<h1>503 - Frontend Not Built</h1><p>Run npm run build to generate dist/.</p>`);
  });
}

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`[OK] Server running on port ${PORT}`);
  console.log(`[OK] Health check: http://0.0.0.0:${PORT}/health`);
  console.log(`[OK] API: http://0.0.0.0:${PORT}/api/bookings`);
});

process.on("SIGTERM", () => {
  console.log("[INFO] SIGTERM received, shutting down gracefully");
  server.close(() => {
    console.log("[INFO] Server closed");
    process.exit(0);
  });
});
