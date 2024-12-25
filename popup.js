document.addEventListener("DOMContentLoaded", () => {
  const apiKeyInput = document.getElementById("apiKeyInput");
  const saveApiKeyButton = document.getElementById("saveApiKey");

  //   chrome.storage.local.get("geminiApiKey", (data) => {
  //     if (data.geminiApiKey) {
  //       apiKeyInput.value = data.geminiApiKey;
  //     }
  //   });

  saveApiKeyButton.addEventListener("click", () => {
    const apiKey = apiKeyInput.value.trim();
    if (apiKey) {
      chrome.storage.local.set({ geminiApiKey: apiKey }, () => {
        alert("API Key saved successfully!");
      });
    } else {
      alert("Please enter a valid API Key.");
    }
  });
});
