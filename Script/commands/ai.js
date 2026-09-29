const { generateReply, getApiKey } = require("../../utils/gemini");

const conversations = new Map();
const MAX_HISTORY_MESSAGES = 10;
const MAX_MESSAGE_LENGTH = 1500;

module.exports.config = {
  name: "ai",
  aliases: ["gemini", "chat"],
  version: "1.0.0",
  hasPermssion: 0,
  credits: "TUHIN",
  description: "Chat with Google Gemini AI",
  commandCategory: "AI",
  usages: "[your message] | reset",
  cooldowns: 5,
  usePrefix: true
};

function getHelpPrefix() {
  return global.config?.PREFIX || ".";
}

function send(api, event, message) {
  return api.sendMessage(message, event.threadID, event.messageID);
}

module.exports.run = async function ({ api, event, args }) {
  const threadID = String(event.threadID);
  const prompt = args.join(" ").trim();

  if (prompt.toLowerCase() === "reset" || prompt.toLowerCase() === "clear") {
    conversations.delete(threadID);
    return send(api, event, "✅ এই chat-এর Gemini memory reset করা হয়েছে।");
  }

  if (!prompt) {
    return send(
      api,
      event,
      `🤖 Gemini AI ব্যবহার করতে লিখুন:\n${getHelpPrefix()}ai তোমার প্রশ্ন\n\nMemory মুছতে লিখুন: ${getHelpPrefix()}ai reset`
    );
  }

  if (!getApiKey()) {
    return send(api, event, "⚠️ Gemini API key configure করা হয়নি। Admin-কে GEMINI_API_KEY সেট করতে হবে।");
  }

  const history = conversations.get(threadID) || [];
  const contents = [
    {
      role: "user",
      parts: [{ text: "You are a helpful, respectful Messenger bot. Reply concisely. Match the user's language; if they write Bangla, reply in Bangla." }]
    },
    ...history,
    { role: "user", parts: [{ text: prompt.slice(0, MAX_MESSAGE_LENGTH) }] }
  ];

  let waitMessage;
  try {
    waitMessage = await api.sendMessage("⏳ Gemini ভাবছে...", event.threadID);
    const answer = await generateReply(contents);

    const updatedHistory = [
      ...history,
      { role: "user", parts: [{ text: prompt.slice(0, MAX_MESSAGE_LENGTH) }] },
      { role: "model", parts: [{ text: answer }] }
    ].slice(-MAX_HISTORY_MESSAGES);
    conversations.set(threadID, updatedHistory);

    if (waitMessage?.messageID && typeof api.unsendMessage === "function") {
      await api.unsendMessage(waitMessage.messageID);
    }

    return send(api, event, `🤖 Gemini AI:\n\n${answer}`);
  } catch (error) {
    if (waitMessage?.messageID && typeof api.unsendMessage === "function") {
      try { await api.unsendMessage(waitMessage.messageID); } catch (_) {}
    }

    const message = error.code === "GEMINI_KEY_MISSING"
      ? "⚠️ Gemini API key পাওয়া যায়নি। Server-এর .env ফাইলে GEMINI_API_KEY সেট করুন।"
      : "❌ Gemini এখন উত্তর দিতে পারছে না। কিছুক্ষণ পর আবার চেষ্টা করুন।";
    return send(api, event, message);
  }
};

module.exports.onUnload = function () {
  conversations.clear();
};
