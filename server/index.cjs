const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const { execSync } = require("child_process");
const bookingsRouter = require("./routes/bookings.cjs");

const app = express();
const PORT = process.env.PORT || 3001;

// 全局错误处理：未捕获的异常
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

// API 路由
app.use("/api/bookings", bookingsRouter);

// 健康检查端点（Zeabur 等平台常用）
app.get("/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// 查找 dist/ 目录的辅助函数
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

// 如果 dist/ 不存在，尝试自动构建（Git 部署时的保险措施）
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

// Serve 静态文件
if (distPath) {
  console.log("[OK] Serving static files from:", distPath);
  app.use(express.static(distPath));
  app.get("/{*splat}", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
} else {
  console.error("[ERROR] dist/ folder not found. Searched paths:");
  [
    path.join(__dirname, "../dist"),
    path.join(__dirname, "../../dist"),
    path.join(process.cwd(), "dist"),
  ].forEach((p) => console.error("  -", p));
  console.error("[ERROR] __dirname:", __dirname);
  console.error("[ERROR] cwd:", process.cwd());
  console.error("[ERROR] Please run 'npm run build' to generate dist/.");

  app.get("/", (req, res) => {
    res.status(503).send(`
      <h1>503 - Frontend Not Built</h1>
      <p>The server is running, but the frontend <code>dist/</code> folder was not found.</p>
      <p>Fix: Run <code>npm run build</code> to generate the <code>dist/</code> folder, then redeploy.</p>
    `);
  });
}

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`[OK] Server running on port ${PORT}`);
  console.log(`[OK] Health check: http://0.0.0.0:${PORT}/health`);
  console.log(`[OK] API: http://0.0.0.0:${PORT}/api/bookings`);
});

// 优雅关闭
process.on("SIGTERM", () => {
  console.log("[INFO] SIGTERM received, shutting down gracefully");
  server.close(() => {
    console.log("[INFO] Server closed");
    process.exit(0);
  });
});
