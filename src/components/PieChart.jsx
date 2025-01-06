import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ nodes }) => {
  const nodeTypes = nodes.map(node => node.data.label);
  const executionTimes = nodes.map(node => parseFloat(node.data.executionTime));

  const aggregatedData = nodeTypes.reduce((acc, label, index) => {
    if (acc[label]) {
      acc[label] += executionTimes[index];
    } else {
      acc[label] = executionTimes[index];
    }
    return acc;
  }, {});

  const labels = Object.keys(aggregatedData);
  const data = Object.values(aggregatedData);

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: ['#34ad63', '#ff9b00', '#ff3b30'],
        borderColor: ['#34ad63', '#ff9b00', '#ff3b30'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.label}: ${context.raw} seconds`;
          },
        },
      },
    },
  };

  return (
    <>
    <div className="w-full h-96 mt-28 ">
    <h2 className="text-2xl text-left mt-12 font-bold">
        Pie Chart
      </h2>
      <p className="text-gray-600 text-lg italic">
      distribution of execution times by node type
        </p>
      <Pie className='bg-gray-100 w-full ' data={chartData} options={options} />
    </div>
    </>
  );
};

export default PieChart;
