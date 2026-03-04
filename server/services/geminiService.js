const axios = require("axios");

async function generarTexto(prompt, retries = 3) {
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
    const response = await axios.post(
      url,
      { contents: [{ parts: [{ text: prompt }] }] },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data.candidates?.[0]?.content?.parts?.[0]?.text || null;
  } catch (error) {
    const status = error.response?.data?.error?.code;
    if (status === 429 && retries > 0) {
      console.log(`Rate limit alcanzado. Reintentando en 60s... (${retries} intentos restantes)`);
      await new Promise(resolve => setTimeout(resolve, 60000));
      return generarTexto(prompt, retries - 1);
    }
    console.error("Error en generarTexto:", error.response?.data || error.message);
    return null;
  }
}

module.exports = { generarTexto };