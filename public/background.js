const tabHistory = {};
let currentNode = null;

// Node Class 
class Node {
  constructor(url, name, tabId) {
    this.id = `${url}_${tabId}`; 
    this.name = name;
    this.url = url;
    this.tabId = tabId;
  }
}

// Function to update the graph in storage
function updateGraph(tabId, currentUrl, tabTitle) {
  const nodeId = `${currentUrl}_${tabId}`; 

  chrome.storage.local.get(["graph"], (data) => {
    let graphData = data.graph || { nodes: [], links: [] };

    // Add the node if it doesn't already exist
    if (!graphData.nodes.find((node) => node.id === nodeId)) {
      graphData.nodes.push(new Node(currentUrl, tabTitle || currentUrl, tabId));
    }

    // Only add a link if both source and target nodes exist
    const sourceNodeId = tabHistory[tabId];
    if (
      sourceNodeId &&
      sourceNodeId !== nodeId &&
      graphData.nodes.find((node) => node.id === sourceNodeId) &&
      graphData.nodes.find((node) => node.id === nodeId)
    ) {
      graphData.links.push({
        source: sourceNodeId,
        target: nodeId,
      });
    }

    // Update tab history
    tabHistory[tabId] = nodeId;
    currentNode = graphData.nodes.find((node) => node.id === nodeId);

    // Store updated graph in Chrome storage
    chrome.storage.local.set({ graph: graphData }, () => {
      console.log("Updated graph data stored in chrome.storage.local.");
      console.log(currentNode.id)
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

  if (message.action === "getCurrentNode") {
    sendResponse({ currentNode });
    return true;
  }

});

// Listen for tab updates and handle URL changes
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url) {
    updateGraph(tabId, tab.url, tab.title);
  }
});
