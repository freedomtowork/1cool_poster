# API代理服务器

这是一个简单的Express服务器，用于解决前端应用直接调用OpenRouter API时遇到的CORS问题。

## 安装

```bash
cd src/proxy
npm install
```

## 启动代理服务器

```bash
npm start
```

或者开发模式（自动重启）：

```bash
npm run dev
```

## 使用方法

代理服务器在本地运行时会监听3001端口，提供两个API端点：

1. `/api/generate` - 用于代理转发到OpenRouter API
2. `/api/silicon-generate` - 用于代理转发到硅基流动API

前端应用应该修改调用方式，通过这个代理服务器发送请求，而不是直接调用模型提供商的API。

## 部署

在生产环境中，应该将这个代理服务器部署到与前端应用相同的域名下，以避免CORS问题。可以使用以下选项之一：

1. 将代理服务器与前端应用部署在同一服务器上
2. 使用Netlify或Vercel的Serverless Functions
3. 部署到云服务提供商如AWS、GCP或Azure

## 注意事项

- 确保API密钥安全，不要将其暴露在客户端代码中
- 生产环境中应考虑添加速率限制和缓存机制
- 如果请求量增大，应考虑横向扩展服务 