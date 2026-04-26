# 琴鸣声乐 - 部署说明

## 快速开始

```bash
# 1. 安装依赖
npm install

# 2. 启动服务
npm start
```

服务默认运行在 `http://0.0.0.0:3001`

## 环境变量

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `PORT` | 服务端口 | `3001` |
| `ADMIN_USER` | 管理员用户名 | `admin` |
| `ADMIN_PASS` | 管理员密码 | `admin123` |

## 目录结构

- `dist/` - 前端构建产物（静态文件）
- `server/` - Express 后端服务
  - `data/bookings.db` - SQLite 数据库（首次启动自动创建）

## 健康检查

```bash
curl http://localhost:3001/health
```
