require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.post('/api/analyze', async (req, res) => {
    try {
        const { prompt, image_base64 } = req.body;
        const apiKey = process.env.GROQ_API_KEY;

        if (!apiKey) {
            return res.status(500).json({ error: 'Missing GROQ_API_KEY in .env settings.' });
        }

        const payload = {
            model: "meta-llama/llama-4-scout-17b-16e-instruct",
            messages: [
                {
                    role: "user",
                    content: [
                        { type: "text", text: prompt },
                        { type: "image_url", image_url: { url: image_base64 } }
                    ]
                }
            ],
            max_tokens: 1024
        };

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err?.error?.message || `Groq API error ${response.status}`);
        }

        const data = await response.json();
        res.json({ text: data.choices[0].message.content });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// For local testing
if (process.env.NODE_ENV !== 'production') {
    app.use(express.static(__dirname + '/..'));
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Local dev server running on port ${PORT}`));
}

module.exports = app;
