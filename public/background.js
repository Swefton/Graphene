/// All windows, each window holds
// Graph of the window
// Current tab open in the window
// open tabIds in the window

class Window {
  constructor() {
    this.graph = {nodes: [], links: []}
    this.nodeMap = {} // nodeId -> Node
    this.openTabs = {} // tabId  -> Node
    this.curr = null // node
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

function addLink(window, tab) {
  const { url, title: name, id: tabId, openerTabId } = tab;

  const nodeId = `${url}_${tabId}`;
  const nodeMap = window.nodeMap;
  const graph = window.graph;
  const openTabs = window.openTabs;

  let accessedNode;

  // Add new node if not already in the graph
  if (!nodeMap.hasOwnProperty(nodeId)) {
    accessedNode = new Node(url, name, tabId);
    graph.nodes.push(accessedNode);
    nodeMap[nodeId] = accessedNode;
  } else {
    accessedNode = nodeMap[nodeId];
  }

  // If there's an opener tab, try to create a link from it
  if (openerTabId != null && openerTabId in openTabs) {
    const sourceNode = nodeMap[openTabs[openerTabId]];
    const targetNode = accessedNode;

    // Avoid duplicate links
    const linkExists = graph.links.some(link =>
      link.source === sourceNode.id && link.target === targetNode.id
    );

    if (!linkExists) {
      graph.links.push({
        source: sourceNode.id,
        target: targetNode.id
      });
    }
  } else if (tabId in openTabs) {
    const sourceNode = nodeMap[openTabs[tabId]]
    const targetNode = accessedNode

    const linkExists = graph.links.some(link =>
      link.source === sourceNode.id && link.target === targetNode.id
    );

    if (!linkExists) {
      graph.links.push({
        source: sourceNode.id,
        target: targetNode.id
      });
    }
  }

  // Update openTabs and curr
  openTabs[tabId] = nodeId;
  if (tab.active) {
    window.curr = accessedNode;
  }
  return window;
}

function updatedCurrentNode(win, tabId) {
  const node = win.openTabs[tabId];
  if (node) {
    win.curr = node;
  }
}

/// Window focus changed
chrome.windows.onFocusChanged.addListener((windowId) => {
  let windowsData;
  chrome.storage.local.get(["windows"], (data) => {
    windowsData = data.windows || {};
    if (windowId !== -1 && !(windowId in windowsData)) {
      windowsData[windowId] = new Window()
      chrome.storage.local.set({windows: windowsData})
    }
  })
})

/// Window removed
chrome.windows.onRemoved.addListener((windowId) => {
  chrome.storage.local.get(["windows"], (data) => {
    let windowsData = data.windows || {};
    if (windowId in windowsData) {
      delete windowsData[windowId];
      chrome.storage.local.set({ windows: windowsData }, () => {
      });
    }
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url) {
    chrome.storage.local.get(["windows"], (data) => {
      let windowsData = data.windows || {};
      let win = windowsData[tab.windowId];

      if (!win) {
        win = new Window();
        windowsData[tab.windowId] = win;
      }
      
      const updatedWin = addLink(win, tab);
      windowsData[tab.windowId] = updatedWin;

      chrome.storage.local.set({ windows: windowsData });
    });
  }
});


chrome.tabs.onActivated.addListener((activeInfo) => {
  const { tabId, windowId } = activeInfo;

  chrome.storage.local.get(["windows"], (data) => {
    let windowsData = data.windows || {};
    const win = windowsData[windowId];

    if (win) {
      updatedCurrentNode(win, tabId);
      windowsData[windowId] = win;
      chrome.storage.local.set({ windows: windowsData });
    }
  });
});

// Listeners for calls from front end
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "deleteGraphData") {
    chrome.storage.local.clear(() => {
      console.log("Local Storage Cleared.");
    });
    sendResponse({ success: true });
    return true; 
  }

  if (message.action === "getWindowsData") {
    chrome.storage.local.get("windows", (result) => {
      sendResponse({ success: true, data: result.windows || null });
    });
    return true;
  }
});
