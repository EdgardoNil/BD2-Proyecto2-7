import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


export const ReportsAdmin = () => {
  const [salesData, setsalesData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/top_libros_vendidos');
        if (!response.ok) {
          throw new Error('ERROR: No se pudieron cargar los datos');
        }
        const data = await response.json();
        setsalesData(data);
      } catch (error) {
        console.error('No se pudieron cargar los dato', error);
      }
    };
    fetchData();
    const intervaltime = setInterval(fetchData, 1000);
      return () => clearInterval(intervaltime);
  }, []);
  const labels = salesData.map(item => item.titulo);
  const dataBooks = salesData.map(item => item.total_vendidos);

  const dataset = {
    label: 'Libros vendidos',
    data: dataBooks,
    borderColor: 'rgba(30, 144, 255, 0.5)',
    backgroundColor: 'rgba(30, 144, 255, 0.5)',
    borderWidth: 2,
  };

  const data = {
    labels: labels,
    datasets: [dataset],
  };

  const options = {
    responsive: true,
    
    scales: {
      x: {
        ticks: {
          color: 'black', 
          font: {
            size: 12, 
           
          },
        },
      },
      y: {
        ticks: {
          color: 'black', 
          font: {
            size: 12, 
          },
        },
      },
    },
  };
  return (
    <div>
      <h1>Top de Libros mas vendidos</h1>
      <Bar data={data} options={options} />
    </div>
  );
};
