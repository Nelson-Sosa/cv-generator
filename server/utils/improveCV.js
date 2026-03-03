// server/utils/improveCV.js
require("dotenv").config();
const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function improveCV(text) {
  if (!text) return "";

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Eres un experto en recursos humanos que mejora textos de CV haciéndolos más profesionales y atractivos.",
        },
        {
          role: "user",
          content: `Mejora este texto de CV:\n\n${text}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 300,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error en improveCV:", error.message);
    return text; // fallback
  }
}

module.exports = improveCV;