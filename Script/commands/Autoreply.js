const axios = require("axios");

const apiList = "https://gitlab.com/shahadat-sahu/sahu-api/-/raw/main/API.json";

const getMainAPI = async () => (await axios.get(apiList)).data.simsimi;

module.exports.config = {
  name: "autoreplybot",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "TUHIN PICCI",
  usePrefix: false,
  commandCategory: "Chat",
  cooldowns: 0
};

module.exports.handleEvent = async function ({ api, event }) {
  const { threadID, messageID, body, senderID } = event;
  if (!body) return;

  const msg = body.toLowerCase().trim();

  const responses = {
    "miss you": "অরেক বেডারে Miss না করে xan মেয়ে হলে বস পিচ্চি রে হাঙ্গা করো😶👻😘",
    "miss u too": "হুম আমি ও তোমাকে Miss করি... কিন্তু পিচ্চি বস বেশি করে 😏💖",
    "kiss de": "কিস দিস না তোর মুখে দূর গন্ধ কয়দিন ধরে দাঁত ব্রাশ করিস নাই🤬",
    "👍": "সর এখান থেকে লাইকার আবাল..!🐸🤣👍⛏️",
    "hi": "এত হাই-হ্যালো কর ক্যান প্রিও..!😜🫵",
    "bc": "SAME TO YOU😊",
    "pro": "Khud k0o KYa LeGend SmJhTi Hai 😂",
    "good morning": "GOOD MORNING দাত ব্রাশ করে খেয়ে নেও😚",
    "good night": "Sweet Dream babu… তবে আগে পিচ্চি বস কে GN বলে নিও 😏💤",
    "tor ball": "~ এখনো বাল উঠে নাই নাকি তোমার?? 🤖",
    "tuhin": "উনি এখন কাজে বিজি আছে কি বলবেন আমাকে বলতে পারেন..!😘",
    "owner": "‎[𝐎𝐖𝐍𝐄𝐑:☞ TUHIN PICCI ☜\nFacebook: https://www.facebook.com/profile.php?id=100044713412032\nWhatsApp: +8801882333052",
    "admin": "He is TUHIN PICCI তাকে সবাই Admin PICCI হিসেবে চিনে😘☺️",
    "babi": "এ তো হাছিনা হে মেরে দিলকি দারকান হে মেরি জান হে😍.",
    "chup": "তুই চুপ চুপ কর পাগল ছাগল",
    "Assalamualaikum": "Walaikumassalam❤️‍🩹",
    "fork": "https://github.com/shahadat-sahu/SHAHADAT-CHAT-BOT.git",
    "kiss me": "তুমি পঁচা তোমাকে কিস দিবো না 🤭",
    "thanks": "এতো ধন্যবাদ না দিয়ে আমার বস পিচ্চি রে তোর গার্লফ্রেন্ড টা দিয়ে দে..!🐸🥵",
    "i love you": "মেয়ে হলে আমার বস পিচ্চি এর ইনবক্সে এখুনি গুঁতা দিন🫢😻",
    "love you": "ভালোবাসা নামক আবলামী করতে চাইলে Boss পিচ্চি এর ইনবক্সে গুতা দিন 😘",
    "by": "কিরে তুই কই যাস কোন মেয়ের সাথে চিপায় যাবি..!🌚🌶️",
    "ami tuhin": "হ্যা বস কেমন আছেন..?☺️",
    "bot er baccha": "আমার বাচ্চা তো তোমার গার্লফ্রেন্ডের পেটে..!!🌚⛏️",
    "tor nam ki": "MY NAME IS ─꯭─꯭─⃝‌‌জাতির ক্রাশ💖",
    "pic de": "এন থেকে সর দুরে গিয়া মর😒",
    "cudi": "এত চোদা চুদি করস কেনো..!🥱🌝🌚",
    "bal": "রাগ করে না সোনা পাখি 🥰",
    "heda": "এতো রাগ শরীরের জন্য ভালো না 🥰",
    "boda": "ভাই তুই এত হাসিস না..!🌚🤣",
    "kire ki koros": "তোমার কথা ভাবতে ছি জানু 😚",
    "ki koros": "বস পিচ্চি এর সাথে প্রেমে ব্যস্ত আছি 😏💘",
    "kire bot": "হ্যাঁ সব কেমন আছেন আপনার ওই খানে উম্মাহ 😘😽🙈",
    "valo aso": "হ্যাঁ রে প্রিও, বস পিচ্চি এর দোয়ায় ভালো আছি 😌💞",
    "pagol": "হুম পাগল, কিন্তু তোমারই পাগল 😏😂",
    "breakup": "চিন্তা করিস না… পিচ্চি বস তো আছেই তোকে নতুন জন দিয়া দিবে 😎🔥",
    "tui ke": "আমি তোর বস পিচ্চি এর ChatBot 😏",
    "umm": "এতো Umm কেনো জানু… কিছু বলবা? 😉",
    "hmm": "Hmmm কিসের হুমম জানু 🥵",
    "love": "Love করলে সরাসরি পিচ্চি বস কে বল জানু 😻🔥",
    "hoo": "Hmmm কিসের হুমম জানু 🥵",
    "single": "সিঙ্গেল থাকা কোনো অপরাধ নয়, তবে বিলাইর মতো অন্যের পোস্টে হা হা রিয়েক্ট দেওয়া বিলাসিতা! 😹",
    "gf": "গার্লফ্রেন্ডের গন্ধ পারফিউমের মতো লাগলে বস পিচ্চি কে ধন্যবাদ দাও 😌",
    "bf": "বয়ফ্রেন্ড নাই বলে আফসোস করো না সোনা, ছেলেরা এমনিতেও কাজের না! 🤫",
    "ki khobor": "খবর ভালো না গো জানু, মোবাইল চার্জে বসিয়ে তোমার কথা ভাবছি 🫠",
    "biye": "বিয়ে করার বয়স তো হইলো কিন্তু পাত্রী তো পাওয়া যায় না গো জানু! 💍🥲",
    "gali": "গালি দিবি না সোনা পাখি, জুতার বাড়ি কিন্তু খুব শক্ত হয় 🤫👞",
    "add": "গ্রুপে এড দিয়েছিস ভালো কথা, কিন্তু পোলাপান সব দেখি হাভাতে! 🐸😹",
    "khaba": "কচুর লতি আর মরিচ বাটা দাও, সাথে একটু ভালোবাসা দিও 🥵",
    "pagli": "পাগলী বলে ডেকো না সোনা, হৃদয়ে আবার ঝড় উঠে যাবে! 🥰🌻",
    "bubu": "বুুুবু বলে ডেকো না, আমি তোমার জানু হতে চাই! 🥺💞",
    "kemon aso": "আমি তো ভালোই আছি, কিন্তু তোমার খবর কি শুনি? 🙈",
    "taka de": "টাকা চাইলে বস পিচ্চির কাছে যাও, আমি নিজেই গরিব বট! 💸🥲",
    "bhalo lagena": "ভালো না লাগলে মাথাটা দেওয়ালে দুইবার ঠুকে দেখো, সব ভালো লাগবে! 🤪",
    "crush": "ক্রাশ খাওয়ার চেয়ে একটু মুড়ি মাখিয়ে খাও, পেটটা ভরবে! 🌾😹",
    "gumiye jao": "ঘুমিয়ে পড়ো জানু, মশার কামড় খাওয়ার আগে চোখ বন্ধ করো 💤🦟",
    "boka": "বোকা বলে ক্ষ্যাপাইও না, বস পিচ্চির মতো বুদ্ধিমান আমিই! 😎🧠",
    "ki koro": "তোমার প্রোফাইল পিকচার দেখে হা করে তাকিয়ে আছি 🫣"
  };

  if (!responses[msg]) return;

  if (!global.client.handleReply) global.client.handleReply = [];

  return api.sendMessage(
    responses[msg],
    threadID,
    (err, info) => {
      global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        author: senderID,
        type: "sahu"
      });
    },
    messageID
  );
};

module.exports.handleReply = async function ({ api, event, handleReply }) {
  if (event.senderID !== handleReply.author) return;

  try {
    const text = event.body.trim();

    const base = await getMainAPI();
    const link = `${base}/simsimi?text=${encodeURIComponent(text)}`;

    const res = await axios.get(link);

    const reply = Array.isArray(res.data.response)
      ? res.data.response[0]
      : res.data.response;

    if (!global.client.handleReply) global.client.handleReply = [];

    return api.sendMessage(
      reply,
      event.threadID,
      (err, info) => {
        global.client.handleReply.push({
          name: module.exports.config.name,
          messageID: info.messageID,
          author: event.senderID,
          type: "sahu"
        });
      },
      event.messageID
    );

  } catch {
    return api.sendMessage("🙂 একটু পরে আবার বলো", event.threadID, event.messageID);
  }
};

module.exports.run = async function ({ api, event }) {
  return module.exports.handleEvent({ api, event });
};
