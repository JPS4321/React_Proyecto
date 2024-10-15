import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import '../styles/Report.css'; 
import { subMonths, format } from 'date-fns'; // Funciones de manipulación de fechas

// Registrar los componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Report = () => {
  // Estados para manejar el rango de fechas seleccionado
  const [startDate, setStartDate] = useState(subMonths(new Date(), 6)); // Fecha de inicio, hace 6 meses por defecto
  const [endDate, setEndDate] = useState(new Date()); // Fecha de fin, fecha actual

  // Datos simulados del gráfico (normalmente vendrían de una base de datos)
  const allData = [
    { date: '2023-01-01', clientes: 65, envios: 28 },
    { date: '2023-02-01', clientes: 59, envios: 48 },
    { date: '2023-03-01', clientes: 80, envios: 40 },
    { date: '2023-04-01', clientes: 81, envios: 19 },
    { date: '2023-05-01', clientes: 56, envios: 86 },
    { date: '2023-06-01', clientes: 55, envios: 27 },
    // Puedes agregar más datos aquí
  ];

  // Filtrar los datos según el rango de fechas
  const filteredData = allData.filter((data) => {
    const dataDate = new Date(data.date);
    return dataDate >= startDate && dataDate <= endDate;
  });

  // Generar los datos para el gráfico en función del rango de fechas seleccionado
  const chartData = {
    labels: filteredData.map((data) => format(new Date(data.date), 'MMM yyyy')), // Formato de los meses y años en el eje X
    datasets: [
      {
        label: 'Cantidad de clientes',
        data: filteredData.map((data) => data.clientes),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.8,
      },
      {
        label: 'Cantidad de envíos',
        data: filteredData.map((data) => data.envios),
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        tension: 0.8,
      },
    ],
  };

  // Opciones del gráfico
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Clientes y Envíos por Fecha',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Meses',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Cantidad',
        },
      },
    },
  };

  return (
    <div className="report-container">
      <h2>Reporte</h2>

      <div className="date-picker-container">
        <label htmlFor="start-date">Fecha de inicio:</label>
        <DatePicker
          id="start-date"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="dd/MM/yyyy"
        />
        
        <label htmlFor="end-date">Fecha de fin:</label>
        <DatePicker
          id="end-date"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className="chart-container">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default Report;
