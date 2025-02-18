chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.url) {
        chrome.storage.local.get({ visitedSites: [] }, (data) => {
            let visitedSites = data.visitedSites;
            if (!visitedSites.includes(tab.url)) {
                visitedSites.push(tab.url);
                chrome.storage.local.set({ visitedSites });
            }
        });
    }
});
