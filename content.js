// async function fetchApiKey() {
//   try {
//     GEMINI_API_KEY = await getApiKey();
//     return GEMINI_API_KEY;
//   } catch (error) {
//     console.log(error);
//   }
// }

// function getApiKey() {
//   return new Promise((resolve, reject) => {
//     chrome.storage.local.get("geminiApiKey", (data) => {
//       if (data.geminiApiKey) {
//         resolve(data.geminiApiKey);
//       } else {
//         reject("No API Key found");
//       }
//     });
//   });
// }

// let currentPath = "";

// function handlePageChange() {
//   const newPath = window.location.pathname;

//   if (newPath !== currentPath) {
//     console.log("Page changed");

//     currentPath = newPath;
//     const chatbox = document.getElementById("AiChatbox");
//     if (chatbox) {
//       chatbox.remove();
//     }

//     if (
//       currentPath.includes("/problems/") &&
//       currentPath.length > "/problems/".length
//     ) {
//       const buttonExists = document.querySelector("#AiHelpButton");

//       setTimeout(() => {
//         if (!buttonExists) {
//           addAiHelpButton();
//         }
//       }, 500);
//     }
//   } else {
//     const buttonExists = document.querySelector("#AiHelpButton");

//     if (buttonExists) {
//       buttonExists.addEventListener("click", () => {
//         addAiChatBox();
//       });
//     }
//     // fetchApiKey();
//     // console.log(GEMINI_API_KEY);
//   }
// }

// setInterval(handlePageChange, 50);

let GEMINI_API_KEY = null;

chrome.storage.local.get("geminiApiKey", (result) => {
  if (result.geminiApiKey) {
    GEMINI_API_KEY = result.geminiApiKey;
    console.log("Initial GEMINI_API_KEY:", GEMINI_API_KEY);
  } else {
    console.log("No GEMINI_API_KEY found in chrome.storage.");
  }
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  console.log(changes);

  if (namespace === "local" && changes.geminiApiKey) {
    GEMINI_API_KEY = changes.geminiApiKey.newValue;
  }
  console.log(GEMINI_API_KEY);
});
console.log(GEMINI_API_KEY);

let currentUrl = "";

function onUrlChange(newUrl) {
  console.log("URL changed to:", newUrl);
  const chatbox = document.getElementById("AiChatbox");
  if (chatbox) {
    chatbox.remove();
  }

  if (newUrl.includes("/problems/") && newUrl.length > "/problems/".length) {
    const buttonExists = document.querySelector("#AiHelpButton");
    console.log(buttonExists);
    setTimeout(() => {
      if (!buttonExists) {
        addAiHelpButton();
      }
    }, 500);
  }
}

const observer = new MutationObserver(() => {
  const newUrl = window.location.href;
  if (newUrl !== currentUrl) {
    currentUrl = newUrl;
    onUrlChange(newUrl);
  }
});

observer.observe(document.body, { childList: true, subtree: true });

function addAiHelpButton() {
  const adjEl = document.getElementsByClassName(
    "coding_nav_bg__HRkIn p-2 nav nav-pills w-100"
  )[0].firstElementChild;

  const newListItem = document.createElement("li");
  newListItem.className =
    "d-flex flex-row rounded-3 dmsans align-items-center coding_list__V__ZOZ";
  newListItem.style.padding = "0.36rem 1rem";
  newListItem.style.cursor = "pointer";
  newListItem.style.fontFamily = "DM Sans, sans-serif";

  newListItem.id = "AiHelpButton";

  const aiIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  aiIcon.setAttribute("width", "20");
  aiIcon.setAttribute("height", "20");
  aiIcon.setAttribute("viewBox", "0 0 400 400");
  aiIcon.setAttribute("fill", "none");
  aiIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  aiIcon.innerHTML = `
      <path d="M97.8357 54.6682C177.199 59.5311 213.038 52.9891 238.043 52.9891C261.298 52.9891 272.24 129.465 262.683 152.048C253.672 173.341 100.331 174.196 93.1919 165.763C84.9363 156.008 89.7095 115.275 89.7095 101.301" stroke="#000000" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M98.3318 190.694C-10.6597 291.485 121.25 273.498 148.233 295.083" stroke="#000000" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M98.3301 190.694C99.7917 213.702 101.164 265.697 100.263 272.898" stroke="#000000" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M208.308 136.239C208.308 131.959 208.308 127.678 208.308 123.396" stroke="#000000" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M177.299 137.271C177.035 133.883 177.3 126.121 177.3 123.396" stroke="#000000" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M203.398 241.72C352.097 239.921 374.881 226.73 312.524 341.851" stroke="#000000" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M285.55 345.448C196.81 341.85 136.851 374.229 178.223 264.504" stroke="#000000" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M180.018 345.448C160.77 331.385 139.302 320.213 120.658 304.675" stroke="#000000" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M218.395 190.156C219.024 205.562 219.594 220.898 219.594 236.324" stroke="#000000" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M218.395 190.156C225.896 202.037 232.97 209.77 241.777 230.327" stroke="#000000" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M80.1174 119.041C75.5996 120.222 71.0489 119.99 66.4414 120.41" stroke="#000000" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M59.5935 109.469C59.6539 117.756 59.5918 125.915 58.9102 134.086" stroke="#000000" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M277.741 115.622C281.155 115.268 284.589 114.823 287.997 114.255" stroke="#000000" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M291.412 104.682C292.382 110.109 292.095 115.612 292.095 121.093" stroke="#000000" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M225.768 116.466C203.362 113.993 181.657 115.175 160.124 118.568" stroke="#000000" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
    `;

  newListItem.appendChild(aiIcon);
  newListItem.innerHTML += `AI`;

  adjEl.insertAdjacentElement("beforeend", newListItem);
  adjEl.addEventListener("click", () => {
    addAiChatBox();
  });
}

function addAiChatBox() {
  const LineToRemove = document.getElementsByClassName(
    "gutter gutter-vertical"
  )[0];
  LineToRemove.style.visibility = "hidden";

  let existingChatbox = document.getElementById("AiChatbox");
  if (existingChatbox) {
    if (existingChatbox.style.display === "none") {
      existingChatbox.style.display = "block";
      existingChatbox.style.display = "flex";
      existingChatbox.style.flexDirection = "column";
      existingChatbox.style.overflow = "hidden";
    }
    return;
  }

  const chatbox = document.createElement("div");
  chatbox.id = "AiChatbox";
  chatbox.style.position = "fixed";
  chatbox.style.bottom = "20px";
  chatbox.style.right = "20px";
  chatbox.style.width = "350px";
  chatbox.style.height = "450px";
  chatbox.style.backgroundColor = "white";
  chatbox.style.border = "1px solid rgba(0, 0, 0, 0.2)";
  chatbox.style.borderRadius = "10px";
  chatbox.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
  chatbox.style.display = "flex";
  chatbox.style.flexDirection = "column";
  chatbox.style.overflow = "hidden";

  chatbox.innerHTML = `
    <div style="padding: 10px; background: #005c83; color: white; font-weight: bold; border-radius: 10px 10px 0 0; class: chatBoxHeading">
      AI Chatbox
      <span style="float: right; cursor: pointer;" id="closeChatbox">X</span>
    </div>
    <div id="chatMessages" style="flex-grow: 1; overflow-y: auto; padding: 10px; background-color: #f4f4f4;"></div>
    <div style="padding: 10px; background: #005c83; border-top: 1px solid #ccc;">
      <div style="display: flex;">
        <input type="text" id="chatInput" placeholder="Ask your Doubt" style="flex: 1; padding: 5px; border: 1px solid #005c83; border-radius: 5px;">
        <button id="sendChat" style="margin-left: 5px; padding: 5px 10px; background: #4d5d6f; color: white; border: none; border-radius: 5px;">Send</button>
      </div>
    </div>
  `;

  document.body.appendChild(chatbox);

  document.getElementById("closeChatbox").addEventListener("click", () => {
    chatbox.style.display = "none";
    LineToRemove.style.visibility = "visible";
  });

  document.getElementById("sendChat").addEventListener("click", () => {
    handleSendMessages();
  });
}

async function handleSendMessages() {
  const chatInput = document.getElementById("chatInput");
  const chatMessages = document.getElementById("chatMessages");

  if (chatInput.value.trim()) {
    const userMessage = document.createElement("div");
    userMessage.textContent = `You: ${chatInput.value}`;
    userMessage.style.margin = "5px 0";
    userMessage.style.padding = "5px";
    userMessage.style.backgroundColor = "#e8f0fe";
    userMessage.style.borderRadius = "5px";
    chatMessages.appendChild(userMessage);

    const userInput = chatInput.value;
    chatInput.value = "";
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: userInput }],
              },
            ],
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(response.status);

        console.log(data);

        const aiResponse = data.candidates[0].content.parts[0].text;

        const aiMessage = document.createElement("div");
        aiMessage.textContent = `AI: ${aiResponse}`;
        aiMessage.style.margin = "5px 0";
        aiMessage.style.padding = "5px";
        aiMessage.style.backgroundColor = "#f1f8e9";
        aiMessage.style.borderRadius = "5px";
        chatMessages.appendChild(aiMessage);
      } else {
        throw new Error("Failed to fetch AI response.");
      }
    } catch (error) {
      const errorMessage = document.createElement("div");
      errorMessage.textContent =
        "AI: Sorry, something went wrong. Set the Correct API Key.";
      errorMessage.style.margin = "5px 0";
      errorMessage.style.padding = "5px";
      errorMessage.style.backgroundColor = "#ffebee";
      errorMessage.style.borderRadius = "5px";
      chatMessages.appendChild(errorMessage);
    }

    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
}
