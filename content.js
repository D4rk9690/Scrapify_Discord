// content.js
const discordEmojiURLPrefix = "https://cdn.discordapp.com/emojis/";
let discordEmojis = [];

function extractDiscordEmojis() {
  const images = document.getElementsByTagName("img");
  discordEmojis = Array.from(images).filter((img) => img.src.startsWith(discordEmojiURLPrefix));
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "getDiscordEmojis") {
    extractDiscordEmojis();
    sendResponse({ emojis: discordEmojis.map((img) => img.src) });
  }
});
