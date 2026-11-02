const express = require('express');
const path = require('path');
const app = express();

app.use(express.json({ limit: '20kb' }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/health', (_, res) => res.json({ ok: true, name: 'MICAN' }));

app.post('/api/chat', async (req, res) => {
  try {
    const message = typeof req.body.message === 'string' ? req.body.message.trim() : '';
    if (!message) return res.status(400).json({ reply: 'Please type a message first.' });
    if (message.length > 4000) return res.status(400).json({ reply: 'Please keep your message under 4,000 characters.' });
    if (!process.env.OPENAI_API_KEY) return res.status(503).json({ reply: 'MICAN AI is not configured yet.' });

    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        instructions: 'You are MICAN, a friendly, helpful all-in-one AI assistant. Be clear, accurate, and concise.',
        input: message,
        max_output_tokens: 700
      })
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('OpenAI API error:', data.error?.message || response.status);
      return res.status(502).json({ reply: 'MICAN could not get an AI response right now. Please try again later.' });
    }

    const answer = data.output_text || (data.output || [])
      .flatMap(item => item.content || [])
      .filter(item => item.type === 'output_text')
      .map(item => item.text)
      .join('\n');

    res.json({ reply: answer || 'I could not produce a response. Please try again.' });
  } catch (error) {
    console.error('Chat error:', error.message);
    res.status(500).json({ reply: 'Something went wrong. Please try again.' });
  }
});

app.listen(process.env.PORT || 3000, () => console.log('MICAN running'));
