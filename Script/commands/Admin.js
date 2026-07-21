const axios = require("axios");
const request = require("request");
const fs = require("fs-extra");
const moment = require("moment-timezone");

module.exports.config = {
 name: "admin",
 version: "1.0.0",
 hasPermssion: 0,
 credits: "SHAHADAT SAHU",
 description: "Show Owner Info",
 commandCategory: "info",
 usages: "admin",
 cooldowns: 2
};

module.exports.run = async function({ api, event }) {
 const time = moment().tz("Asia/Dhaka").format("DD/MM/YYYY hh:mm:ss A");

 const callback = () => api.sendMessage({
 body: `
┌───────────────⭓
│ 𝗢𝗪𝗡𝗘𝗥 𝗗𝗘𝗧𝗔𝗜𝗟𝗦
├───────────────
│👤 𝐍𝐚𝐦𝐞 : 𝗧𝗨𝗛𝗜𝗡 𝗦𝗛𝗘𝗜𝗞𝗛 
│🚹 𝐆𝐞𝐧𝐝𝐞𝐫 : 𝗠𝗮𝗹𝗲 
│❤️ 𝐑𝐞𝐥𝐚𝐭𝐢𝐨𝐧 : 𝗠𝗶𝗻𝗴𝗹𝗲 
│🎂 𝐀𝐠𝐞 : 17+
│🕌 𝐑𝐞𝐥𝐢𝐠𝐢𝐨𝐧 : 𝗜𝘀𝗹𝗮𝗺 
│🎓 𝐄𝐝𝐮𝐜𝐚𝐭𝐢𝐨𝐧 : (𝗖𝗹𝗮𝘀𝘀 9)
│🏡 𝐀𝐝𝐝𝐫𝐞𝐬𝐬 : 𝗦𝗶𝗿𝗮𝗷𝗴𝗮𝗻𝗷 
└───────────────⭓

┌───────────────⭓
│ 𝗖𝗢𝗡𝗧𝗔𝗖𝗧 𝗟𝗜𝗡𝗞𝗦
├───────────────
│📘 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸:
│https://fb.com/61590432692323
│💬 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽:
│https://wa.me/01XXXXXXXXX
└───────────────⭓
┌───────────────⭓
│ 𝗖𝗢𝗡𝗧𝗔𝗖𝗧 𝗟𝗜𝗡𝗞𝗦
├───────────────
│📘 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸:
│https://fb.com/Uhasbbz
│💬 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽:
│https://wa.me/01882333052
└───────────────⭓

┌───────────────⭓
│ 🕒 𝗨𝗽𝗱𝗮𝘁𝗲𝗱 𝗧𝗶𝗺𝗲
├───────────────
│ ${time}
└───────────────⭓
 `,
 attachment: fs.createReadStream(__dirname + "/cache/owner.jpg")
 }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/owner.jpg"));

 return request("https://i.ibb.co/yc185575/Picsart-26-03-27-22-31-47-765.jpg") //এখানে আপনার ছবির Imgur link বসাবেন✅
 .pipe(fs.createWriteStream(__dirname + '/cache/owner.jpg'))
 .on('close', () => callback());
};
