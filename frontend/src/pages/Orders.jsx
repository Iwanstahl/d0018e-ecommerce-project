import { useEffect, useState } from "react";
import Title from "../components/Title";
import { productService } from "../../services/productService";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("http://localhost:8000/orders/my-orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="pt-8">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div>
        {orders.length === 0 ? (
          <p className="text-center py-10 opacity-50 uppercase tracking-widest">
            You have no orders yet.
          </p>
        ) : (
          orders.map((order) => (
            <div
              key={order.order_id}
              className="py-4 bg-(--main-text-color) text-(--second-text-color) flex flex-col gap-4 mb-8 p-4"
            >
              {/* Order Header */}
              <div className="flex justify-between items-center text-sm border-b border-(--second-text-color) pb-2 mb-2">
                <div>
                  <p className="font-bold uppercase tracking-tighter">
                    Order #{order.order_id}
                  </p>
                  <p className="text-[10px] opacity-60 text-(--second-text-color)">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold">{order.total_price} SEK</p>
                  <div className="flex items-center gap-2 justify-end">
                    <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                    <p className="text-xs uppercase font-medium">
                      {order.status}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="flex flex-col gap-4">
                {order.items.map((item) => (
                  <div
                    key={item.order_item_id}
                    className="flex items-center gap-6"
                  >
                    <img
                      className="w-16 sm:w-20 object-cover"
                      src={productService.formatImagePath(item.product.image)}
                      alt={item.product.name}
                    />
                    <div className="flex-1">
                      <p className="sm:text-base font-medium uppercase text-(--second-text-color)">
                        {item.product.name}
                      </p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-(--second-text-color)">
                        <p>Quantity: {item.quantity}</p>
                        <p>|</p>
                        <p>Price: {item.product.price} SEK</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
