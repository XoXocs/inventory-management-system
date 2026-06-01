import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const API = "http://127.0.0.1:8000";

  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);

  const [productForm, setProductForm] = useState({
    name: "",
    sku: "",
    price: "",
    stock: "",
  });

  const [customerForm, setCustomerForm] = useState({
    name: "",
    email: "",
  });

  const [orderForm, setOrderForm] = useState({
    customer_id: "",
    product_id: "",
    quantity: "",
  });

  // =====================
  // FETCH DATA
  // =====================

  const getProducts = async () => {
    const res = await axios.get(`${API}/products`);
    setProducts(res.data);
  };

  const getCustomers = async () => {
    const res = await axios.get(`${API}/customers`);
    setCustomers(res.data);
  };

  const getOrders = async () => {
    const res = await axios.get(`${API}/orders`);
    setOrders(res.data);
  };

  useEffect(() => {
    getProducts();
    getCustomers();
    getOrders();
  }, []);

  // =====================
  // PRODUCT
  // =====================

  const createProduct = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API}/products`, {
        name: productForm.name,
        sku: productForm.sku,
        price: Number(productForm.price),
        stock: Number(productForm.stock),
      });

      setProductForm({
        name: "",
        sku: "",
        price: "",
        stock: "",
      });

      getProducts();
    } catch (err) {
      alert(err.response?.data?.detail || "Error creating product");
    }
  };

  // =====================
  // CUSTOMER
  // =====================

  const createCustomer = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API}/customers`, {
        name: customerForm.name,
        email: customerForm.email,
      });

      setCustomerForm({
        name: "",
        email: "",
      });

      getCustomers();
    } catch (err) {
      alert(err.response?.data?.detail || "Error creating customer");
    }
  };

  // =====================
  // ORDER
  // =====================

  const createOrder = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API}/orders`, {
        customer_id: Number(orderForm.customer_id),
        product_id: Number(orderForm.product_id),
        quantity: Number(orderForm.quantity),
      });

      setOrderForm({
        customer_id: "",
        product_id: "",
        quantity: "",
      });

      getOrders();
      getProducts();
    } catch (err) {
      alert(err.response?.data?.detail || "Error creating order");
    }
  };

  const inventoryValue = products.reduce(
    (sum, product) => sum + product.price * product.stock,
    0
  );

  return (
    <div className="container">
      <h1>Inventory Management System</h1>

      {/* Dashboard */}

      <div className="dashboard">
        <div className="stat-card">
          <h3>{products.length}</h3>
          <p>Total Products</p>
        </div>

        <div className="stat-card">
          <h3>{customers.length}</h3>
          <p>Total Customers</p>
        </div>

        <div className="stat-card">
          <h3>{orders.length}</h3>
          <p>Total Orders</p>
        </div>

        <div className="stat-card">
          <h3>₹{inventoryValue.toLocaleString()}</h3>
          <p>Inventory Value</p>
        </div>
      </div>

      {/* Product Section */}

      <div className="section">
        <h2>Add Product</h2>

        <form onSubmit={createProduct}>
          <input
            placeholder="Name"
            value={productForm.name}
            onChange={(e) =>
              setProductForm({
                ...productForm,
                name: e.target.value,
              })
            }
          />

          <input
            placeholder="SKU"
            value={productForm.sku}
            onChange={(e) =>
              setProductForm({
                ...productForm,
                sku: e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Price"
            value={productForm.price}
            onChange={(e) =>
              setProductForm({
                ...productForm,
                price: e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Stock"
            value={productForm.stock}
            onChange={(e) =>
              setProductForm({
                ...productForm,
                stock: e.target.value,
              })
            }
          />

          <button type="submit">Add Product</button>
        </form>

        <h3>Products</h3>

        {products.map((p) => (
          <div className="card" key={p.id}>
            {p.id} | {p.name} | {p.sku} | ₹{p.price} | Stock: {p.stock}
          </div>
        ))}
      </div>

      {/* Customer Section */}

      <div className="section">
        <h2>Add Customer</h2>

        <form onSubmit={createCustomer}>
          <input
            placeholder="Name"
            value={customerForm.name}
            onChange={(e) =>
              setCustomerForm({
                ...customerForm,
                name: e.target.value,
              })
            }
          />

          <input
            placeholder="Email"
            value={customerForm.email}
            onChange={(e) =>
              setCustomerForm({
                ...customerForm,
                email: e.target.value,
              })
            }
          />

          <button type="submit">Add Customer</button>
        </form>

        <h3>Customers</h3>

        {customers.map((c) => (
          <div className="card" key={c.id}>
            {c.id} | {c.name} | {c.email}
          </div>
        ))}
      </div>

      {/* Order Section */}

      <div className="section">
        <h2>Create Order</h2>

        <form onSubmit={createOrder}>
          <input
            type="number"
            placeholder="Customer ID"
            value={orderForm.customer_id}
            onChange={(e) =>
              setOrderForm({
                ...orderForm,
                customer_id: e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Product ID"
            value={orderForm.product_id}
            onChange={(e) =>
              setOrderForm({
                ...orderForm,
                product_id: e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Quantity"
            value={orderForm.quantity}
            onChange={(e) =>
              setOrderForm({
                ...orderForm,
                quantity: e.target.value,
              })
            }
          />

          <button type="submit">Create Order</button>
        </form>

        <h3>Orders</h3>

        {orders.map((o) => (
          <div className="card" key={o.id}>
            Order #{o.id} | Customer: {o.customer_id} | Product:{" "}
            {o.product_id} | Qty: {o.quantity}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;