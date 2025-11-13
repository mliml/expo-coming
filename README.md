# Expo Coming Soon 页面

一个精美的 Coming Soon 单页网站，带有功能投票系统。

## 功能特点

- 精美的渐变背景和动画效果
- 响应式设计，支持移动端和桌面端
- 邮箱订阅表单
- 功能投票系统
  - 用户无需登录即可投票
  - 实时更新投票结果
  - 显示投票百分比和进度条
  - 投票数据持久化存储

## 技术栈

- **Next.js 15** - React 框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **Prisma** - ORM 数据库工具
- **SQLite** - 数据库

## 安装和运行

### 1. 安装依赖

\`\`\`bash
npm install
\`\`\`

### 2. 初始化数据库

\`\`\`bash
# 生成 Prisma 客户端
npx prisma generate

# 创建数据库表
npx prisma db push

# 添加种子数据（初始功能选项）
npm run db:seed
\`\`\`

### 3. 启动开发服务器

\`\`\`bash
npm run dev
\`\`\`

访问 http://localhost:6001 查看网站

## 可用命令

- `npm run dev` - 启动开发服务器（端口 6001）
- `npm run build` - 构建生产版本
- `npm start` - 启动生产服务器
- `npm run lint` - 运行代码检查
- `npm run db:push` - 同步数据库架构
- `npm run db:seed` - 添加种子数据
- `npm run db:studio` - 打开 Prisma Studio 管理数据库

## 项目结构

\`\`\`
expo-coming/
├── app/
│   ├── api/
│   │   ├── features/    # 功能列表 API
│   │   └── vote/        # 投票 API
│   ├── globals.css      # 全局样式
│   ├── layout.tsx       # 根布局
│   └── page.tsx         # 主页面
├── components/
│   └── FeatureVoting.tsx  # 投票组件
├── lib/
│   └── prisma.ts        # Prisma 客户端
├── prisma/
│   ├── schema.prisma    # 数据库架构
│   ├── seed.ts          # 种子数据
│   └── dev.db           # SQLite 数据库
└── package.json
\`\`\`

## 数据库架构

### Feature（功能）
- `id` - 唯一标识符
- `name` - 功能名称
- `description` - 功能描述
- `votes` - 投票数
- `createdAt` - 创建时间
- `updatedAt` - 更新时间

### Vote（投票记录）
- `id` - 唯一标识符
- `featureId` - 功能 ID
- `ipAddress` - 投票者 IP 地址
- `userAgent` - 浏览器信息
- `createdAt` - 投票时间

## 自定义

### 修改功能选项

编辑 `prisma/seed.ts` 文件，修改初始功能列表，然后运行：

\`\`\`bash
npm run db:seed
\`\`\`

### 修改样式

- 主页面样式：编辑 `app/page.tsx`
- 投票组件样式：编辑 `components/FeatureVoting.tsx`
- 全局样式：编辑 `app/globals.css`
- Tailwind 配置：编辑 `tailwind.config.ts`

### 防止重复投票

在 `app/api/vote/route.ts` 中，取消注释以下代码来启用防止重复投票功能：

\`\`\`typescript
const existingVote = await prisma.vote.findFirst({
  where: {
    featureId,
    ipAddress,
  },
});

if (existingVote) {
  return NextResponse.json(
    { error: 'You have already voted for this feature' },
    { status: 400 }
  );
}
\`\`\`

## 部署

### Vercel 部署

1. 将代码推送到 GitHub
2. 在 Vercel 导入项目
3. Vercel 会自动检测 Next.js 项目并配置
4. 注意：SQLite 不适合生产环境，建议使用 PostgreSQL 或 MySQL

### 使用 PostgreSQL

1. 修改 `prisma/schema.prisma`：

\`\`\`prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
\`\`\`

2. 在 `.env` 文件中设置数据库 URL：

\`\`\`
DATABASE_URL="postgresql://user:password@host:5432/database"
\`\`\`

3. 重新运行数据库命令：

\`\`\`bash
npx prisma generate
npx prisma db push
npm run db:seed
\`\`\`

## 许可

MIT
