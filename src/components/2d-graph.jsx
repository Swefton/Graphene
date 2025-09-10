/* global chrome */
import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
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
      ref={fgRef}
      linkColor={() => "white"}
      linkDirectionalArrowColor={() => "white"}
      linkDirectionalArrowLength={5}
      linkDirectionalArrowRelPos={1}
      nodeLabel={(node) => node.name}
      nodeRelSize={3}
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

        // Calculate node radius the same way the library does
        // nodeVal={5} and nodeRelSize={3} in your props
        const nodeVal = 5; // Your constant value
        const nodeRelSize = 3; // Your nodeRelSize prop
        const nodeRadius = (Math.sqrt(nodeVal) * nodeRelSize) * 1.25;
        
        // Position text below the node with consistent spacing
        const textOffset = nodeRadius + fontSize * 0.3;
        
        ctx.font = `${fontSize}px Sans-Serif`;
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(label, node.x, node.y + textOffset);
      }}
    />
  );
};

Simple2DGraph.propTypes = {
  graphData: PropTypes.object.isRequired,
  currentNodeId: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
}

export default Simple2DGraph;
