import React, { useEffect, useState, useRef } from "react";
import ForceGraph2D from "react-force-graph-2d";
import './graph.css'

function handleNodeClick(node) {
  if (node?.url) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];
      if (currentTab?.id) {
        // Set the tab to the node's URL
        chrome.tabs.update(currentTab.id, { url: node.url });
      }
    });
  }
}

const Graph= () => {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const fgRef = useRef();

  useEffect(() => {
    chrome.storage.local.get("graph", (result) => {
      if (result.graph) {
        setGraphData(result.graph);
      }
    });
  }, []);

  const openGraphInNewTab = () => {
    chrome.tabs.create({ url: chrome.runtime.getURL("fullpage.html") });
  };

  // Function to clear graph data
  const clearGraphData = () => {
    chrome.runtime.sendMessage({ action: "deleteGraphData" }, () => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
        return;
      }

      // Clear the local state as well
      setGraphData({ nodes: [], links: [] });
      console.log("Graph data cleared");
    });
  };

  return (
    <div id="main">
      <h1 style={{ margin: "5px 0" }}>Browsing Graph</h1>
      <div style={{ flex: 1, width: "100%" }}>
        <ForceGraph2D
          graphData={graphData}
          height={400} 
          width={480} 
          backgroundColor="#1f1d2e"
          ref={fgRef}
          nodeAutoColorBy="id"
          linkColor={() => "pink"}
          linkDirectionalArrowColor={() => "pink"}
          linkDirectionalArrowLength={5}
          linkDirectionalArrowRelPos={1}
          nodeLabel={(node) => node.name}
          onNodeClick={handleNodeClick}
          nodeVal = {5}
          nodeCanvasObject={(node, ctx) => {
            const label = node.name;
            const fontSize = 8;
            ctx.font = `${fontSize}px Sans-Serif`;
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(label, node.x, node.y);
          }}
        />
      </div>
      <div id="buttondiv">
        <button onClick={openGraphInNewTab}> Open Graph </button>
        <button onClick={clearGraphData}> Clear Nodes </button>
      </div>
    </div>
  );
};

export default Graph;
