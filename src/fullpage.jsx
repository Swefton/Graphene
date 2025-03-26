import React, { useEffect, useState, useRef } from "react";
import ForceGraph2D from "react-force-graph-2d";

const FullPageGraph = () => {
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
    <div style={{ width: "100vw", height: "100vh", backgroundColor: "#1f1d2e" }}>
      <ForceGraph2D
        graphData={graphData}
        height={window.innerHeight}
        width={window.innerWidth}
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
          const fontSize = 12;
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

export default FullPageGraph;

// ReactDOM rendering should happen outside the functional component:
import ReactDOM from 'react-dom/client';

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(<FullPageGraph />);
