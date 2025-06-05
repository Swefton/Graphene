import React, { useRef, useEffect } from "react";
import ForceGraph2D from "react-force-graph-2d";
import * as d3 from "d3";
import "./2d-graph.css";

const Simple2DGraph = ({ graphData, currentNodeId, width = 480, height = 400 }) => {
  const fgRef = useRef();

  useEffect(() => {
    if (fgRef.current) {
      fgRef.current.d3Force('charge').strength(-50);
    }
  }, []);

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
      nodeCanvasObject={(node, ctx, globalScale) => {
        const label = node.name;
        const fontSize = 12 / globalScale;

        const fadeStart = 1.3;
        const fadeEnd = 0.7;

        const opacity =
          globalScale > fadeStart
            ? 1
            : globalScale < fadeEnd
              ? 0
              : (globalScale - fadeEnd) / (fadeStart - fadeEnd);

        if (opacity === 0) return;
        ctx.font = `${fontSize}px Sans-Serif`;
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(label, node.x, node.y);
      }}
    />
  );
};

export default Simple2DGraph;
