/// All windows, each window holds
// Graph of the window
// Current tab open in the window
// open tabIds in the window

class Window {
  constructor() {
    this.graph = {nodes: [], links: []}
    this.nodeSet = new Set()
    this.openTabs = {}
    this.curr = null 
  }
}

// Node Class 
class Node {
  constructor(url, name, tabId) {
    this.id = `${url}_${tabId}`; 
    this.tabId = tabId;
    this.url = url;
    this.name = name;
  }
}

function addLink(window, node) {
  nodeSet = window.nodeSet;
  graph = window.graph;
  openTabs = window.openTabs;
  curr = window.curr;

  if (!nodeSet.has(node)){
    graph.nodes.push(node)
    nodeSet.add(node)
  }

  sourceNodeId = openTabs[curr.tabId]
  if (sourceNodeId !== node.id && 
    !graph.links.find({source: node.id, target: sourceNodeId})
  ) {
    graph.links.push({
      source: sourceNodeId,
      target: node.id
    });
  }

  openTabs[node.tabId] = node.id;
}

chrome.windows.onFocusChanged.addListener((windowId) => {
  console.log("Window Focus Changed")
  console.log(windowId)
  chrome.storage.local.get(["windows"], (data) => {
    let windowsData = data.windows || {};
    if (windowId !== -1 && !(windowId in windowsData)) {
      windowsData[windowId] = new Window()
      chrome.storage.local.set({windows: windowsData})
      console.log(`Saved window ${windowId}:`);
      console.log(windowsData[windowId])
    }
  })
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url) {
    console.log("Tab Updated")
    console.log(tabId, changeInfo, tab)
  }
})

chrome.tabs.onActivated.addListener((activeInfo) => {
  console.log("Tab Activated")
  console.log(activeInfo)
})

// Listeners for calls from front end
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "deleteGraphData") {
    chrome.storage.local.clear(() => {
      console.log("Local Storage Cleared.")
    })
    sendResponse({ success: true });
    return true; 
  }
});
