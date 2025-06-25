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

  const newColorScheme = [
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "#ffa600"
  ];

  const colorScale = d3.scaleOrdinal(newColorScheme);

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
      backgroundColor="#121212"
      // backgroundColor="white"
      ref={fgRef}
      linkColor={() => "white"}
      linkDirectionalArrowColor={() => "white"}
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
