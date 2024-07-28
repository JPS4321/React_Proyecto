import "../styles/Orderslist.css";

const orders = [
  { id: "#1320", status: "ENTREGADO",name: "MARIA SOSA", amount: "Q. 1052", date: "13/03/24" },
  { id: "#1320", status: "PENDIENTE",name: "MARIA SOSA", amount: "Q. 1052", date: "13/03/24" },
  { id: "#1320", status: "CANCELADO",name: "MARIA SOSA", amount: "Q. 1052", date: "13/03/24" },
  { id: "#1320", status: "ENTREGADO",name: "MARIA SOSA", amount: "Q. 1052", date: "13/03/24" },
];
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

  return (
    <div className={getStatusClass(status)}>
      {status}
    </div>
  );
};
const OrdersList = () => {
  return (
    <div className="orders-container">
      {orders.map((order, index) => (
        <div key={index} className="order-item">
          <div className="order-id">{order.id}</div>
          <div className="order-status">
            <OrderStatus status={order.status} />
          </div>
          <div className="order-name">{order.name}</div>
          <div className="order-amount">{order.amount}</div>
          <div className="order-date">{order.date}</div>
        </div>
      ))}
    </div>
  );
};

export default OrdersList;
