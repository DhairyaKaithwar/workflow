import React, { useCallback, useEffect, useState } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
  Background,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import Analytics from "./Analytics";

const nodeTypes = {
  start: { label: "Start Node", color: "#34ad63" },
  task: { label: "Task Node", color: "#329cd9" },
  decision: { label: "Decision Node", color: "#f7c965" },
  end: { label: "End Node", color: "#d43535" },
};

const FlowExample = ({ onAddNode }) => {
  // Initialize nodes and edges from localStorage, or use empty arrays
  const savedNodes = JSON.parse(localStorage.getItem("nodes")) || [];
  const savedEdges = JSON.parse(localStorage.getItem("edges")) || [];
  const [nodes, setNodes, onNodesChange] = useNodesState(savedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(savedEdges);

  const [editingNodeId, setEditingNodeId] = useState(null);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge({ ...params, markerEnd: { type: "arrowclosed" } }, eds)
      ),
    [setEdges]
  );

  const onEdgeDelete = useCallback(
    (deletedEdges) => {
      setEdges((eds) => eds.filter((edge) => !deletedEdges.includes(edge)));
    },
    [setEdges]
  );

  const addNode = useCallback(
    (type = "task") => {
      const { label, color } = nodeTypes[type];
      const id = (nodes.length + 1).toString();
      const newNode = {
        id,
        position: { x: Math.random() * 500, y: Math.random() * 500 },
        data: { label, type, executionTime: "0" },
        style: {
          background: color,
          color: "white",
          padding: "10px",
          borderRadius: "20px",
          width: "200px",
        },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [nodes, setNodes]
  );

  const updateNodeProperties = useCallback(
    (id, updates) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === id
            ? {
                ...node,
                data: { ...node.data, ...updates },
                style: updates.type
                  ? {
                      ...node.style,
                      background: nodeTypes[updates.type].color,
                    }
                  : node.style,
              }
            : node
        )
      );
    },
    [setNodes]
  );

  const deleteNode = useCallback(
    (id) => {
      setNodes((nds) => nds.filter((node) => node.id !== id));
      setEditingNodeId(null);
    },
    [setNodes]
  );

  const NodeWithEditableProperties = ({ id, data }) => {
    const [label, setLabel] = useState(data.label);
    const [executionTime, setExecutionTime] = useState(data.executionTime || "");
    const [type, setType] = useState(data.type || "task");

    const handleSave = () => {
      if (!label || !executionTime) {
        alert("Label and Execution Time are required!");
        return;
      }
      updateNodeProperties(id, { label, executionTime, type });
      setEditingNodeId(null);
    };

    const handleCancel = () => setEditingNodeId(null);

    if (editingNodeId === id) {
      return (
        <div className="p-2 bg-white shadow-lg rounded-md text-gray-800">
          <div>
            <label className="block text-sm font-medium">Label:</label>
            <input
              className="w-full p-1 border rounded mb-2"
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Node Type:</label>
            <select
              className="w-full p-1 border rounded mb-2"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              {Object.entries(nodeTypes).map(([key, { label }]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Execution Time:</label>
            <input
              className="w-full p-1 border rounded mb-2"
              type="number"
              value={executionTime}
              onChange={(e) => setExecutionTime(e.target.value)}
            />
          </div>
          <div className="flex justify-between">
            <button
              className="px-2 py-1 bg-green-500 text-white rounded-xl"
              onClick={handleSave}
            >
              Apply
            </button>
            <button
              className="px-2 py-1 bg-gray-500 text-white rounded-xl"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="px-2 py-1 bg-red-500 text-white rounded-xl"
              onClick={() => deleteNode(id)}
            >
              Delete
            </button>
          </div>
        </div>
      );
    }

    return (
      <div
        onClick={() => setEditingNodeId(id)}
        className={`cursor-pointer ${
          editingNodeId === id ? "border border-blue-500" : ""
        }`}
      >
        <div className="font-bold">{data.label}</div>
        <span className="font-light absolute bg-slate-200 text-gray-700 ml-2 border border-stone-700 px-1 rounded-full text-xs tracking-tighter">
          Execution: {data.executionTime || "0"}
        </span>
      </div>
    );
  };

  // Save workflow to localStorage
  const saveWorkflow = () => {
    localStorage.setItem("nodes", JSON.stringify(nodes));
    localStorage.setItem("edges", JSON.stringify(edges));
    alert("Workflow saved successfully!");
  };

  // Restore workflow from localStorage
  useEffect(() => {
    const storedNodes = JSON.parse(localStorage.getItem("nodes"));
    const storedEdges = JSON.parse(localStorage.getItem("edges"));

    if (storedNodes) setNodes(storedNodes);
    if (storedEdges) setEdges(storedEdges);
  }, [setNodes, setEdges]);

  //Download the data
  const downloadWorkflow = () => {
    const workflowData = {
      nodes,
      edges,
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(workflowData, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.href = dataStr;
    downloadAnchor.download = "workflow.json";
    downloadAnchor.click();
  };
  
  //Restore workFlow
  const restoreWorkflow = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const workflowData = JSON.parse(e.target.result);
          if (workflowData.nodes && workflowData.edges) {
            setNodes(workflowData.nodes);
            setEdges(workflowData.edges);
            alert("Workflow restored successfully!");
          } else {
            alert("Invalid workflow file format!");
          }
        } catch (error) {
          alert("Error reading the workflow file: " + error.message);
        }
      };
      reader.readAsText(file);
    }
  };
  

  useEffect(() => {
    if (onAddNode) {
      onAddNode(addNode);
    }
  }, [addNode, onAddNode]);

  return (
    <div>
      <div className=" flex flex-row bg-slate-300 rounded-lg fixed z-50 top-3 right-2 shadow-gray-500 text-sm">
        <button
          onClick={saveWorkflow}
          className=" shadow-sm  px-2 py-1"
        >
          Save Workflow
        </button>
        <button
          onClick={downloadWorkflow}
          className="  border-x border-black  shadow-sm  px-2 py-1"
        >
          Download Data
        </button>
        <div>
          <input
            type="file"
            accept=".json"
            id="fileInput"
            className="hidden"
            onChange={restoreWorkflow}
          />
          <button
            onClick={() => document.getElementById("fileInput").click()}
            className="    shadow-sm  px-2 py-1"
          >
            Restore Data
          </button>
        </div>

      </div>
      <div className="flex items-center justify-center w-full h-screen bg-gray-100 ">
        <div className="w-full h-full bg-white shadow-lg rounded-lg">
          <ReactFlow
            nodes={nodes.map((node) => ({
              ...node,
              data: {
                ...node.data,
                label: (
                  <NodeWithEditableProperties id={node.id} data={node.data} />
                ),
              },
            }))}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            defaultEdgeOptions={{
              style: { strokeWidth: 2 },
            }}
            onEdgesDelete={onEdgeDelete}
          >
            <Controls />
            <MiniMap />
            <Background variant="dots" gap={12} size={1} />
          </ReactFlow>
        </div>
      </div>
      <Analytics nodes={nodes} />
    </div>
  );
};

export default FlowExample;
