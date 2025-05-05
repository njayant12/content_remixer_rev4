const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
let fetch;
try {
  fetch = global.fetch || require('node-fetch');
} catch (e) {
  fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
}

const app = express();
const port = 3001;

// [DEBUG] Log all incoming requests
app.use((req, res, next) => {
  console.log(`[DEBUG] Incoming request: ${req.method} ${req.url}`);
  next();
});

// Robust CORS options
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    // Allow any localhost origin (any port)
    if (/^http:\/\/localhost:\d+$/.test(origin)) {
      return callback(null, true);
    }
    // Otherwise, block it
    callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
};
app.use(cors(corsOptions));

// Preflight handler for all routes (Express 4 compatible)
app.options('*', cors(corsOptions));

// (Optional for debugging) Permissive CORS header
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   next();
// });

app.use(bodyParser.json());

app.post('/api/remix', async (req, res) => {
  console.log('[API] /api/remix called with body:', req.body);
  const { content } = req.body;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.VITE_CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-opus-20240229',
        max_tokens: 300,
        messages: [
          { role: 'user', content: `Remix this: ${content}` }
        ]
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('[API] Error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
