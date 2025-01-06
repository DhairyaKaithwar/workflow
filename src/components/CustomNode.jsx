// import React from "react";

// const CustomNode = ({ data, id, selected, setNodes }) => {
//   const handleChange = (key, value) => {
//     setNodes((nodes) =>
//       nodes.map((node) =>
//         node.id === id ? { ...node, data: { ...node.data, [key]: value } } : node
//       )
//     );
//   };

//   return (
//     <div
//       className={`p-4 rounded-lg shadow-lg ${
//         selected ? "border-2 border-blue-500" : "border border-gray-300"
//       }`}
//       style={{ background: data.color || "#fff" }}
//     >
//       <div className="mb-2 font-bold text-center">{data.type || "Node"}</div>
//       <div className="flex flex-col space-y-2">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Name:</label>
//           <input
//             type="text"
//             value={data.name}
//             onChange={(e) => handleChange("name", e.target.value)}
//             className="w-full p-1 border rounded"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Execution Time:
//           </label>
//           <input
//             type="number"
//             value={data.executionTime}
//             onChange={(e) => handleChange("executionTime", e.target.value)}
//             className="w-full p-1 border rounded"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomNode;
