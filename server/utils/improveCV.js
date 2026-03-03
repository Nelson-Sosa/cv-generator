const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function improveCV(text) {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Actúa como un experto en recursos humanos. Mejora este texto de CV para que sea profesional, atractivo y listo para enviar a empleadores."
        },
        { role: "user", content: text }
      ],
      temperature: 0.7
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error mejorando CV:", error.message);
    return text; // fallback: usar el texto original si falla la IA
  }
}

module.exports = improveCV;