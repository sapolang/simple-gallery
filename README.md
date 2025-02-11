## 介绍
这是一个简单的相册，图片是从picsum上来，部署在vercel上。
一个列表显示图片，瀑布流式往下拉自动加载。 如果想用自己的图片数据可以修改api/images/route.ts

## 快速开始

第一步, 运行开发服务:

```bash
npm install

npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
## 部署
```bash
# 安装vercel命令行
npm install -g vercel
# 查看vercel 命令帮助
vercel -h 
# 部署
vercel --prod
```

Open [demo](https://simple-gallery-lbu3ksqbo-1129103472s-projects.vercel.app/gallery) with your browser to see the result.
