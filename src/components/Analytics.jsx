// Analytics.js
import React from 'react';
import BarChart from './BarChart';
import LineChart from './LineChart';
import PieChart from './PieChart';

const Analytics = ({ nodes }) => {
  if (!nodes || nodes.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div className="analytics-container flex flex-col items-center mx-auto w-full max-w-4xl ">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight  pt-14">
        Analytics
      </h1>
        <p className="text-gray-600 text-lg italic">
            Visual representation of workflow data
        </p>
      
      <BarChart  nodes={nodes} />
      <LineChart nodes={nodes} />
      <PieChart nodes={nodes} />
    </div>
  );
};

export default Analytics;
