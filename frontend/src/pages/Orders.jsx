import { useEffect, useState } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:8000/orders/my-orders', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <div className="pt-14">
      <h1 className="text-2xl mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map(order => (
          <div key={order.order_id} className="mb-6 border p-4">
            <p><strong>Order ID:</strong> {order.order_id}</p>
            <p><strong>Total:</strong> {order.total_price} SEK</p>
            <p><strong>Status:</strong> {order.status}</p>

            {order.items.map(item => (
              <div key={item.order_item_id}>
                {item.product.name} x {item.quantity}
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default Orders
