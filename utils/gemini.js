const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const MODEL = process.env.GEMINI_MODEL || "gemini-flash-latest";
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(MODEL)}:generateContent`;
const MAX_OUTPUT_TOKENS = Number(process.env.GEMINI_MAX_OUTPUT_TOKENS || 512);
const TEMPERATURE = Number(process.env.GEMINI_TEMPERATURE || 0.7);

function getApiKey() {
  return String(process.env.GEMINI_API_KEY || "").trim();
}

async function generateReply(contents, options = {}) {
  const apiKey = getApiKey();
  if (!apiKey || apiKey === "your_gemini_api_key_here") {
    const error = new Error("Gemini API key is not configured");
    error.code = "GEMINI_KEY_MISSING";
    throw error;
  }

  const response = await axios.post(
    ENDPOINT,
    {
      contents,
      generationConfig: {
        temperature: Number.isFinite(options.temperature) ? options.temperature : TEMPERATURE,
        maxOutputTokens: Number.isFinite(options.maxOutputTokens)
          ? options.maxOutputTokens
          : MAX_OUTPUT_TOKENS
      }
    },
    {
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
        "X-goog-api-key": apiKey
      }
    }
  );

  const text = response.data?.candidates?.[0]?.content?.parts
    ?.map(part => part.text || "")
    .join("")
    .trim();

  if (!text) {
    throw new Error("Gemini returned an empty response");
  }

  return text;
}

module.exports = { generateReply, getApiKey };
