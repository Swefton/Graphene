import React, { useEffect, useState, useRef } from "react";
import ForceGraph2D from "react-force-graph-2d";

const App = () => {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const fgRef = useRef();

  useEffect(() => {
    chrome.storage.local.get("graph", (result) => {
      if (result.graph) {
        setGraphData(result.graph);
      }
    });
  }, []);

  // TODO: open new tab with another react instance.
  // https://stackoverflow.com/questions/78044861/new-tab-on-chrome-extension-using-vitereact
  // Stackover discussion on the same issue I have
  const openGraphInNewTab = () => {
    window.open("fullpage.html", "_blank");
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
    <div
      style={{
        width: "500px",
        height: "500px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#1f1d2e",
        color: "white",
        padding: "10px",
        boxSizing: "border-box",
      }}
    >
      <h1 style={{ margin: "5px 0" }}>Browsing Graph</h1>
      <div style={{ flex: 1, width: "100%" }}>
        <ForceGraph2D
          graphData={graphData}
          height={400} // Adjusted height to fit in the box
          width={480} // Slightly smaller than container width
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
      <div
      style={{
        display: "flex",
        gap: "10px",
      }}>
      <button
        style={{
          display: "block",
          marginTop: "10px",
          padding: "8px 15px",
          backgroundColor: "#ff4081",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={openGraphInNewTab}
      >
        Open Graph
      </button>
      <button
        style={{
          display: "block",
          marginTop: "10px",
          padding: "8px 15px",
          backgroundColor: "#ff4081",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={clearGraphData}
      >
        Clear Nodes
      </button>
      </div>
    </div>
  );
};

export default App;
