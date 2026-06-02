import { useEffect, useState } from "react";
import axios from "axios";

import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Alert,
} from "@mui/material";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import "./App.css";

function App() {
  const API = "https://inventory-management-system-tuyu.onrender.com";

  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
const [search, setSearch] = useState("");

const [newOrder, setNewOrder] = useState({
  customer_id: "",
  product_id: "",
  quantity: "",
});
const [newProduct, setNewProduct] = useState({
  name: "",
  sku: "",
  price: "",
  stock: "",
});
const [newCustomer, setNewCustomer] = useState({
  name: "",
  email: "",
  phone: "",
});

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

  const deleteProduct = async (id) => {
    await axios.delete(`${API}/products/${id}`);
    getProducts();
  };

  const deleteCustomer = async (id) => {
    await axios.delete(`${API}/customers/${id}`);
    getCustomers();
  };

  const deleteOrder = async (id) => {
    await axios.delete(`${API}/orders/${id}`);
    getOrders();
    getProducts();
  };
  const createOrder = async () => {
  try {
    await axios.post(`${API}/orders`, {
      customer_id: Number(newOrder.customer_id),
      product_id: Number(newOrder.product_id),
      quantity: Number(newOrder.quantity),
    });

    alert("Order created successfully");

    setNewOrder({
      customer_id: "",
      product_id: "",
      quantity: "",
    });

    getOrders();
    getProducts();
  } catch (error) {
    alert(
      error.response?.data?.detail ||
      "Failed to create order"
    );
  }
};
const createProduct = async () => {
  try {
    await axios.post(`${API}/products`, {
      name: newProduct.name,
      sku: newProduct.sku,
      price: Number(newProduct.price),
      stock: Number(newProduct.stock),
    });

    alert("Product created successfully");

    setNewProduct({
      name: "",
      sku: "",
      price: "",
      stock: "",
    });

    getProducts();
  } catch (error) {
    alert(
      error.response?.data?.detail ||
      "Failed to create product"
    );
  }
};
const createCustomer = async () => {
  try {
    await axios.post(`${API}/customers`, {
      name: newCustomer.name,
      email: newCustomer.email,
      phone: newCustomer.phone,
    });

    alert("Customer created successfully");

    setNewCustomer({
      name: "",
      email: "",
      phone: "",
    });

    getCustomers();
  } catch (error) {
    alert(
      error.response?.data?.detail ||
      "Failed to create customer"
    );
  }
};
  

  const inventoryValue = products.reduce(
    (sum, product) => sum + product.price * product.stock,
    0
  );

  const lowStockProducts = products.filter(
    (product) => product.stock <= 5
  );

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container maxWidth="xl" className="app-container">

      <Typography
        variant="h3"
        className="page-title"
      >
        Inventory Management Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>

        <Grid item xs={12} md={3}>
          <Card className="metric-card">
            <CardContent>
              <Typography variant="h4">
                {products.length}
              </Typography>
              <Typography>
                Total Products
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card className="metric-card">
            <CardContent>
              <Typography variant="h4">
                {customers.length}
              </Typography>
              <Typography>
                Customers
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card className="metric-card">
            <CardContent>
              <Typography variant="h4">
                {orders.length}
              </Typography>
              <Typography>
                Orders
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card className="metric-card">
            <CardContent>
              <Typography variant="h4">
                ₹{inventoryValue.toLocaleString()}
              </Typography>
              <Typography>
                Inventory Value
              </Typography>
            </CardContent>
          </Card>
        </Grid>

      </Grid>

      <Card className="section-card">
        <CardContent>

          <Typography variant="h5" gutterBottom>
            Inventory Stock Overview
          </Typography>

          <ResponsiveContainer
            width="100%"
            height={350}
          >
            <BarChart data={products}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="stock" />
            </BarChart>
          </ResponsiveContainer>

        </CardContent>
      </Card>

      <Card className="section-card">
        <CardContent>

          <Typography variant="h5" gutterBottom>
            Search Products
          </Typography>

          <TextField
            fullWidth
            label="Search by Product Name"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </CardContent>
      </Card>

      <Card className="section-card">
        <CardContent>

          <Typography variant="h5" gutterBottom>
            Low Stock Alerts
          </Typography>

          {lowStockProducts.length === 0 ? (
            <Alert severity="success">
              No low stock products.
            </Alert>
          ) : (
            lowStockProducts.map((product) => (
              <Alert
                severity="warning"
                sx={{ mb: 1 }}
                key={product.id}
              >
                {product.name} has only {product.stock}
                {" "}units left.
              </Alert>
            ))
          )}

        </CardContent>
      </Card>

            <Card className="section-card">
        <CardContent>

          <Typography variant="h5" gutterBottom>
            Products
          </Typography>
          <Card className="section-card">
  <CardContent>

    <Typography variant="h5" gutterBottom>
      Add Product
    </Typography>

    <Grid container spacing={2}>

      <Grid item xs={12} md={3}>
        <TextField
          fullWidth
          label="Product Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              name: e.target.value,
            })
          }
        />
      </Grid>

      <Grid item xs={12} md={3}>
        <TextField
          fullWidth
          label="SKU"
          value={newProduct.sku}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              sku: e.target.value,
            })
          }
        />
      </Grid>

      <Grid item xs={12} md={3}>
        <TextField
          fullWidth
          label="Price"
          type="number"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              price: e.target.value,
            })
          }
        />
      </Grid>

      <Grid item xs={12} md={3}>
        <TextField
          fullWidth
          label="Stock"
          type="number"
          value={newProduct.stock}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              stock: e.target.value,
            })
          }
        />
      </Grid>

    </Grid>

    <Button
      variant="contained"
      sx={{ mt: 2 }}
      onClick={createProduct}
    >
      Add Product
    </Button>

  </CardContent>
</Card>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>SKU</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.sku}</TableCell>
                    <TableCell>
                      ₹{product.price}
                    </TableCell>
                    <TableCell>
                      {product.stock}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() =>
                          deleteProduct(product.id)
                        }
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

            </Table>
          </TableContainer>

        </CardContent>
      </Card>
      <Card className="section-card">
  <CardContent>

    <Typography variant="h5" gutterBottom>
      Add Customer
    </Typography>

    <Grid container spacing={2}>

      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          label="Customer Name"
          value={newCustomer.name}
          onChange={(e) =>
            setNewCustomer({
              ...newCustomer,
              name: e.target.value,
            })
          }
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          label="Email"
          value={newCustomer.email}
          onChange={(e) =>
            setNewCustomer({
              ...newCustomer,
              email: e.target.value,
            })
          }
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          label="Phone"
          value={newCustomer.phone}
          onChange={(e) =>
            setNewCustomer({
              ...newCustomer,
              phone: e.target.value,
            })
          }
        />
      </Grid>

    </Grid>

    <Button
      variant="contained"
      sx={{ mt: 2 }}
      onClick={createCustomer}
    >
      Add Customer
    </Button>

  </CardContent>
</Card>
      
      <Card className="section-card">
        <CardContent>

          <Typography variant="h5" gutterBottom>
            Customers
          </Typography>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      {customer.id}
                    </TableCell>

                    <TableCell>
                      {customer.name}
                    </TableCell>

                    <TableCell>
                      {customer.email}
                    </TableCell>

                    <TableCell>
                      {customer.phone || "-"}
                    </TableCell>

                    <TableCell>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() =>
                          deleteCustomer(customer.id)
                        }
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

            </Table>
          </TableContainer>

        </CardContent>
      </Card>

<Card className="section-card">
  <CardContent>

    <Typography variant="h5" gutterBottom>
      Create Order
    </Typography>

    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          label="Customer ID"
          value={newOrder.customer_id}
          onChange={(e) =>
            setNewOrder({
              ...newOrder,
              customer_id: e.target.value,
            })
          }
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          label="Product ID"
          value={newOrder.product_id}
          onChange={(e) =>
            setNewOrder({
              ...newOrder,
              product_id: e.target.value,
            })
          }
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          label="Quantity"
          value={newOrder.quantity}
          onChange={(e) =>
            setNewOrder({
              ...newOrder,
              quantity: e.target.value,
            })
          }
        />
      </Grid>
    </Grid>

    <Button
      variant="contained"
      sx={{ mt: 2 }}
      onClick={createOrder}
    >
      Create Order
    </Button>

  </CardContent>
</Card>

<Card className="section-card">
  <CardContent>

    <Typography variant="h5" gutterBottom>
      Orders
    </Typography>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Customer ID</TableCell>
                  <TableCell>Product ID</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Total Amount</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>

                    <TableCell>
                      {order.customer_id}
                    </TableCell>

                    <TableCell>
                      {order.product_id}
                    </TableCell>

                    <TableCell>
                      {order.quantity}
                    </TableCell>

                    <TableCell>
                      ₹{order.total_amount || 0}
                    </TableCell>

                    <TableCell>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() =>
                          deleteOrder(order.id)
                        }
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

            </Table>
          </TableContainer>

        </CardContent>
      </Card>

    </Container>
  );
}

export default App;