import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { subMonths, format } from 'date-fns';
import useOrders from '../hooks/useOrders';
import '../styles/Report.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Report = () => {
  const [startDate, setStartDate] = useState(subMonths(new Date(), 6));
  const [endDate, setEndDate] = useState(new Date());

  const { orders, loading, error } = useOrders();

  const filteredOrders = orders.filter((order) => {
    const orderDate = new Date(order.fechaCreacion);
    return orderDate >= startDate && orderDate <= endDate;
  });


  const reportData = filteredOrders.reduce((acc, order) => {
    const month = format(new Date(order.fechaCreacion), 'yyyy-MM');
    if (!acc[month]) {
      acc[month] = { totalOrdenes: 0 }; 
    }
    acc[month].totalOrdenes += 1; 
    return acc;
  }, {});


  const chartData = {
    labels: Object.keys(reportData).map((month) => format(new Date(month), 'MMM yyyy')),
    datasets: [
      {
        label: 'Cantidad de órdenes',
        data: Object.values(reportData).map((data) => data.totalOrdenes),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        pointBorderColor: 'white',
        pointBorderWidth: 3,
        pointRadius: 6,
        borderWidth: 3,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: 'white',
        },
      },
      title: {
        display: true,
        text: 'Órdenes por Fecha',
        color: 'white',
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'white',
        },
        title: {
          display: true,
          text: 'Meses',
          color: 'white',
        },
      },
      y: {
        ticks: {
          color: 'white',
        },
        title: {
          display: true,
          text: 'Cantidad',
          color: 'white',
        },
      },
    },
  };

  return (
    <div className="report-container" style={{ backgroundColor: '#1a1a1a', padding: '20px' }}>
      <h2 style={{ color: '#00aaff' }}>Reporte</h2>

      <div className="date-picker-container" style={{ marginBottom: '20px' }}>
        <label htmlFor="start-date" style={{ color: 'white' }}>Fecha de inicio:</label>
        <DatePicker
          id="start-date"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="dd/MM/yyyy"
        />
        
        <label htmlFor="end-date" style={{ color: 'white', marginLeft: '10px' }}>Fecha de fin:</label>
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
