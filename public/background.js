const newTabs = new Set();

chrome.tabs.onCreated.addListener((tab) => {
  console.log("New tab opened:", tab);
  newTabs.add(tab.id);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    if (newTabs.has(tabId)) {
      newTabs.delete(tabId); 
    } else {
      console.log("User navigated to:", changeInfo.url);
    }
  }
});

chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    console.log("Current Tab: ", activeInfo.tabId)
  });
});