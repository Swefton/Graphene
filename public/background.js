const graphData = {
  nodes: [],
  links: [],
};

const tabHistory = {}; 

/// nodes created from new tabs should be tagged
/// curr nod should be tagged

// on url/tab change
// if new tab: create edge from curr node to node with new url
// if tab exists: create edge from curr node to node with new url


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    const currentUrl = changeInfo.url;
    
    if (!graphData.nodes.find(node => node.id === currentUrl)) {
      graphData.nodes.push({ id: currentUrl, name: currentUrl });
    }

    if (tabHistory[tabId] && tabHistory[tabId] !== currentUrl) {
      graphData.links.push({
        source: tabHistory[tabId],
        target: currentUrl,
      });
    }

    tabHistory[tabId] = currentUrl;
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "GET_GRAPH") {
    sendResponse(graphData);
  }
});
