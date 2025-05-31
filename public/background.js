/// All windows, each window holds
// Graph of the window
// Current tab open in the window
// open tabIds in the window

class Window {
  constructor(graph, curr, openTabs) {
    this.graph = graph
    this.curr = curr
    this.openTabs = openTabs
  }
}

chrome.windows.onFocusChanged.addListener((windowId) => {
  console.log("Window Focus Changed")
  console.log(windowId)
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