const graphData = {
  nodes: [],
  links: [],
};

const tabHistory = {}; 

// nodes created from new tabs should be tagged
// curr nod should be tagged
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
class Node {
    constructor(url, name, tabId, isCurr) {
      this.id = `${url}_${tabId}`; // Unique identifier based on URL and tabId
      this.url = url;
      this.name = name;
      this.tabId = tabId;
      this.isCurr = isCurr;
    }
  }

// on url/tab change
// if new tab: create edge from curr node to node with new url
// if tab exists: create edge from curr node to node with new url
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.url) {
      const currentUrl = tab.url;
      const nodeId = `${currentUrl}_${tabId}`; // Unique per tab
  
      // Check if node already exists, else create it
      if (!graphData.nodes.find(node => node.id === nodeId)) {
        graphData.nodes.push(new Node(currentUrl, tab.title || currentUrl, tabId, true));
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
      console.log("finished with logic")
    }
    else {
        console.log("finished without logic")
    }
  });

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "GET_GRAPH") {
    sendResponse(graphData);
  }
});

// Example code that generates a random graph for inspection with local storage
// TODO: dyanmically update and sync chrome local storage
function genRandomTree(N = 300, reverse = false) {
  return {
    nodes: [...Array(N).keys()].map(i => ({ id: i })),
    links: [...Array(N).keys()]
      .filter(id => id)
      .map(id => ({
        [reverse ? "target" : "source"]: id,
        [reverse ? "source" : "target"]: Math.round(Math.random() * (id - 1))
      }))
  };
}

// Generate the graph and store it in Chrome local storage
const RANDOM_EXAMPLE = genRandomTree(100); // Example: 100 nodes

chrome.storage.local.set({ graph: RANDOM_EXAMPLE }, () => {
  console.log("Graph data stored in chrome.storage.local.");
});
