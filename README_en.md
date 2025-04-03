# Multilingual Poster Generator

[![中文文档](https://img.shields.io/badge/文档-中文版-blue.svg)](README.md)

A powerful AI-based poster generation tool that creates beautiful posters and cover images for different platforms.

## Features

- 🌐 **Multi-platform Support**: Generate optimized covers for Xiaohongshu, WeChat Official Accounts, Bilibili, and more
- 🎨 **Multiple Design Styles**: Choose from a variety of beautiful design styles
- 🤖 **AI-Powered**: Create creative posters using advanced large language models
- 💻 **Responsive Interface**: Works perfectly on both desktop and mobile devices
- 🔄 **Real-time Preview**: Preview your poster before generation
- 📤 **One-click Export**: Easily export as PNG or HTML format

## Getting Started

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/multilingual-poster-gen.git
   cd multilingual-poster-gen
   ```

2. Install dependencies
   ```bash
   npm install
   # or using yarn
   yarn install
   ```

3. Start the development server
   ```bash
   npm run dev
   # or using yarn
   yarn dev
   ```

4. Visit `http://localhost:8080` in your browser

## User Guide

1. **Enter Text Content**: Input your poster text content in the left text box
2. **Choose Platform**: Select the target platform (Xiaohongshu, WeChat, Bilibili)
3. **Select Style**: Choose a style from multiple design options
4. **Configure Model**: Click the "Configure Model" button to set up your AI model API key
5. **Generate Poster**: Click the "Generate Cover" button
6. **Export**: After generation is complete, click the "Export" button to download the poster

## Model Configuration

For first-time use, you need to set up the AI model configuration:

1. Click the "Configure Model" button
2. Enter your API key and related settings
3. Select the model you want to use
4. Click save

Supported API providers:
- OpenAI
- Anthropic
- Silicon.Run
- OpenRouter and more

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Shadcn UI
- Axios
- html2canvas (for export)

## Contribution Guidelines

Pull Requests and Issues are welcome to help improve this project.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Troubleshooting

If you encounter any problems while using this tool:

1. Make sure your API key is configured correctly
2. Check your network connection status
3. Try using other models or providers
4. If the problem persists, please submit an Issue

---

We hope this tool helps you create beautiful social media covers! 