let GEMINI_API_KEY = null;
let currentUrl = "";
let hints = "";
const clearIconUrl = chrome.runtime.getURL("assets/clearConversation.png");

chrome.storage.local.get("geminiApiKey", (result) => {
  if (result.geminiApiKey) {
    GEMINI_API_KEY = result.geminiApiKey;
  } else {
    console.log("No GEMINI_API_KEY found in chrome.storage.");
  }
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === "local" && changes.geminiApiKey) {
    GEMINI_API_KEY = changes.geminiApiKey.newValue;
  }
});

function onUrlChange(newUrl) {
  const chatbox = document.getElementById("AiChatbox");
  if (chatbox) {
    chatbox.remove();
  }

  if (newUrl.includes("/problems/") && newUrl.length > "/problems/".length) {
    console.log("New URL:", newUrl);

    injectScript();

    const LineToRemove = document.getElementsByClassName(
      "gutter gutter-vertical"
    )[0];
    if (LineToRemove) LineToRemove.style.visibility = "visible";

    const buttonExists = document.querySelector("#AiHelpButton");
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

function getLastIdFromUrl(url) {
  const match = url.match(/-(\d+)(?=\?)/);

  return match ? match[1] : null;
}

function injectScript() {
  const script = document.createElement("script");
  script.src = chrome.runtime.getURL("inject.js");
  document.documentElement.appendChild(script);
}

window.addEventListener("xhrDataFetched", (event) => {
  const data = event.detail;

  if (
    data.url &&
    data.url.match(/https:\/\/api2\.maang\.in\/problems\/user\/\d+/)
  ) {
    const idMatch = data.url.match(/\/(\d+)$/);

    if (idMatch) {
      const id = idMatch[1];

      if (id === getLastIdFromUrl(window.location.href)) {
        const parsedData = JSON.parse(data.response);

        hints = fecthAllFromProblemDetails(parsedData);
      }
    }
  }
});

function addAiHelpButton() {
  const adjEl = document.getElementsByClassName(
    "coding_nav_bg__HRkIn p-2 nav nav-pills w-100"
  )[0].firstElementChild;

  const newListItem = document.createElement("li");
  newListItem.className =
    "d-flex flex-row rounded-3 dmsans align-items-center coding_list__V__ZOZ apnaAiButton";
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

  if (adjEl) adjEl.insertAdjacentElement("beforeend", newListItem);

  newListItem.addEventListener("click", () => {
    addAiChatBox();
  });
}

function addAiChatBox() {
  const LineToRemove = document.getElementsByClassName(
    "gutter gutter-vertical"
  )[0];
  if (LineToRemove) LineToRemove.style.visibility = "hidden";

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
  chatbox.style.resize = "both";
  chatbox.style.overflow = "auto";

  chatbox.innerHTML = `
  <div style="padding: 10px; background: #005c83; color: white; font-weight: bold; border-radius: 10px 10px 0 0; class: chatBoxHeading">
    AI Chatbox
    <span style="float: right; display: flex; align-items: center;">
      <span style="cursor: pointer; margin-right: 10px;" id="clearConversation">
        <img src="${clearIconUrl}" style="width: 20px; height: 20px;" alt="Clear Conversation" />
      </span>
      <span style="cursor: pointer;" id="closeChatbox">X</span>
    </span>
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

  let uniqueId = window.location.pathname.split("/")[2];
  restorePrevChats(uniqueId);

  clearConversation();

  document.getElementById("closeChatbox").addEventListener("click", () => {
    chatbox.style.display = "none";
    LineToRemove.style.visibility = "visible";
  });

  document.getElementById("sendChat").addEventListener("click", () => {
    handleSendMessages();
  });
}

function clearConversation() {
  document.getElementById("clearConversation").addEventListener("click", () => {
    let uniqueId = window.location.pathname.split("/")[2];

    chrome.runtime.sendMessage(
      { type: "clearConversation", uniqueId },
      (response) => {
        if (response && response.success) {
          document.getElementById("chatMessages").innerHTML = "";
          console.log("Conversation cleared successfully!");
        } else {
          console.error("Failed to clear conversation:", response.error);
        }
      }
    );
  });
}

function fetchCodeFromLocalStorage(problemId) {
  const searchKeySuffix = `${problemId}_C++14`;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.endsWith(searchKeySuffix)) {
      return localStorage.getItem(key);
    }
  }
  return "No code found for the specified problem ID.";
}

function markdownToPlainText(markdownText) {
  markdownText = markdownText.replace(/\r/g, "");

  markdownText = markdownText.replace(/```[\s\S]*?```/g, "");

  markdownText = markdownText.replace(/`[^`]*`/g, "");

  markdownText = markdownText.replace(/^#{1,6}\s?/gm, "");

  markdownText = markdownText.replace(/^\s*[-*+]\s/gm, "");

  markdownText = markdownText.replace(/!\[.*?\]\(.*?\)/g, "");

  markdownText = markdownText.replace(/\[.*?\]\((.*?)\)/g, "$1");

  markdownText = markdownText.replace(/^[-*]{3,}/gm, "\n");

  markdownText = markdownText.replace(/^\s*>+\s?/gm, "");

  markdownText = markdownText.replace(/\*\*|__|\*|_/g, "");

  markdownText = markdownText.replace(/\s+/g, " ").trim();

  markdownText = markdownText.replace(/\\n/g, "\n");

  return markdownText;
}

function fecthAllFromProblemDetails(details) {
  data = details.data;

  let formattedHints = "Hints:\n";
  if (data.hints.hint1) {
    formattedHints += `1. ${data.hints.hint1.replace(
      /\*\*(.*?)\*\*/g,
      "<b>$1</b>"
    )}\n`;
  }
  if (data.hints.hint2 && data.hints.hint2.trim() !== "") {
    formattedHints += `2. ${data.hints.hint2.replace(
      /\*\*(.*?)\*\*/g,
      "<b>$1</b>"
    )}\n`;
  } else {
    formattedHints += "2. No additional hints available.\n";
  }

  const solutionApproach =
    data.hints.solution_approach || "No solution approach provided.";
  const formattedSolutionApproach = `Solution Approach:\n${solutionApproach
    .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
    .replace(/\\[a-z]+|(\$\$?)/g, "")
    .replace(/\n/g, " ")}\n`;

  const editorialCode = data.editorial_code && data.editorial_code[0];
  const codeLanguage = editorialCode?.language || "Unknown language";
  const code = editorialCode?.code || "No code available.";
  const formattedCode = `Editorial Code (${codeLanguage}):\n${code
    .replace(/```[a-zA-Z]*\n/g, "")
    .replace(/```/g, "")
    .trim()}\n`;

  return `${formattedHints}\n${formattedSolutionApproach}\n${formattedCode}`;
}

async function handleSendMessages() {
  const probDesc = fetchProblemDescription();

  const pid = getLastIdFromUrl(window.location.href);
  const myCode = fetchCodeFromLocalStorage(pid);
  const myCodeFormatted = markdownToPlainText(myCode);
  // console.log(myCodeFormatted);

  const chatInput = document.getElementById("chatInput");
  const chatMessages = document.getElementById("chatMessages");

  if (chatInput.value.trim()) {
    const userInput = chatInput.value;

    const userMessage = document.createElement("div");
    userMessage.innerHTML = formatResponse(`You: ${userInput}`);
    userMessage.style.margin = "5px 0";
    userMessage.style.padding = "5px";
    userMessage.style.backgroundColor = "#e8f0fe";
    userMessage.style.borderRadius = "5px";
    userMessage.style.whiteSpace = "pre-wrap";
    userMessage.style.border = "1px solid #ccc";
    if (chatMessages) chatMessages.appendChild(userMessage);

    let uniqueId = window.location.pathname.split("/")[2];
    storeCurrentChats(uniqueId, `You: ${userInput}`);

    chatInput.value = "";

    try {
      chrome.storage.local.get([uniqueId], async (storedChats) => {
        const previousChats = storedChats[uniqueId] || [];

        let str =
          "These are the previous conversations. Retain them in your memory so that the user doesn't have to repeat the context each time, and ensure your responses reflect that you are aware of all prior interactions. Below, I'll provide the problem description.\n";

        let probDescStr =
          "The problem description above is the context you need to keep in memory for the problem related questions only\n";

        let hintDesc =
          'Ensure that you always retain the problem description, hints, solution approaches, and codes provided, as these are crucial for responding accurately to the user\'s queries. Your responses should always reflect the context from previous interactions, and you should never ask the user to repeat information already given. If the user asks a question unrelated to the problem, immediately inform them that their query is irrelevant to the current issue and avoid responding to it. Always respond directly to the user\'s question while keeping the relevant problem context and the previous conversation in memory. If the user asks for a solution, first offer hints to guide them toward a self-solved answer, encouraging them to try the problem independently and if the user has already asked for the hint or you have already provided user the hint, you should provide with the code and you have to keep the previous conversations in the mind. Maintain an interactive and educational approach, focusing on helping the user learn. Throughout the conversation, keep everything centered around the problem and avoid deviating from it. While you can acknowledge greetings like "Hello" or "Hi," ensure that the conversation stays focused on the problem description without straying into unrelated topics.\n Also, user doesnt know that these all above information has been provided to you as a prompt to help the user in a better way.\n. So, please make sure to keep the conversation as natural as possible and not to reveal that you have access to the problem description, hints, solution approaches, and codes provided.\n You should just reply to the users query  which is provided below in a natural and fresh way.';

        let codeStr =
          'When the user asks for debugging help, you will refer to the code they have written in their editor. You will avoid directly mentioning that You have access to the user\'s provided code, and instead focus on offering solutions based on what\'s visible in the editor. If there are any issues or areas that can be improved, You should point them out without explicitly stating "Provided Code." instead you should state "code that you have written in the editor". You should present potential fixes or suggestions for improving the code based on the user\'s query. The goal is to assist the user without revealing that you have access to additional hints or solutions for the problem. That is just provided for your understanding and help the user to make them understand in a simple approach.\n';

        previousChats.push(`${str}`);

        previousChats.push(`${probDesc}`);
        previousChats.push(`${probDescStr}`);

        previousChats.push(`${myCodeFormatted}`);
        previousChats.push(`${codeStr}`);

        previousChats.push(`${hints}`);
        previousChats.push(`${hintDesc}`);

        previousChats.push(`${userInput}`);

        const combinedContext = previousChats.join("\n");
        // console.log(combinedContext);

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
                  parts: [{ text: combinedContext }],
                },
              ],
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();

          const aiResponse = data.candidates[0].content.parts[0].text;

          storeCurrentChats(uniqueId, `AI: ${aiResponse}`);

          const aiMessage = document.createElement("div");
          aiMessage.innerHTML = formatResponse(`AI: ${aiResponse}`);
          aiMessage.style.margin = "5px 0";
          aiMessage.style.padding = "10px";
          aiMessage.style.backgroundColor = "#f1f8e9";
          aiMessage.style.borderRadius = "5px";
          aiMessage.style.whiteSpace = "pre-wrap";
          aiMessage.style.border = "1px solid #ccc";
          if (chatMessages) chatMessages.appendChild(aiMessage);
        } else {
          const errorMessage = document.createElement("div");
          errorMessage.textContent =
            "AI: Sorry, something went wrong. Set the Correct API Key.";
          errorMessage.style.margin = "5px 0";
          errorMessage.style.padding = "5px";
          errorMessage.style.backgroundColor = "#ffebee";
          errorMessage.style.borderRadius = "5px";
          errorMessage.style.whiteSpace = "pre-wrap";
          errorMessage.style.border = "1px solid #ccc";
          if (chatMessages) chatMessages.appendChild(errorMessage);
        }
      });
    } catch (error) {
      const errorMessage = document.createElement("div");
      errorMessage.textContent =
        "AI: Sorry, something went wrong. Set the Correct API Key.";
      errorMessage.style.margin = "5px 0";
      errorMessage.style.padding = "5px";
      errorMessage.style.backgroundColor = "#ffebee";
      errorMessage.style.borderRadius = "5px";
      errorMessage.style.whiteSpace = "pre-wrap";
      errorMessage.style.border = "1px solid #ccc";
      if (chatMessages) chatMessages.appendChild(errorMessage);
    }
  }
}

function fetchProblemDescription() {
  const probDescEl = document.getElementsByClassName(
    "py-4 px-3 coding_desc_container__gdB9M"
  )[0];
  if (!probDescEl)
    return "You can fetch the problem description from the previous chats if any.";
  const probDesc = probDescEl.children[1];
  if (!probDesc)
    return "You can fetch the problem description from the previous chats if any.";
  const probDescText = probDesc.textContent.trim();
  const probDescFormatted = formatProblemDescription(probDescText);
  return probDescFormatted;
}

function formatProblemDescription(text) {
  let cleanedText = text.replace(/\\n/g, "\n");
  cleanedText = cleanedText.replace(/\\textbf{[^}]+}/g, "");

  cleanedText = cleanedText.replace(/\s+/g, " ").trim();

  return cleanedText;
}

function formatResponse(response) {
  let formatted = response;
  if (response.includes("```")) {
    formatted = formatted.replace(
      /```([^`]+)```/g,
      "<pre><code>$1</code></pre>"
    );
  }

  formatted = formatted.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
  formatted = formatted.replace(/\n/g, "<br>");

  return formatted;
}

function restorePrevChats(uniqueId) {
  chrome.runtime.sendMessage({ type: "getChats", uniqueId }, (response) => {
    if (chrome.runtime.lastError) {
      console.log("Error retrieving chats:", chrome.runtime.lastError.message);
      return;
    }

    if (response.success) {
      const chatMessages = document.getElementById("chatMessages");

      response.chats.forEach((chat) => {
        const chatMessage = document.createElement("div");
        chatMessage.innerHTML = formatResponse(chat);
        chatMessage.style.margin = "5px 0";
        chatMessage.style.padding = "5px";
        chatMessage.style.backgroundColor = chat.includes("AI:")
          ? "#f1f8e9"
          : "#e8f0fe";
        chatMessage.style.borderRadius = "5px";
        chatMessage.style.whiteSpace = "pre-wrap";
        chatMessage.style.border = "1px solid #ccc";

        if (chatMessages) chatMessages.appendChild(chatMessage);
      });
    } else {
      console.log("Failed to retrieve chats:", response.error);
    }
  });
}

function storeCurrentChats(uniqueId, input) {
  chrome.runtime.sendMessage(
    { type: "storeChat", uniqueId, chat: input },
    (response) => {
      if (chrome.runtime.lastError) {
        console.log("Error storing chat:", chrome.runtime.lastError.message);
        return;
      }

      if (!response.success) {
        console.log("Failed to store chat:", response.error);
      }
    }
  );
}
