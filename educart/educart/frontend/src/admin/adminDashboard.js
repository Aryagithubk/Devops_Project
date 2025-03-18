import React, { useState, useEffect } from "react";
import {
  fetchProducts,
  deleteProduct,
  fetchOrders,
  updateOrderStatus,
} from "../../api";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const productsData = await fetchProducts();
      setProducts(productsData);
      const ordersData = await fetchOrders();
      setOrders(ordersData);
    };
    getData();
  }, []);

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id);
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleUpdateOrderStatus = async (id, status) => {
    await updateOrderStatus(id, status);
    setOrders(
      orders.map((order) => (order.id === id ? { ...order, status } : order))
    );
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div>
        <h3>Products</h3>
        {products.map((product) => (
          <div key={product.id}>
            <span>{product.name}</span>
            <button onClick={() => handleDeleteProduct(product.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
      <div>
        <h3>Orders</h3>
        {orders.map((order) => (
          <div key={order.id}>
            <span>
              Order #{order.id} - {order.status}
            </span>
            <button
              onClick={() => handleUpdateOrderStatus(order.id, "delivered")}
            >
              Mark as Delivered
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
