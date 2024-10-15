import React from 'react';
import useOrders from '../hooks/useOrders';
import "../styles/Orderslist.css";

const OrderStatus = ({ status }) => {
  const getStatusClass = (status) => {
    if (status === 'ENTREGADO') {
      return 'order-status delivered';
    } else if (status === 'CANCELADO') {
      return 'order-status canceled';
    } else {
      return 'order-status';
    }
  };

  return <div className={getStatusClass(status)}>{status}</div>;
};

const OrdersList = ({ filter }) => {
  const { orders, loading, error } = useOrders();

  if (loading) return <div>Cargando órdenes...</div>;
  if (error) return <div>{error}</div>;

  const filteredOrders = orders.filter((order) =>
    filter === 'TODO' ? true : order.estado === filter
  );

  return (
    <div className="orders-container">
      <div className="order-header">
        <div className="order-id">Order ID</div>
        <div className="order-status">Status</div>
        <div className="order-name">Client Name</div>
        <div className="order-amount">$</div>
        <div className="order-date">Date</div>
      </div>
      {filteredOrders.map((order, index) => (
        <div key={index} className="order-item">
          <div className="order-id">{order.id_orden}</div>
          <div className="order-status">
            <OrderStatus status={order.estado} />
          </div>
          <div className="order-name">{order.id_cliente}</div>
          <div className="order-amount">{order.monto}</div>
          <div className="order-date">{order.fechaCreacion}</div>
        </div>
      ))}
    </div>
  );
};

export default OrdersList;
