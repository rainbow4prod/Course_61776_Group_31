// src/components/Home.js
import React, { useState, useEffect, useRef } from 'react';
import NavBar from './NavBar';
import ThemeToggle from './ThemeToggle';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const Home = () => {
  const [chartType, setChartType] = useState('bar');
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const chartCanvas = chartRef.current.getContext('2d');
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    chartInstance.current = new Chart(chartCanvas, {
      type: chartType,
      data: {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [{
          label: 'Dataset 1',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          data: [10, 20, 30, 40, 50]
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            labels: {
              //color: 'rgba(255, 255, 255, 0.8)' // Adjust text color for dark mode
            }
          }
        }
      }
    });
  }, [chartType]);

  return (
    <>
      <NavBar />
      <ThemeToggle />
      <main className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-4">Data Visualization</h2>
        <div className="mb-4">
          <label htmlFor="data-type" className="block text-sm font-medium">Select Data Presentation Type:</label>
          <select
            id="data-type"
            className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 bg-transparent focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            onChange={(e) => setChartType(e.target.value)}
          >
            <option value="bar" className="text-black">Bar Chart</option>
            <option value="line" className="text-black">Line Chart</option>
            <option value="pie" className="text-black">Pie Chart</option>
          </select>
        </div>
        <div id="chart-container" className="bg-transparent p-4 shadow-md rounded-md">
          <canvas ref={chartRef} id="chart"/>
        </div>
      </main>
      <footer className="bg-gray-800 p-4 text-white mt-8">
        <div className="container mx-auto text-center">
          &copy; 2024 Braudana. All rights reserved.
        </div>
      </footer>
    </>
  );
};

export default Home;
