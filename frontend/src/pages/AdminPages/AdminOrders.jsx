import React, { useEffect, useState } from "react";
import { productService } from "../../../services/productService";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllOrders = async () => {
    setLoading(true);
    try {
      const data = await productService.getAdminOrders();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching admin orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold uppercase mb-6 text-(--main-text-color)">
        Customer Orders
      </h2>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-(--main-text-color)"></div>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {orders.length === 0 ? (
            <div className="bg-(--second-text-color) border border-(--main-text-color) p-8 text-center">
              <p className="opacity-50 uppercase tracking-widest">
                No orders found in system.
              </p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.order_id}
                className="bg-(--main-text-color) text-(--second-text-color) border border-(--main-text-color) shadow-xl p-4"
              >
                {/* ORDER HEADER: Admin info */}
                <div className="flex flex-col sm:flex-row justify-between border-b border-(--second-text-color)/30 pb-2 mb-2 gap-2">
                  <div>
                    <p className="text-[10px] uppercase opacity-60">Order ID</p>
                    <p className="font-bold text-lg">#{order.order_id}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase opacity-60">Customer</p>
                    <p className="font-bold uppercase">{order.user.username}</p>
                    <p className="text-[10px] opacity-80">{order.user.email}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase opacity-60">Status</p>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      <p className="text-xs font-bold uppercase tracking-widest">
                        {order.status}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase opacity-60">Revenue</p>
                    <p className="font-mono font-bold text-lg">
                      {order.total_price} SEK
                    </p>
                  </div>
                </div>

                {/* ORDER ITEMS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {order.items.map((item) => (
                    <div
                      key={item.order_item_id}
                      className="flex items-center gap-4 bg-(--second-text-color)/10 p-2"
                    >
                      <img
                        src={productService.formatImagePath(item.product.image)}
                        alt={item.product.name}
                        className="w-12 h-12 object-contain bg-(--second-text-color)/5"
                      />
                      <div>
                        <p className="text-xs font-bold uppercase">
                          {item.product.name}
                        </p>
                        <p className="text-[10px] opacity-70">
                          QTY: {item.quantity} | {item.unit_price} SEK/pcs
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* FOOTER: Date */}
                <div className="mt-6 pt-2 border-t border-(--second-text-color)/10 flex justify-between items-center">
                  <p className="text-[10px] opacity-50 uppercase tracking-widest">
                    Processed: {new Date(order.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
