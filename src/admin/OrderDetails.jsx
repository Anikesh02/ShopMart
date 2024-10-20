import React from 'react';
import '../styles/order-details.css'


const OrderDetails = () => {
  const orderItems = [
    {
      picture: "/api/placeholder/50/50",
      productName: "APPLE iPhone 13 Pro (Graphite, 512 GB)",
      orderId: "T20230521043119",
      quantity: 2,
      price: 251998.00,
      time: "2023-05-21 16:31:20.0",
      status: "ORDER_PLACED"
    },
    {
      picture: "/api/placeholder/50/50",
      productName: "HP Intel Core i5 11th Gen",
      orderId: "T20230521043119",
      quantity: 1,
      price: 40990.00,
      time: "2023-05-21 16:31:20.0",
      status: "ORDER_PLACED"
    }
  ];

  return (
    <div className="order-details-container">
      <div className="search-container">
        <input type="text" placeholder="Search Items" className="search-input" />
        <button className="search-button">Search</button>
      </div>

      <div className="success-message">Order Placed Successfully!</div>

      <div className="order-details-content">
        <h2 className="order-details-title">Order Details</h2>
        <table className="order-table">
          <thead>
            <tr>
              <th>Picture</th>
              <th>ProductName</th>
              <th>OrderId</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orderItems.map((item, index) => (
              <tr key={index}>
                <td><img src={item.picture} alt={item.productName} className="product-image" /></td>
                <td>{item.productName}</td>
                <td>{item.orderId}</td>
                <td>{item.quantity}</td>
                <td>{item.price.toFixed(2)}</td>
                <td>{item.time}</td>
                <td className="order-status">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDetails;