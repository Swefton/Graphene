// src/components/2d-graph.jsx
import React, { useRef } from "react";
import ForceGraph2D from "react-force-graph-2d";
import './2d-graph.css';

const Simple2DGraph = ({ graphData, currentNodeId, width = 480, height = 400 }) => {
  const fgRef = useRef();

  const handleNodeClick = (node) => {
    if (node?.url) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentTab = tabs[0];
        if (currentTab?.id) {
          chrome.tabs.update(currentTab.id, { url: node.url });
        }
      });
    }
  };

  return (
    <ForceGraph2D
      graphData={graphData}
      width={width}
      height={height}
      backgroundColor="#1f1d2e"
      ref={fgRef}
      nodeAutoColorBy="tabId"
      nodeColor={(node) =>
        node.id === currentNodeId ? "red" : "blue"
      }
      linkColor={() => "pink"}
      linkDirectionalArrowColor={() => "pink"}
      linkDirectionalArrowLength={5}
      linkDirectionalArrowRelPos={1}
      nodeLabel={(node) => node.name}
      nodeVal={5}
      onNodeClick={handleNodeClick}
      nodeCanvasObjectMode={() => "after"}
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
  );
};

export default Simple2DGraph;
