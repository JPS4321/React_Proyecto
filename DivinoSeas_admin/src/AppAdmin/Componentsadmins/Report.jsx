import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { format, compareAsc } from 'date-fns';
import useOrders from '../hooks/useOrders';
import '../styles/Report.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Report = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [chartType, setChartType] = useState('ordenes');

  const { orders, loading, error } = useOrders();

  const filteredOrders = orders.filter((order) => {
    const orderDate = new Date(order.fechaCreacion);
    return orderDate >= startDate && orderDate <= endDate;
  });

  const reportData = filteredOrders.reduce((acc, order) => {
    const day = format(new Date(order.fechaCreacion), 'yyyy-MM-dd');
    if (!acc[day]) {
      acc[day] = { totalOrdenes: 0 };
    }
    acc[day].totalOrdenes += 1;
    return acc;
  }, {});

  const uniqueClientsData = filteredOrders.reduce((acc, order) => {
    const day = format(new Date(order.fechaCreacion), 'yyyy-MM-dd');
    if (!acc[day]) {
      acc[day] = { nuevosClientes: new Set() };
    }
    acc[day].nuevosClientes.add(order.clienteNombre);
    return acc;
  }, {});

  const sortedDates = Object.keys(reportData).sort((a, b) => compareAsc(new Date(a), new Date(b)));

  const chartData = {
    labels: sortedDates.map((day) => format(new Date(day), 'dd/MM/yyyy')),
    datasets: [
      {
        label: chartType === 'ordenes' ? 'Cantidad de órdenes' : 'Nuevos clientes',
        data: chartType === 'ordenes'
          ? sortedDates.map((day) => reportData[day].totalOrdenes)
          : sortedDates.map((day) => uniqueClientsData[day].nuevosClientes.size),
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
        text: chartType === 'ordenes' ? 'Órdenes por Día' : 'Nuevos Clientes por Día',
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
          text: 'Días',
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

      <div style={{ marginBottom: '20px' }}>
        <label style={{ color: 'white', marginRight: '10px' }}>Seleccionar reporte:</label>
        <select value={chartType} onChange={(e) => setChartType(e.target.value)} style={{ padding: '5px', fontSize: '16px' }}>
          <option value="ordenes">Órdenes</option>
          <option value="clientes">Nuevos Clientes</option>
        </select>
      </div>

      <div className="chart-container">
        <Line data={chartData} options={options} />
      </div>

      <div className="table-container" style={{ marginTop: '20px' }}>
        <h3 style={{ color: '#00aaff' }}>{chartType === 'ordenes' ? 'Órdenes por Día' : 'Nuevos Clientes por Día'}</h3>
        <table style={{ width: '100%', color: 'white', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#333' }}>
              <th style={{ padding: '10px', borderBottom: '1px solid #00aaff' }}>Fecha</th>
              <th style={{ padding: '10px', borderBottom: '1px solid #00aaff' }}>{chartType === 'ordenes' ? 'Cantidad de Órdenes' : 'Cantidad de Nuevos Clientes'}</th>
            </tr>
          </thead>
          <tbody>
            {sortedDates.map((day, index) => (
              <tr key={index} style={{ textAlign: 'left', backgroundColor: index % 2 === 0 ? '#1a1a1a' : '#2a2a2a' }}>
                <td style={{ padding: '10px', borderBottom: '1px solid #00aaff' }}>{format(new Date(day), 'dd/MM/yyyy')}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #00aaff' }}>
                  {chartType === 'ordenes' ? reportData[day].totalOrdenes : uniqueClientsData[day].nuevosClientes.size}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Report;
