import React, { useEffect, useState } from "react";
import Simple2DGraph from "../components/2d-graph";
import "./fullpage.css"

const Fullpage = () => {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [currentNodeId, setCurrentNodeId] = useState(null);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    chrome.windows.getCurrent({ populate: false }, (win) => {
      const windowId = win.id;

      // Now fetch the stored data for this window from chrome.storage
      chrome.storage.local.get("windows", (result) => {
        const windowData = result.windows?.[windowId];
        if (windowData && windowData.graph) {
          setGraphData(windowData.graph);
          if (windowData.curr?.id) {
            setCurrentNodeId(windowData.curr.id);
          }
        } else {
          console.warn(`No graph data found for window ${windowId}`);
        }
      });
    });

    // Resize listener
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const clearGraphData = () => {
    chrome.runtime.sendMessage({ action: "deleteGraphData" }, () => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
        return;
      }
      setGraphData({ nodes: [], links: [] });
      setCurrentNodeId(null);
    });
  };

  return (
    <div id="main">
      <h1>Browsing Graph</h1>
      <div className="graph-container-fullpage">
        <Simple2DGraph
          graphData={graphData}
          currentNodeId={currentNodeId}
          width={dimensions.width}
          height={dimensions.height * 0.85} // Or 1.0 if full screen
        />
      </div>
      <div id="buttondiv">
        <button onClick={clearGraphData}>Clear Nodes</button>
      </div>
    </div>
  );
};

export default Fullpage;
