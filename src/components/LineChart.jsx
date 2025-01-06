import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const LineChart = ({ nodes }) => {
  if (!nodes || nodes.length === 0) {
    return <div>No data available</div>;
  }

  const labels = nodes.map(node => node.data?.label || 'Unknown');
  const executionTimes = nodes.map(node => {
    const execTime = parseFloat(node.data?.executionTime); 
    return isNaN(execTime) ? 0 : execTime;
  });

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Execution Time',
        data: executionTimes,
        fill: false,
        borderColor: '#34ad63',
        backgroundColor: '#34ad63',
        borderWidth: 2,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Execution Time per Node',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `Execution Time: ${context.raw}s`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <>
    <div className="w-full h-96 mt-28 ">
    <h2 className="text-2xl text-left mt-12 font-bold">
        Line Chart
      </h2>
      <p className="text-gray-600 text-lg italic">
      Execution time across connected nodes in the workflow
        </p>
      <Line className='bg-gray-100' data={data} options={options} />
    </div>
    </>
  );
};

export default LineChart;
