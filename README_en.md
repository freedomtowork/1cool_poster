[![中文文档](https://img.shields.io/badge/Documentation-中文-blue.svg)](README.md)

# 1Cool Poster Generator

A powerful AI-based poster generation tool for creating beautiful posters and cover images for different platforms.

## Features

- 🌐 **Multi-platform Support**: Generate optimized covers for Xiaohongshu, WeChat Official Accounts, Bilibili, and more
- 🎨 **Multiple Design Styles**: Choose from a variety of beautiful design styles
- 📤 **One-click Export**: Easily export as PNG format
- 🔧 **Deployment Configuration**: Support default API configuration through environment variables

## Getting Started

1. Clone the repository
   ```bash
   git clone https://github.com/ivesyi/1cool.git
   cd 1cool
   ```

2. Install dependencies
   ```bash
   npm install
   # or using yarn
   yarn install
   ```

3. Configure API (optional)
   ```bash
   # Copy configuration template
   cp .env.example .env
   # Edit the .env file and fill in your API key
   ```

4. Start the development server
   ```bash
   npm run dev
   # or using yarn
   yarn dev
   ```

5. Visit `http://localhost:8080` in your browser

## Usage Guide

1. **Enter Text Content**: Input your poster text content in the left text box
2. **Select Platform**: Choose the target platform (Xiaohongshu, WeChat, Bilibili)
3. **Choose Style**: Select from multiple design styles
4. **Configure Model**: Click the "Configure Model" button to set up your AI model API key
5. **Generate Poster**: Click the "Generate Cover" button
6. **Export**: After generation, click the "Export" button to download the poster

## Model Configuration

When using for the first time, you need to set up the AI model configuration:

1. Click the "Configure Model" button
2. Enter your API key and related settings
3. Select the model you want to use
4. Click save

Supported API providers:
- Silicon Flow
- OpenRouter
- Anthropic (untested, please test yourself)
- Google Gemini
- Custom

Recommended models:
- Claude-3.7-sonnet-thinking (best results, recommended)
- Gemini 2.5 Pro Experimental 03-25 (good results)
- DeepSeek-V3 (best value for money, average results)

# Deployment Configuration

This project supports configuring default API settings through environment variables, allowing users to have a working configuration when first using the tool.

## Configuration Methods

### Method 1: Using .env File (Development Environment)

1. Copy the `.env.example` file in the project root directory and rename it to `.env`
2. Edit the `.env` file, fill in your API key and other configurations

```
# API Configuration
VITE_DEFAULT_API_KEY=your_api_key
VITE_DEFAULT_API_URL=https://api.silicon.run
VITE_DEFAULT_MODEL=Pro/deepseek-ai/DeepSeek-V3
VITE_DEFAULT_PROVIDER=silicon
```

### Method 2: Setting Environment Variables via Deployment Platform

If you are deploying on platforms like Vercel or Netlify, you can add the following variables in the platform's environment variable settings:

- `VITE_DEFAULT_API_KEY`: Your API key
- `VITE_DEFAULT_API_URL`: API service address
- `VITE_DEFAULT_MODEL`: Default model ID to use
- `VITE_DEFAULT_PROVIDER`: Default provider

#### One-Click Deployment

You can use the following buttons to deploy to Vercel or Netlify with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fivesyi%2F1cool)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/ivesyi/1cool)

> Note: After deployment, make sure to configure the necessary API keys and other configuration items in the platform's environment variable settings.

## Supported Providers

Currently supported providers are:

1. `silicon` - Silicon Flow (default)
2. `openrouter` - OpenRouter
3. `anthropic` - Anthropic
4. `google` - Google (Gemini)
5. `custom` - Custom

## Notes

1. Configurations saved by users in the interface will override the environment variable configurations
2. If users clear their browser cache, the system will use the default configuration from environment variables again
3. API keys will be encrypted and stored locally on the user's device and will not be sent anywhere other than the specified API service

## Security Tips

- Do not include your API key in public code repositories
- For production environments, always use environment variables or secure key management systems
- Consider using different API keys for different deployment environments

## Troubleshooting

If you encounter issues during use:

1. Ensure that the API key is correctly configured
2. Check network connection status
3. Try using other models or providers
4. If the problem persists, please submit an Issue

---

We hope this tool helps you create beautiful social media covers! If you have any suggestions or improvements, feel free to submit a PR or discuss in Issues. Let's make this tool even better together!
