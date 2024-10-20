import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import Helmet from '../components/Helmet/Helmet';
import { auth, db } from '../firebase.config';
import '../styles/order-details.css';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); 
  const sortedOrders = [...orders].sort((a, b) => new Date(b.date?.toDate?.() || b.date) - new Date(a.date?.toDate?.() || a.date));

  useEffect(() => {
    const fetchOrders = () => {
      if (auth.currentUser) {
        const q = query(collection(db, 'orders'), where('userId', '==', auth.currentUser.uid));
        
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const orderData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setOrders(orderData);
        });

        return () => unsubscribe();
      }
    };

    fetchOrders();
  }, []);

  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return price.toFixed(2);
    } else if (typeof price === 'string') {
      return parseFloat(price).toFixed(2);
    }
    return '0.00'; 
  };

  const filteredOrders = sortedOrders.filter((order) =>
    order.items?.some((item) =>
      item.productName.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <Helmet title='My Orders'>
      <div className="order-details-container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search Items"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
          <button className="search-button">Search</button>
        </div>

        <div className="order-details-content">
          <h2 className="order-details-title">Order Details</h2>
          {filteredOrders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <table className="order-table">
              <thead>
                <tr>
                  <th>Picture</th>
                  <th>Product Name</th>
                  <th>Order Id</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) =>
                  Array.isArray(order.items) ? order.items.map((item, index) => (
                    <tr key={`${order.id}-${index}`}>
                      <td>
                        <img 
                          src={item.image} 
                          alt={item.productName}
                          className="product-image" 
                          style={{ width: '100px', height: '100px' }} 
                        />
                      </td>
                      <td>{item.productName}</td>
                      <td>{order.id}</td>
                      <td>{item.quantity}</td>
                      <td>${formatPrice(item.totalPrice)}</td>
                      <td>{new Date(order.date?.toDate?.() || order.date).toLocaleString()}</td>
                      <td className={`order-status ${order.status?.toLowerCase()}`}>{order.status}</td>
                    </tr>
                  )) : null
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Helmet>
  );
};

export default MyOrders;
