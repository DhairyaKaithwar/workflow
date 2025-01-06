
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ nodes }) => {

  const labels = nodes.map(node => node.data.label);
  const executionTimes = nodes.map(node => parseFloat(node.data.executionTime)); 

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Execution Time ',
        data: executionTimes,
        backgroundColor: '#34ad63', 
        borderColor: '#34ad63', 
        borderWidth: 1, 
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
    
    <div className="w-full h-96 ">
    <h2 className="text-2xl text-left mt-12  font-bold">
              Bar Chart
            </h2>
            <p className="text-gray-600 text-lg italic">
            Execution time for each node
        </p>
      <Bar className='bg-gray-100 ' data={data} options={options} />
    </div>
    </>
  );
};

export default BarChart;
