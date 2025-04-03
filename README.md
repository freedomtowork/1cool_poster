# 多语言海报生成器 (Multilingual Poster Generator)

[![English Documentation](https://img.shields.io/badge/Documentation-English-blue.svg)](README_en.md)

一个强大的基于AI的海报生成工具，可以为不同平台创建精美的海报和封面图像。

## 项目特点

- 🌐 **多平台支持**：为小红书、微信公众号、B站等平台生成优化的封面
- 🎨 **多种设计风格**：提供多种精美的设计风格选择
- 🤖 **AI驱动**：使用先进的大语言模型生成创意海报
- 💻 **响应式界面**：在桌面和移动设备上都能完美运行
- 🔄 **实时预览**：在生成前查看海报预览
- 📤 **一键导出**：轻松导出为PNG或HTML格式

## 开始使用

1. 克隆仓库
   ```bash
   git clone https://github.com/yourusername/multilingual-poster-gen.git
   cd multilingual-poster-gen
   ```

2. 安装依赖
   ```bash
   npm install
   # 或使用yarn
   yarn install
   ```

3. 启动开发服务器
   ```bash
   npm run dev
   # 或使用yarn
   yarn dev
   ```

4. 在浏览器中访问 `http://localhost:8080`

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
- OpenAI
- Anthropic
- Silicon.Run
- OpenRouter等

## 技术栈

- React
- TypeScript
- Tailwind CSS
- Shadcn UI
- Axios
- html2canvas (用于导出)

## 贡献指南

欢迎提交Pull Request或Issue来帮助改进这个项目。

## 许可证

本项目采用MIT许可证。详情请查看[LICENSE](LICENSE)文件。

## 问题排查

如果您在使用过程中遇到问题：

1. 确保已正确配置API密钥
2. 检查网络连接状态
3. 尝试使用其他模型或提供商
4. 如果问题持续存在，请提交Issue

---

希望这个工具能帮助您创建美观的社交媒体封面！
