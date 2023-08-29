// background.js
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "getDiscordEmojis") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "getDiscordEmojis" },
        function (response) {
          sendResponse({ emojis: response ? response.emojis : [] });
        }
      );
    });
  }
  return true; // To indicate that the response will be sent asynchronously
});
