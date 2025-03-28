const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

// 配置CORS以允许前端应用访问
app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:3000', 'http://localhost:5173']
}));

app.use(express.json());

// 代理转发到OpenRouter API
app.post('/api/generate', async (req, res) => {
  try {
    const { apiKey, model, prompt } = req.body;
    
    if (!apiKey || !model || !prompt) {
      return res.status(400).json({ error: '缺少必要参数' });
    }
    
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: model,
        messages: [
          { role: "system", content: "你是一个专业的网页设计师，擅长创建精美的HTML海报。" },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 4000,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': 'https://multilingual-poster-gen.vercel.app/',  // 可以替换为您的实际网站
          'X-Title': '封面生成器'
        }
      }
    );
    
    res.json(response.data);
  } catch (error) {
    console.error('API调用失败:', error.response?.data || error.message);
    res.status(500).json({ 
      error: '调用API失败', 
      details: error.response?.data || error.message 
    });
  }
});

// 代理转发到硅基流动API
app.post('/api/silicon-generate', async (req, res) => {
  try {
    const { apiKey, model, prompt } = req.body;
    
    if (!apiKey || !model || !prompt) {
      return res.status(400).json({ error: '缺少必要参数' });
    }
    
    const response = await axios.post(
      'https://api.silicon.run/v1/chat/completions',
      {
        model: model,
        messages: [
          { role: "system", content: "你是一个专业的网页设计师，擅长创建精美的HTML海报。" },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 4000,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      }
    );
    
    res.json(response.data);
  } catch (error) {
    console.error('API调用失败:', error.response?.data || error.message);
    res.status(500).json({ 
      error: '调用API失败', 
      details: error.response?.data || error.message 
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API代理服务器运行在端口 ${PORT}`);
}); 