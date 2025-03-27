const tabHistory = {};

// Define a class for Nodes
class Node {
  constructor(url, name, tabId, isCurr) {
    this.id = `${url}_${tabId}`; // Unique identifier based on URL and tabId
    this.url = url;
    this.name = name;
    this.tabId = tabId;
    this.isCurr = isCurr;
  }
}

// Function to update the graph in storage
function updateGraph(tabId, currentUrl, tabTitle) {
  const nodeId = `${currentUrl}_${tabId}`; // Unique per tab

  chrome.storage.local.get(["graph"], (data) => {
    let graphData = data.graph || { nodes: [], links: [] };

    // Check if node already exists, else create it
    if (!graphData.nodes.find((node) => node.id === nodeId)) {
      graphData.nodes.push(new Node(currentUrl, tabTitle || currentUrl, tabId, true));
    }

    // If the tab had a previous URL, create an edge from it to the new URL in the same tab
    if (tabHistory[tabId] && tabHistory[tabId] !== nodeId) {
      graphData.links.push({
        source: tabHistory[tabId],
        target: nodeId,
      });
    }

    // Update tab history
    tabHistory[tabId] = nodeId;

    // Store updated graph in Chrome storage
    chrome.storage.local.set({ graph: graphData }, () => {
      console.log("Updated graph data stored in chrome.storage.local.");
    });
  });
}

function clearStorage() {
  let graphData = { nodes: [], links: [] };
  chrome.storage.local.set({ graph: graphData }, () => {
    console.log("Graph Cleared");
  });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "deleteGraphData") {
    clearStorage();
    sendResponse({ success: true });
    return true; 
  }
});

// Listen for tab updates and handle URL changes
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url) {
    updateGraph(tabId, tab.url, tab.title);
  }
});
