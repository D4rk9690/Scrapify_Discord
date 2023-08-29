function displayEmojis(emojis) {
  const emojiContainer = document.getElementById("emoji-container");
  emojiContainer.innerHTML = "";

  emojis.forEach((emojiURL, index) => {
    const imgElement = document.createElement("img");
    imgElement.src = emojiURL;
    imgElement.addEventListener("click", () => {
      copyToClipboard(emojiURL);
      window.close();
    });



    const emojiWrapper = document.createElement("div");
    emojiWrapper.appendChild(imgElement);


    // Create a row container for each group of 6 emojis
    if (index % 6 === 0) {
      const rowContainer = document.createElement("div");
      rowContainer.classList.add("row-container");
      emojiContainer.appendChild(rowContainer);
    }

    // Append the emoji and its name to the current row container
    const rowContainers = emojiContainer.getElementsByClassName("row-container");
    const currentRowContainer = rowContainers[rowContainers.length - 1];
    currentRowContainer.appendChild(emojiWrapper);
  });
}



// Rest of the code remains the same...

function copyToClipboard(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

chrome.runtime.sendMessage({ action: "getDiscordEmojis" }, function (response) {
  displayEmojis(response.emojis);
});
