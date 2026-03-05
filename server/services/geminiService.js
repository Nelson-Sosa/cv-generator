const axios = require("axios");

async function generarTexto(prompt) {
  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 500
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
        }
      }
    );
    return response.data.choices?.[0]?.message?.content || null;
  } catch (error) {
    console.error("Error en generarTexto:", error.response?.data || error.message);
    return null;
  }
}

module.exports = { generarTexto };