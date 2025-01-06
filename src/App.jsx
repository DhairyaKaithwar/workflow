import React, { useRef } from "react";
import FlowExample from "./components/FlowExample";
import Sidebar2 from "./components/Sidebar2";
import Analytics from "./components/Analytics";

function App() {
  const addNodeRef = useRef(null); // Ref to hold the addNode function

  const handleSetAddNode = (addNodeFn) => {
    addNodeRef.current = addNodeFn; 
  };

  return (
    <>
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64">
        <Sidebar2 addNode={(type, label, color) => {
          if (addNodeRef.current) {
            addNodeRef.current(type, label, color); // Call addNode from ref
          }
        }} />
      </div>

      {/* Canvas */}
      <div className="flex-grow">
        <FlowExample onAddNode={handleSetAddNode} />
      </div>
    </div>
    
    </>
  );
}

export default App;
