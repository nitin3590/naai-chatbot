require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true
}));
app.options('*', cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

app.post('/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message is required.' });
  try {
    const response = await axios.post(
      GEMINI_API_URL,
      {
        contents: [{ parts: [{ text: message }] }]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': GEMINI_API_KEY
        }
      }
    );
    const geminiReply = response.data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    res.json({ reply: geminiReply });
  } catch (error) {
    console.error(error);
    // Only send generic error messages to the user, no Gemini mention
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 