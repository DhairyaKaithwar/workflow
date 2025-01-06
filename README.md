# Project Workflow

## Overview
This project is a dynamic and interactive workflow editor that allows you to create, manage, and analyze nodes on an infinite canvas. The application provides the following features:

### Key Features
1. **Dynamic Node Creation**:
   - Nodes can be created dynamically with properties such as:
     - Node Label
     - Node Type
     - Execution Time

2. **Infinite Canvas**:
   - The canvas allows unrestricted movement and placement of nodes, making it suitable for large workflows.

3. **Node Connections**:
   - Connect nodes using edges to represent relationships or workflows.

4. **Node Properties and Customization**:
   - Assign specific colors to nodes based on their type.
   - Node properties can be updated dynamically.

5. **Persistence and Data Management**:
   - Data is saved in the browser's local storage to persist on reload.
   - Workflows can be downloaded in JSON format for backup or sharing.
   - Previously saved workflows can be restored by uploading the JSON file.

### Analytics Section
- Provides visual representation of node data:
  - **Bar Graph**: Displays execution times for nodes.
  - **Line Chart**: Tracks execution time trends across nodes.
  - **Pie Chart**: Illustrates the distribution of execution times by node type.

### Additional Functionalities
- **Node Color Assignment**:
  - Every node type has an associated color for easy identification.
- **Interactive Controls**:
  - Modify node properties directly on the canvas.
  - Download and upload workflow configurations.

## Usage
1. Start by adding nodes dynamically via the sidebar.
2. Connect nodes to create a meaningful workflow.
3. Update node properties (label, type, and execution time) as needed.
4. Use the analytics section to visualize the workflow data.
5. Save your work locally or export it as a JSON file for later use.
6. Restore saved workflows from the JSON file if needed.


