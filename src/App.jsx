import React, { useEffect, useState, useRef } from "react";
import ForceGraph2D from 'react-force-graph-2d';

const App = () => {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const fgRef = useRef();

  useEffect(() => {
    if (chrome.runtime?.sendMessage) {
      chrome.runtime.sendMessage({ type: "GET_GRAPH" }, (response) => {
        if (response) {
          setGraphData(response);
        }
      });
    }
  }, []); 

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <h1>Browsing Graph</h1>
      <ForceGraph2D
        graphData={graphData}
        height={600}
        width={400}
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
  );
};

export default App;
