import React, { useState, useEffect, useRef } from 'react';
import NavBar from './NavBar';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const Home = () => {
  const [chartType, setChartType] = useState('');
  const [data, setData] = useState(null);
  const [fields, setFields] = useState({ xField: '', yField: '' });
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const jsonData = JSON.parse(reader.result);
      setData(jsonData);
    };
    reader.readAsText(file);
  };

  const handleFieldSelection = (axis, value) => {
    if (axis === 'xField') {
      setFields(prevFields => ({
        xField: value,
        yField: value === prevFields.yField ? Object.keys(data[0]).find(field => field !== value) : prevFields.yField
      }));
    } else {
      setFields(prevFields => ({
        xField: value === prevFields.xField ? Object.keys(data[0]).find(field => field !== value) : prevFields.xField,
        yField: value
      }));
    }
  };

  const handleBack = () => {
    setChartType('');
    setFields({ xField: '', yField: '' });
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
  };

  useEffect(() => {
    if (data && fields.xField && fields.yField && chartType && fields.xField !== fields.yField) {
      const chartCanvas = chartRef.current.getContext('2d');
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      chartInstance.current = new Chart(chartCanvas, {
        type: chartType,
        data: {
          labels: data.map(item => item[fields.xField]),
          datasets: [{
            label: 'Data',
            backgroundColor: chartType === 'pie' ? ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'] : 'rgba(255, 99, 132, 0.2)',
            borderColor: chartType === 'pie' ? ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'] : 'rgba(255, 99, 132, 1)',
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
            }
          },
          scales: chartType !== 'pie' ? {
            y: {
              beginAtZero: true
            }
          } : {}
        }
      });
    }
  }, [data, fields, chartType]);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow container mx-auto py-8">
        {!data ? (
          <div className="flex flex-col items-center justify-center h-full">
            <input type="file" accept=".json" onChange={handleFileUpload} className="mb-4" />
          </div>
        ) : !chartType ? (
          <div className="text-center">
            <label className="block text-lg font-medium mb-4">Select Visualization Type:</label>
            <div className="flex justify-around">
              <button onClick={() => setChartType('bar')} className="focus:outline-none">
                <img src="https://via.placeholder.com/150?text=Bar+Chart" alt="Bar Chart Preview" className="w-32 h-32 object-contain" />
              </button>
              <button onClick={() => setChartType('line')} className="focus:outline-none">
                <img src="https://via.placeholder.com/150?text=Line+Chart" alt="Line Chart Preview" className="w-32 h-32 object-contain" />
              </button>
              <button onClick={() => setChartType('pie')} className="focus:outline-none">
                <img src="https://via.placeholder.com/150?text=Pie+Chart" alt="Pie Chart Preview" className="w-32 h-32 object-contain" />
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
