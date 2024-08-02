import React, { useState, useEffect, useRef } from 'react';
import NavBar from './NavBar';
import { Chart, registerables } from 'chart.js';
import { FaUpload } from 'react-icons/fa'; // Import Font Awesome upload icon

Chart.register(...registerables);

const Home = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [chartType, setChartType] = useState('');
  const [data, setData] = useState(null);
  const [fields, setFields] = useState({ xField: '', yField: '' });
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const updateTheme = () => {
      const newTheme = localStorage.getItem('theme') || 'light';
      setTheme(newTheme);
    };

    window.addEventListener('themechange', updateTheme);

    return () => window.removeEventListener('themechange', updateTheme);
  }, [theme]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const jsonData = JSON.parse(reader.result);
      setData(jsonData);
      const keys = Object.keys(jsonData[0]);
      setFields({ xField: keys[0], yField: keys[1] });
    };
    reader.readAsText(file);
  };

  const handleFieldSelection = (axis, value) => {
    setFields(prevFields => ({
      ...prevFields,
      [axis]: value,
    }));
  };

  const handleBack = () => {
    setChartType('');
    setFields({ xField: Object.keys(data[0])[0], yField: Object.keys(data[0])[1] });
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
  };

  const getRandomColors = (count) => {
    return Array.from({ length: count }, () => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`);
  };

  useEffect(() => {
    if (data && fields.xField && fields.yField && chartType) {
      const chartCanvas = chartRef.current.getContext('2d');
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const colors = getRandomColors(data.length);

      chartInstance.current = new Chart(chartCanvas, {
        type: chartType,
        data: {
          labels: data.map(item => item[fields.xField]),
          datasets: [{
            label: fields.yField,
            backgroundColor: chartType === 'bar' || chartType === 'pie' ? colors : 'rgba(255, 99, 132, 0.2)',
            borderColor: chartType === 'bar' || chartType === 'pie' ? colors.map(color => color.replace('0.5', '1')) : 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            data: data.map(item => item[fields.yField])
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: chartType === 'pie',
              position: 'bottom',
              labels: {
                color: theme === 'dark' ? 'white' : 'black'
              }
            },
            tooltip: {
              callbacks: {
                label: (context) => `${fields.yField}: ${context.raw}`
              }
            }
          },
          scales: chartType !== 'pie' ? {
            x: {
              ticks: {
                color: theme === 'dark' ? 'white' : 'black'
              },
              grid: {
                color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
              }
            },
            y: {
              beginAtZero: true,
              ticks: {
                color: theme === 'dark' ? 'white' : 'black'
              },
              grid: {
                color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
              }
            }
          } : {}
        }
      });
    }
  }, [data, fields, chartType, theme]);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow container mx-auto py-8">
        {!data ? (
          <div className="flex flex-col items-center justify-center h-full">
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
            <button
              onClick={() => fileInputRef.current.click()}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-12 rounded-lg text-xl flex items-center justify-center space-x-2"
              style={{ transform: 'scale(1.5)' }}
            >
              <FaUpload className="text-3xl mr-4" />
              <span>Upload JSON File</span>
            </button>
          </div>
        ) : !chartType ? (
          <div className="text-center">
            <label className="block text-lg font-medium mb-4">Select Visualization Type:</label>
            <div className="flex justify-around">
              <button onClick={() => setChartType('bar')} className="focus:outline-none">
                <img src='/pictures/BarChart.png' alt="Bar Chart Preview" className="w-32 h-32 object-contain" />
              </button>
              <button onClick={() => setChartType('line')} className="focus:outline-none">
                <img src='/pictures/GraphChart.png' alt="Line Chart Preview" className="w-32 h-32 object-contain" />
              </button>
              <button onClick={() => setChartType('pie')} className="focus:outline-none">
                <img src='/pictures/PieChart.png' alt="Pie Chart Preview" className="w-32 h-32 object-contain" />
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-4 flex justify-center">
              <div className="mr-8">
                <label className="block text-sm font-medium text-center mb-2">Select X Axis Field:</label>
                {Object.keys(data[0]).map(field => (
                  <div key={field} className="flex items-center justify-center">
                    <input
                      type="radio"
                      id={`x-${field}`}
                      name="xField"
                      value={field}
                      checked={fields.xField === field}
                      onChange={() => handleFieldSelection('xField', field)}
                      className="mr-2"
                    />
                    <label htmlFor={`x-${field}`} className="text-sm">{field}</label>
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-sm font-medium text-center mb-2">Select Y Axis Field:</label>
                {Object.keys(data[0]).map(field => (
                  <div key={field} className="flex items-center justify-center">
                    <input
                      type="radio"
                      id={`y-${field}`}
                      name="yField"
                      value={field}
                      checked={fields.yField === field}
                      onChange={() => handleFieldSelection('yField', field)}
                      className="mr-2"
                    />
                    <label htmlFor={`y-${field}`} className="text-sm">{field}</label>
                  </div>
                ))}
              </div>
            </div>
            <div id="chart-container" className="relative" style={{ height: '400px' }}>
              <canvas ref={chartRef} id="chart"/>
            </div>
            <div className="flex justify-center mt-4">
              <button onClick={handleBack} className="bg-gray-800 text-white py-2 px-4 rounded">Back</button>
            </div>
          </>
        )}
      </main>
      <footer className="bg-gray-800 p-4 text-white">
        <div className="container mx-auto text-center">
          &copy; 2024 Braudana. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
