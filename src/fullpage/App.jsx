import React, { useEffect, useState, useRef } from "react";
import ForceGraph2D from "react-force-graph-2d";
import './App.css'

const Graph= () => {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const fgRef = useRef();

  // Dynamically fetch window height and width to resize the react-force-graph
  // since it doesn't respect CSS rules
  const [displayWidth, setDisplayWidth] = useState(window.innerWidth);
  const [displayHeight, setDisplayHeight] = useState(window.innerHeight);

  useEffect(() => {
    chrome.storage.local.get("graph", (result) => {
      if (result.graph) {
        setGraphData(result.graph);
      }
    });
  }, []);

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
      <h1>Browsing Graph</h1>
      <div className="graph-container"> 
        <ForceGraph2D
          graphData={graphData}
          width={displayWidth}
          height={displayHeight * 0.8}
          backgroundColor="#1f1d2e"
          ref={fgRef}
          nodeAutoColorBy="id"
          linkColor={() => "pink"}
          linkDirectionalArrowColor={() => "pink"}
          linkDirectionalArrowLength={5}
          linkDirectionalArrowRelPos={1}
          nodeLabel={(node) => node.name}
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
        <button onClick={clearGraphData}> Clear Nodes </button>
      </div>
    </div>
  );
};

export default Graph;
