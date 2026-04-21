# 使用官方 Node.js 镜像
FROM node:20-alpine

# 设置工作目录
WORKDIR /app

# 安装构建工具（better-sqlite3 需要编译原生模块）
RUN apk add --no-cache python3 make g++

# 复制所有文件（先复制确保 postinstall / build 能访问源码）
COPY . .

# 安装依赖（含 devDependencies，因为 build 需要 vite/typescript）
# postinstall 会自动触发 npm run build 生成 dist/
RUN npm install

# 暴露端口
EXPOSE 3001

# 启动服务
CMD ["node", "server/index.cjs"]
