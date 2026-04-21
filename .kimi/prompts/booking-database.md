# 预约试课系统 — Database + Backend 实现提示词

## 项目背景

本项目是「琴鸣声乐工作室」的官网，基于 **React 19 + TypeScript + Vite + Tailwind CSS** 构建，前端已有一个预约试听表单，但目前只有 UI 没有后端，数据无法持久化。

## 当前表单结构

表单位于 `src/pages/HomePage.tsx` 的 `BookingSection` 组件中（id="booking"），包含以下字段：

- **姓名** (name) — text input，必填
- **电话** (phone) — tel input，必填
- **感兴趣的课程** (course) — 四个选项按钮：「钢琴启蒙」「钢琴进阶」「声乐演唱」「艺考辅导」，可多选
- **备注** (note) — textarea，选填

当前表单使用 `onSubmit={(e) => e.preventDefault()}` 空拦截，没有任何提交逻辑。

## 任务目标

为预约试听表单实现完整的 **后端 API + 数据库 + 前端提交** 功能。

## 技术要求

### 1. 后端（Backend）

在现有 Vite React 项目根目录中新增一个 `server/` 目录，使用以下技术栈：

- **Node.js + Express** — REST API
- **SQLite3** — 轻量级数据库（零配置，单文件存储）
- **CORS** — 允许前端跨域调用

数据库表名：`bookings`

```sql
CREATE TABLE IF NOT EXISTS bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  course TEXT NOT NULL,
  note TEXT,
  status TEXT DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

API 端点：

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/bookings` | 提交新预约 |
| GET | `/api/bookings` | 获取所有预约列表（后台管理用） |
| PATCH | `/api/bookings/:id` | 更新预约状态（pending → contacted → confirmed） |

启动方式：`node server/index.js`

### 2. 前端修改

修改 `src/pages/HomePage.tsx` 的 `BookingSection` 组件：

- 使用 `useState` 管理表单状态（name, phone, course, note）
- 课程选择按钮需要改为真正的单选/多选逻辑（使用 active 状态高亮）
- 提交时使用 `fetch('/api/bookings', { method: 'POST' })` 发送 JSON
- 提交中显示 loading 状态，提交成功显示成功提示
- 提交失败显示错误提示
- 表单提交后清空表单

### 3. 后台管理页面

新建一个独立页面 `src/pages/AdminBookings.tsx`：

- 路由路径：`/admin/bookings`
- 访问时显示所有预约记录表格
- 表格列：姓名、电话、课程、备注、状态、提交时间
- 可点击按钮切换状态（pending → contacted → confirmed）
- 使用简单的 Basic Auth 保护（用户名 `admin`，密码 `qinming2024`）
- 样式保持与首页一致的 Apple 极简风格

### 4. 开发脚本

在 `package.json` 的 `scripts` 中添加：

```json
{
  "dev:server": "node server/index.js",
  "dev:full": "concurrently \"npm run dev\" \"npm run dev:server\""
}
```

### 5. 部署说明

生产环境部署时：
- 前端 `npm run build` 生成 `dist/` 目录
- 后端 Express 同时 serve `dist/` 静态文件和 API
- SQLite 数据库文件放在 `server/data/bookings.db`

## 代码规范

- 所有后端代码使用 CommonJS (`require`/`module.exports`)
- 前端 fetch 使用 async/await + try/catch
- 错误处理必须包含用户友好的中文提示
- 保持与现有项目一致的代码风格

## 文件清单（需要创建/修改）

```
server/
  index.js          # Express 入口
  db.js             # SQLite 连接与初始化
  routes/
    bookings.js     # 预约 API 路由
  data/
    .gitkeep        # 数据库目录占位

src/
  pages/
    HomePage.tsx    # 修改 BookingSection 表单提交逻辑
    AdminBookings.tsx  # 新建后台管理页面
  App.tsx           # 添加 /admin/bookings 路由

package.json        # 添加后端依赖和脚本
```

## 注意事项

1. 不要删除或修改现有页面的其他功能（Hero、课程、导师等区块保持原样）
2. 表单 UI 样式保持现有的 Apple 风格（圆角、灰色背景、大留白）
3. SQLite 数据库文件不需要提交到 git，请在 `.gitignore` 中添加 `server/data/*.db`
4. 如果 `concurrently` 未安装，请一并安装

---

## 启动验证步骤

1. 安装后端依赖：`npm install express sqlite3 cors concurrently`
2. 启动完整开发环境：`npm run dev:full`
3. 打开 `http://localhost:5173/` 填写表单并提交
4. 打开 `http://localhost:5173/admin/bookings` 查看记录
5. 确认数据库文件已生成：`server/data/bookings.db`
