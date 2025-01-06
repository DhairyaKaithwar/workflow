import React, { useState } from "react";

const nodeTypes = {
  start: { label: "Start Node", color: "#34ad63" },
  task: { label: "Task Node", color: "#329cd9" },
  decision: { label: "Decision Node", color: "#f7c965" },
  end: { label: "End Node", color: "#d43535" },
};

const Sidebar2 = ({ addNode, nodes }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isReadmeOpen, setIsReadmeOpen] = useState(false); 

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const scrollHalfPageDown = () => {
    window.scrollBy({
      top: window.innerHeight / 2,
      behavior: "smooth",
    });
  };

  const toggleReadme = () => {
    setIsReadmeOpen(!isReadmeOpen); 
  };

  return (
    <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-50 text-gray-800">
      <div className="fixed flex flex-col top-0 left-0 w-64 bg-white h-full border-r">
        <div className="flex items-center justify-center h-14 border-b">
          <div className="font-bold text-gray-600 text-xl">WorkFlow Management</div>
        </div>
        <div className="overflow-y-auto overflow-x-hidden flex-grow">
          <ul className="flex flex-col pb-4 space-y-1">
            {/* Create Node */}
            <li className="py-2 bg-slate-100">
              <div
                className="flex flex-row items-center h-8 px-2 py-2 w-full cursor-pointer"
                onClick={toggleDropdown}
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                <div className="text-sm font-bold tracking-wide text-gray-800">
                  Create Node
                </div>
              </div>
              <ul className="bg-gray-50 shadow-lg rounded-md mt-2">
                {Object.entries(nodeTypes).map(([key, { label, color }]) => (
                  <li
                    key={key}
                    className="flex flex-row items-center p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => addNode(key, label, color)}
                  >
                    <span
                      className="inline-block w-4 h-4 rounded-full mr-2"
                      style={{ backgroundColor: color }}
                    ></span>
                    <span className="text-sm font-medium text-gray-800">
                      {label}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Go to Analytics */}
              <div
                className="flex flex-row items-center h-8 px-2 py-2 mt-3 mb-2 w-full cursor-pointer"
                onClick={scrollHalfPageDown}
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                <div className="text-sm font-bold tracking-wide text-gray-800 py-4">
                  Go to Analytics
                </div>
              </div>
            </li>
          </ul>
        </div>
        
        {/* ReadMe Button */}
        <div className="flex items-center justify-center h-14 border-t">
          
        <button
          className="absolute bottom-4 mx-auto px-2 py-1 bg-sky-600 text-white tracking-tighter text-sm rounded-xl"
          onClick={toggleReadme}
          >
          ReadMe before you start
        </button>
        
          </div>
      </div>

      {/* README Section */}
      {isReadmeOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 w-96 rounded-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">README</h2>
            <p>
            <b>
                1: To add a node:
              </b>
              <br />
              -Just click on the type of node you want to add to the canvas.
              <br />
              <b>
                2: To connect nodes:
              </b>
              <br />
              -Click on the circle on the bottom circle of the node and drag it to the top circle of the node you want to connect it to.
              <br />
              <b>
                3: To edit a node:
              </b>
              <br />
              - click on the node to edit the properties, you can also delete nodes from edit section. 
              <br />
              <b>
                4: Analytics section:
              </b>
              - Click on the "Go to Analytics" button to see the analytics of the workflow.
              <b><br />
                5: To get analytics: **Important**
              </b>
              - You cant get analytics until you have atleast 1 node on the canvas, and add execution time to see the charts.
            </p>
            <button
              className="mt-4 py-1 px-4 bg-red-800 text-white font-sm rounded-2xl"
              onClick={toggleReadme}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar2;
