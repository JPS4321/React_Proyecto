import "../styles/Orderslist.css";

const orders = [
  { id: "#1320", name: "MARIA SOSA", amount: "Q. 1052", date: "13/03/24" },
  { id: "#1320", name: "MARIA SOSA", amount: "Q. 1052", date: "13/03/24" },
  { id: "#1320", name: "MARIA SOSA", amount: "Q. 1052", date: "13/03/24" },
  { id: "#1320", name: "MARIA SOSA", amount: "Q. 1052", date: "13/03/24" },
];

const OrdersList = () => {
  return (
    <div className="orders-container">
      {orders.map((order, index) => (
        <div key={index} className="order-item">
          <div className="order-id">{order.id}</div>
          <div className="order-name">{order.name}</div>
          <div className="order-amount">{order.amount}</div>
          <div className="order-date">{order.date}</div>
        </div>
      ))}
    </div>
  );
};

export default OrdersList;
