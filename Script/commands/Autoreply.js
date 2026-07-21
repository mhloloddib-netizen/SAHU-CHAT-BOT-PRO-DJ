const axios = require("axios");

const apiList = "https://gitlab.com/shahadat-sahu/sahu-api/-/raw/main/API.json";

const getMainAPI = async () => (await axios.get(apiList)).data.simsimi;

module.exports.config = {
  name: "autoreplybot",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "SHAHADAT SAHU",
  usePrefix: false,
  commandCategory: "Chat",
  cooldowns: 0
};

module.exports.handleEvent = async function ({ api, event }) {
  const { threadID, messageID, body, senderID } = event;
  if (!body) return;

  const msg = body.toLowerCase().trim();

  const responses = {
    "ki koro": "এই তো একটু ব্যস্ত ছিলাম। তুমি কী করছো? 😊",
"kemon aso": "আলহামদুলিল্লাহ ভালো আছি। তুমি কেমন আছো?",
"ki obostha": "মোটামুটি ভালোই চলছে। তোমার খবর কী?",
"khawa hoise": "হ্যাঁ, একটু আগে খেলাম। তুমি খেয়েছো?",
"ghumaiso": "না, এখনো না। তোমার?",
"ki korcho": "একটু গল্প করছি। 😄",
"busy": "হুম, একটু কাজ ছিল। এখন বলো কী খবর?",
"free": "হ্যাঁ, এখন ফ্রি আছি। 😊",
"hello": "হ্যালো! অনেক দিন পর দেখা। 😄",
"hi": "হাই! কেমন আছো?",
"hey": "এই যে! বলো কী খবর?",
"valo": "আলহামদুলিল্লাহ। শুনে ভালো লাগলো। ❤️",
"kharap": "কী হয়েছে? চাইলে বলতে পারো।",
"mon kharap": "মন খারাপ থাকলে কারো সাথে একটু কথা বলো, ভালো লাগবে। ❤️",
"tension": "এত টেনশন নিও না। সব ঠিক হয়ে যাবে ইনশাআল্লাহ। 🤲",
"thanks": "আরে, ধন্যবাদ দেওয়ার কিছু নেই। 😊",
"sorry": "কোনো সমস্যা নেই। এমন তো হতেই পারে। 🙂",
"bye": "ঠিক আছে, ভালো থেকো। পরে আবার কথা হবে। 👋",
"good night": "শুভ রাত্রি। ভালো করে ঘুমিও। 🌙",
"good morning": "সুপ্রভাত! আজকের দিনটা সুন্দর কাটুক। 🌸",
"ami aschi": "আচ্ছা, অপেক্ষা করছি। 😄",
"onek din por": "হ্যাঁ, অনেক দিন পর! কোথায় ছিলে এতদিন?",
"miss you": "আমিও তোমাকে অনেকদিন দেখিনি। 😊",
"ki vabcho": "তেমন কিছু না। তুমি কী ভাবছো?",
"amake chino": "অবশ্যই চিনি। 😄",
"tui koi": "এই তো আছি। কোথাও যাইনি।",
"ami eka": "একা লাগলে একটু গল্প করি? 😊",
"haso": "হাসলে কিন্তু তোমাকে বেশি সুন্দর লাগে। 😄",
"ki holo": "কী হয়েছে? সব ঠিক তো?",
"valo laglo": "শুনে সত্যিই ভালো লাগলো। ❤️",
"ami jabo": "ঠিক আছে। সাবধানে যেও।",
"ki news": "নতুন কিছু না। তোমার কোনো খবর আছে?"
"ki khobor": "এই তো ভালোই আছি। তোমার দিনটা কেমন গেল? 😊",

"ki korteso": "একটু বসে ছিলাম। তুমি কী করছো? 😄",

"amake mone ase": "হুম, মাঝে মাঝে তো মনে পড়েই। 🙂",

"koi aso": "এই তো আছি। তুমি কোথায়? 👀",

"online aso": "হ্যাঁ, এখন অনলাইনেই আছি। 😊",

"busy naki": "একটু ছিলাম, এখন ফ্রি। বলো। 😄",

"ki niye busy": "এই একটু কাজ ছিল। এখন বলো কী দরকার? 😊",

"reply dao": "এই তো দিলাম। এত অস্থির হচ্ছো কেন? 😂",

"ki vabcho": "তেমন কিছু না। তুমি কী ভাবছো? 🤔",

"ami ashbo": "এসো, গল্প করি। 😄",

"ghum paise": "ঘুম পেলে একটু রেস্ট নাও। 😴",

"ghumaitesi": "আচ্ছা, ঘুমাও। পরে কথা হবে। 🌙",

"khawa sesh": "ভালো। এখন একটু বিশ্রাম নাও। 😊",

"amar kotha shuno": "শুনছি তো। বলো। 👂",

"ami valo nai": "কী হয়েছে? বলতে ইচ্ছা করলে বলো। ❤️",

"ami haste pari na": "একটু হাসার চেষ্টা করো। সব ঠিক হয়ে যাবে। 😊",

"mon kharap": "মন খারাপ থাকলে গান শোনো বা কারো সাথে কথা বলো। ❤️",

"onek din por": "সত্যি! অনেকদিন পর দেখা। কোথায় ছিলে? 😄",

"amake vula gecho": "না তো। শুধু কথা কম হয়েছে। 🙂",

"ki re": "হুম বলো। 😄",

"oi": "এই যে! শুনছি। 👀",

"acha": "হুম, ঠিক আছে। 😊",

"seriously": "হ্যাঁ, একদম সিরিয়াস। 😄",

"sotti": "হুম, সত্যিই। 😊",

"amake help korba": "অবশ্যই। কী সাহায্য লাগবে? ❤️",

"ami parbo": "আমি বিশ্বাস করি তুমি পারবে। 💪",

"ami voy paitesi": "ভয় না পেয়ে ধীরে ধীরে এগিয়ে যাও। 🤍",

"ekta golpo bolo": "আজ না হয় তুমি একটা গল্প বলো। 😄",

"moja korba": "চলো, একটু আড্ডা দেই। 😂",

"ki khaba": "আজ যা খেতে মন চায়, সেটাই খাও। 😋",

"ber hobo": "সাবধানে যেও। 😊",

"fire ashchi": "আচ্ছা, অপেক্ষা করছি। 😄",

"tui koi geli": "এই তো ছিলাম। 😅",

"tui amar friend": "অবশ্যই। বন্ধু হিসেবেই থাকবো। 🤝",

"amake disturb korlam": "না না, একদম না। 😊",

"amar sathe kotha bolba": "কেন বলবো না? বলো। 😄",

"tomar din kemon": "আলহামদুলিল্লাহ ভালোই গেছে। তোমার? 😊",

"ajke ki korla": "বিশেষ কিছু না। সাধারণ একটা দিন। 😄",

"tomake dekhe valo lage": "ধন্যবাদ। শুনে ভালো লাগলো। 😊",

"tumi funny": "হাহা, মাঝে মাঝে চেষ্টা করি। 😂",

"ki hobe": "যা হবে, ভালো কিছুর জন্যই হবে। 🤲",

"ami ekhon ki kori": "যেটা সবচেয়ে জরুরি, সেটা দিয়েই শুরু করো। 😊",

"amake call dao": "কল দিতে পারি না, তবে এখানে আছি। 😄",

"tomar voice sundor": "ইশ! যদি সত্যি কথা বলতে পারতাম। 😅",

"ki chai tomar": "একটা সুন্দর হাসি হলেই হবে। 😊",

"tumi onek valo": "ধন্যবাদ। তুমিও অনেক ভালো মানুষ। ❤️",

"jabo": "ঠিক আছে। পরে আবার কথা হবে। 👋",

"ajke asba": "হ্যাঁ আসবো, একটু পরে বের হচ্ছি।",

"khub dorkar": "বলো কী হয়েছে? আমি শুনছি সব।",

"kothay tumi": "বাসায় আছি এখন, তুমি কোথায়?",

"kisu hobe na": "আল্লাহ ভরসা, সব ঠিক হয়ে যাবে।",

"kemon lagse": "আমার কাছে তো বেশ ভালোই লাগছে।",

"ekto help koro": "বলো, এখন কী করতে হবে আমার?",

"baje kotha": "ধুর! এসব ফালতু কথা বাদ দাও তো।",

"ajke bisti": "হুম, বাইরে বেশ ভালোই বৃষ্টি হচ্ছে আজকে।",

"taratari aso": "এই তো এসে গেছি, আর দুই মিনিট লাগবে।"
"kobe jaba": "পরশুদিন যাবো ভাবছি, তুমি যাবা নাকি?",

"ekto thako": "আচ্ছা আছি, তুমি তোমার কাজ শেষ করো।",

"ki dekhso": "এই তো, ফোনে একটা নাটক দেখছি বসে।",

"moner kotha": "মনের কথা মুখে বলে দেওয়াই ভালো সবসময়।",

"kisu boloni": "না, আমি তাকে কিছুই বলিনি এখনো এই নিয়ে।",

"kalke dekha hobe": "হ্যাঁ কালকে দেখা হচ্ছে, সময়মতো চলে এসো কিন্তু।",

"khub gorom": "আজকে আসলেও অনেক বেশি গরম পড়েছে বাইরে।",

"special ki ranna": "আজকে বাসায় স্পেশাল বিরিয়ানি রান্না হয়েছে আমাদের।",

"gari te assi": "আচ্ছা ঠিক আছে, জ্যাম পার হয়ে সাবধানে এসো।",

"buji ni": "আমি আসলে কথাটা ঠিকমতো বুঝতে পারিনি তোমার।",

"r rasta nai": "হাল ছেড়ো না, কোনো না কোনো পথ বের হবেই।",

"mathay asse na": "আমার নিজের মাথায়ও এখন কিছু
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
