const tabGraph = {}; // Stores tab relationships

chrome.tabs.onCreated.addListener((tab) => {
  if (tab.openerTabId) {
    // If the tab was opened from another tab, record the relationship
    chrome.tabs.get(tab.openerTabId, (openerTab) => {
      if (openerTab && openerTab.url) {
        tabGraph[tab.id] = {
          from: openerTab.url, // Source node
          to: tab.pendingUrl || tab.url || "New Tab", // Destination node
          createdAt: Date.now(), // Timestamp for tracking
        };
        console.log("New tab relationship:", tabGraph[tab.id]);
      }
    });
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    if (tabId in tabGraph) {
      // Update the destination URL if it changed
      tabGraph[tabId].to = changeInfo.url;
      console.log("Updated tab navigation:", tabGraph[tabId]);
    } else {
      // If the tab was already open, just track navigation
      tabGraph[tabId] = {
        from: "Unknown", // No opener, treat it as a new session
        to: changeInfo.url,
        createdAt: Date.now(),
      };
      console.log("Navigation without opener:", tabGraph[tabId]);
    }
  }
});
