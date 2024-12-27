chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { type, uniqueId, chat } = message;

  if (type === "storeChat") {
    chrome.storage.local.get(uniqueId, (result) => {
      let chats = result[uniqueId] || [];
      chats.push(chat);

      chrome.storage.local.set({ [uniqueId]: chats }, () => {
        if (chrome.runtime.lastError) {
          console.log("Error saving chat:", chrome.runtime.lastError.message);
          sendResponse({
            success: false,
            error: chrome.runtime.lastError.message,
          });
        } else {

          sendResponse({ success: true });
        }
      });
    });
    return true;
  }

  if (type === "getChats") {
    chrome.storage.local.get(uniqueId, (result) => {
      const chats = result[uniqueId] || [];
      sendResponse({ success: true, chats });
    });
    return true;
  }
});
