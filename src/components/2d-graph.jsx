import React, { useRef } from "react";
import ForceGraph2D from "react-force-graph-2d";
import * as d3 from "d3";
import './2d-graph.css';

const Simple2DGraph = ({ graphData, currentNodeId, width = 480, height = 400 }) => {
  const fgRef = useRef();

  const extendedRosePineColors = [
    "#eb6f92",
    "#f6c177",
    "#ebbcba",
    "#31748f",
    "#9ccfd8",
    "#c4a7e7",
    "#21202e",
    "#403d52",
    "#524f67",
    "#b18fa6" 
  ];

  const colorScale = d3.scaleOrdinal(extendedRosePineColors);

  const updatedGraphData = {
    ...graphData,
    nodes: graphData.nodes.map((node) => ({
      ...node,
      color: node.id === currentNodeId
        ? "red"
        : colorScale(node.tabId ?? "default")
    }))
  };

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
      graphData={updatedGraphData}
      width={width}
      height={height}
      backgroundColor="#1f1d2e"
      ref={fgRef}
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
