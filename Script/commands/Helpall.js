const fs = require("fs-extra");
const request = require("request");

module.exports.config = {
 name: "helpall",
 version: "1.0.0",
 hasPermssion: 0,
 credits: "SHAHADAT SAHU",
 description: "Displays all available commands in one page",
 commandCategory: "system",
 usages: "[No args]",
 cooldowns: 5
};

module.exports.run = async function ({ api, event }) {
 const { commands } = global.client;
 const { threadID, messageID } = event;

 const allCommands = [];

 for (let [name] of commands) {
 if (name && name.trim() !== "") {
 allCommands.push(name.trim());
 }
 }

 allCommands.sort();

 const finalText = `╔═══❖ 🌟 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 𝐋𝐈𝐒𝐓 🌟 ❖═══╗
${allCommands.map(cmd => `║ ➔ ${cmd}`).join("\n")}
╠═════🔰 𝐁𝐎𝐓 𝐈𝐍𝐅𝐎 🔰═════╣
║ 🤖 𝐁𝐨𝐭: ─꯭─⃝‌‌𝐓𝐮𝐡𝐢𝐧 𝐂𝐡𝐚𝐭 𝐁𝐨𝐭
║ 👑 𝐎𝐰𝐧𝐞𝐫: 𝐃𝐄𝐕 𝐓𝐔𝐇𝐈𝐍
║ 📦 𝐂𝐨𝐦𝐦𝐚𝐧𝐝𝐬: ${allCommands.length} 
╚═══════════════════════╝`;
 
 // 🔹 এখানে আপনার ফটো Imgur লিংক করে বসাবেন ✅
 
 const backgrounds = [
    "https://i.ibb.co.com/Z6Zzwt70/fddb2275-2e3e-45f9-992f-ba7ca5f2278d.jpg",
    "https://i.ibb.co.com/C516ZrNC/a4038f4e-388c-4e9a-b714-4a00625beed0.jpg",
    "https://i.ibb.co.com/d44NzdK3/2d27a3a4-e45e-438b-90fa-4a7de36c4261.jpg",
    "https://i.ibb.co.com/FqHkgbmF/20fe5021-551a-4a64-9998-0e71f9a4c4db.jpg"
 ];
 const selectedBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
 const imgPath = __dirname + "/cache/helpallbg.jpg";

 const callback = () =>
 api.sendMessage({ body: finalText, attachment: fs.createReadStream(imgPath) }, threadID, () => fs.unlinkSync(imgPath), messageID);

 request(encodeURI(selectedBg))
 .pipe(fs.createWriteStream(imgPath))
 .on("close", () => callback());
};
