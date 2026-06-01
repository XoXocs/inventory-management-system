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