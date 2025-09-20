import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/orders', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
        alert('Failed to load orders.');
      }
    };

    fetchOrders();
  }, [user.token]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order._id} className="bg-white rounded-lg shadow-md p-4">
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
              <p><strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}</p>
              <div className="mt-2">
                <h3 className="font-semibold">Items:</h3>
                <ul className="list-disc list-inside">
                  {order.items.map(item => (
                    <li key={item.id}>
                      {item.title} - Qty: {item.quantity} - ${item.price}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
