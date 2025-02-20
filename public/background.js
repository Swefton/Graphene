chrome.tabs.onCreated.addListener((tab) => {
    console.log("New tab opened:", tab);
  });
  
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url) {
      console.log("User navigated to:", changeInfo.url);
    }
  });
  