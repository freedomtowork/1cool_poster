[![English Documentation](https://img.shields.io/badge/Documentation-English-blue.svg)](README_en.md)

一个强大的基于AI的海报生成工具，可以为不同平台创建精美的海报和封面图像。


## 项目特点

- 🌐 **多平台支持**：为小红书、微信公众号、B站等平台生成优化的封面
- 🎨 **多种设计风格**：提供多种精美的设计风格选择
- 📤 **一键导出**：轻松导出为PNG格式
- 🔧 **部署配置**：支持通过环境变量设置默认API配置

## 开始使用

1. 克隆仓库
   ```bash
   git clone https://github.com/ivesyi/1cool.git
   cd 1cool
   ```

2. 安装依赖
   ```bash
   npm install
   # 或使用yarn
   yarn install
   ```

3. 配置API（可选）
   ```bash
   # 复制配置模板
   cp .env.example .env
   # 编辑.env文件，填入您的API密钥
   ```

4. 启动开发服务器
   ```bash
   npm run dev
   # 或使用yarn
   yarn dev
   ```

5. 在浏览器中访问 `http://localhost:8080`

## 使用指南

1. **输入文本内容**：在左侧文本框中输入您的海报文字内容
2. **选择平台**：选择目标平台（小红书、微信、B站）
3. **选择风格**：从多种设计风格中选择一种
4. **配置模型**：点击"配置模型"按钮设置您的AI模型API密钥
5. **生成海报**：点击"生成封面"按钮
6. **导出**：生成完成后，点击"导出"按钮下载海报

## 模型配置

首次使用时，您需要设置AI模型的配置信息：

1. 点击"配置模型"按钮
2. 输入您的API密钥和相关设置
3. 选择需要使用的模型
4. 点击保存

支持的API提供商：
- 硅肌流动
- OpenRouter
- Anthropic（未测试，请自行测试）
- Google Gemini
- 自定义

推荐使用模型
- Claude-3.7-sonnet-thinking（效果最好，推荐）
- Gemini 2.5 Pro Experimental 03-25（效果良好）
- DeepSeek-V3（性价比最高，效果一般）


# 部署配置说明

本项目支持通过环境变量配置默认的API设置，使用户在首次使用时即可拥有可用的配置。

## 配置方法

### 方法一：使用.env文件（开发环境）

1. 在项目根目录复制`.env.example`文件并重命名为`.env`
2. 编辑`.env`文件，填入你的API密钥和其他配置

```
# API配置
VITE_DEFAULT_API_KEY=你的API密钥
VITE_DEFAULT_API_URL=https://api.silicon.run
VITE_DEFAULT_MODEL=Pro/deepseek-ai/DeepSeek-V3
VITE_DEFAULT_PROVIDER=silicon
```

### 方法二：通过部署平台设置环境变量

如果您在Vercel、Netlify等平台部署，可以在平台的环境变量设置中添加以下变量：

- `VITE_DEFAULT_API_KEY`: 您的API密钥
- `VITE_DEFAULT_API_URL`: API服务地址
- `VITE_DEFAULT_MODEL`: 默认使用的模型ID
- `VITE_DEFAULT_PROVIDER`: 默认提供商

#### 一键部署

您可以使用以下按钮一键部署到Vercel或Netlify:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fivesyi%2F1cool)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/ivesyi/1cool)

> 注意：部署后，请务必在平台的环境变量设置中配置必要的API密钥和其他配置项。

## 支持的提供商

当前支持的提供商有：

1. `silicon` - 硅肌流动（默认）
2. `openrouter` - OpenRouter
3. `anthropic` - Anthropic
4. `google` - Google (Gemini)
5. `custom` - 自定义


## 注意事项

1. 环境变量中的配置会被用户在界面中保存的配置覆盖
2. 如果用户清除浏览器缓存，系统会再次使用环境变量中的默认配置
3. API密钥将被加密存储在用户本地，不会被发送到除了指定API服务以外的任何地方

## 安全提示

- 不要在公共代码仓库中包含您的API密钥
- 对于生产环境，始终使用环境变量或安全的密钥管理系统
- 考虑为不同的部署环境使用不同的API密钥 

## 问题排查

如果您在使用过程中遇到问题：

1. 确保已正确配置API密钥
2. 检查网络连接状态
3. 尝试使用其他模型或提供商
4. 如果问题持续存在，请提交Issue

---
本项目源自有一天在推上看到 @歸藏 大佬提供的提示词，在此表示感谢！！！

希望这个工具能帮助到你！如果有任何建议或改进，欢迎提交PR或在Issues中讨论。让我们一起让这个工具能有更广阔的应用空间！
