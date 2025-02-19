import React, { useEffect, useRef } from "react";
import ForceGraph2D from 'react-force-graph-2d';

const App = () => {
  const fgRef = useRef();

  const data = {
    nodes: [
      { id: "Node1", name: "Google" },
      { id: "Node2", name: "YouTube" },
      { id: "Node3", name: "Facebook" },
      { id: "Node4", name: "Twitter" },
      { id: "Node5", name: "LinkedIn" }
    ],
    links: [
      { source: "Node1", target: "Node2" },
      { source: "Node2", target: "Node3" },
      { source: "Node3", target: "Node4" },
      { source: "Node4", target: "Node5" },
      { source: "Node5", target: "Node1" }
    ]
  };

  useEffect(() => {
    if (fgRef.current) {
      fgRef.current.d3Force("charge").strength(-300);
    }
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <h1>Hello World</h1>
      <ForceGraph2D
        ref={fgRef}
        backgroundColor="#1f1d2e"
        graphData={data}
        width={400} // Set explicit width
        height={400} // Set explicit height
        nodeAutoColorBy="id"
        linkDirectionalArrowLength={5}
        linkDirectionalArrowRelPos={1}
        nodeLabel={(node) => node.name}
        nodeCanvasObject={(node, ctx) => {
          const label = node.name;
          const fontSize = 12;
          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.fillStyle = "black";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(label, node.x, node.y + 10);
        }}
      />
    </div>
  );
  
};

export default App;
