# Preview Studio 部署说明

## 项目结构

```
├── dist/              # 前端构建产物（React SPA）
├── server/            # Express 后端 + SQLite
│   ├── index.cjs      # 主入口
│   ├── db.cjs         # SQLite 初始化（better-sqlite3）
│   ├── routes/
│   │   └── bookings.cjs   # 预约 API 路由
│   └── data/
│       └── bookings.db    # SQLite 数据库文件
├── package.json
└── README.md
```

## 本地启动

```bash
npm install
npm start
```

服务运行在 `0.0.0.0:3001`（或 `PORT` 环境变量）。

- 首页：`http://localhost:3001/`
- 管理后台：`http://localhost:3001/admin/bookings`
- API：`http://localhost:3001/api/bookings`
- 健康检查：`http://localhost:3001/health`

## Zeabur 部署（Git 方式）

1. 将整个项目 push 到 GitHub 仓库
2. 在 Zeabur 关联该仓库
3. Zeabur 自动执行：
   - `npm install` → 触发 `postinstall` → 自动运行 `npm run build` 生成 `dist/`
   - `npm start` → 启动 Express 服务
4. 在 Zeabur 控制台将 `server/data` 挂载为 **Volume**（防止重启丢失数据库）

### 如果仍提示 "Frontend Not Built"

说明 `npm run build` 在 Zeabur 构建阶段失败了。请检查 Zeabur **Build Logs**，常见原因：
- TypeScript 编译错误 → 修复代码中的类型错误
- 内存不足（OOM）→ 升级 Zeabur 配置或删除 `public/` 中的大文件（如 `lifewall-2.jpg` 15MB）

## 数据库持久化

SQLite 文件位于 `server/data/bookings.db`。请在 Zeabur 中将 `server/data` 挂载为 Volume。
