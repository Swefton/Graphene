import React, { useEffect, useState } from "react";
import Simple2DGraph from "../components/2d-graph";
import "./fullpage.css"

const Fullpage = () => {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [currentNodeId, setCurrentNodeId] = useState(null);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

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

    // Resize listener
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const clearGraphData = () => {
    chrome.runtime.sendMessage({ action: "deleteGraphData" }, () => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
        return;
      }
      setGraphData({ nodes: [], links: [] });
      setCurrentNodeId(null);
    });
  };

  return (
    <div id="main">
      <h1>Browsing Graph</h1>
      <Simple2DGraph
        graphData={graphData}
        currentNodeId={currentNodeId}
        width={dimensions.width}
        height={dimensions.height * 0.8} // Or 1.0 if full screen
      />
      <div id="buttondiv">
        <button onClick={clearGraphData}>Clear Nodes</button>
      </div>
    </div>
  );
};

export default Fullpage;
