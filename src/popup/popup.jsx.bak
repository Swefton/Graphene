import React, { useEffect, useState } from "react";
import Simple2DGraph from "../components/2d-graph"; 
import './popup.css';

const Popup = () => {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [currentNodeId, setCurrentNodeId] = useState(null);

  useEffect(() => {
    chrome.storage.local.get("graph", (result) => {
      if (result.graph) {
        setGraphData(result.graph);
      }
    });

    chrome.runtime.sendMessage({ action: "getCurrentNode" }, (response) => {
      if (chrome.runtime.lastError) {
        console.error("Error getting current node:", chrome.runtime.lastError.message);
        return;
      }

      if (response?.currentNode?.id) {
        setCurrentNodeId(response.currentNode.id);
      }
    });
  }, []);

  const openGraphInNewTab = () => {
    chrome.tabs.create({ url: chrome.runtime.getURL("fullpage.html") });
  };

  const clearGraphData = () => {
    chrome.runtime.sendMessage({ action: "deleteGraphData" }, () => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
        return;
      }
      setGraphData({ nodes: [], links: [] });
      console.log("Graph data cleared");
    });
  };

  return (
    <div id="main">
      <h1 style={{ margin: "5px 0" }}>Browsing Graph</h1>
      <div style={{ flex: 1, width: "100%" }}>
        <Simple2DGraph
          graphData={graphData}
          currentNodeId={currentNodeId}
          width={480}
          height={400}
        />
      </div>
      <div id="buttondiv">
        <button onClick={openGraphInNewTab}>Open Graph</button>
        <button onClick={clearGraphData}>Clear Nodes</button>
      </div>
    </div>
  );
};

export default Popup;
