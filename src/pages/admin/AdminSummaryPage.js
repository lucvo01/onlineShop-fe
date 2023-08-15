import React from "react";
import { useSelector } from 'react-redux'
import { Container,Paper,Typography } from "@mui/material";

function AdminSummaryPage() {
  const {users} = useSelector((state) => state.users)
  const {products} = useSelector((state) => state.products)
  const {orders} = useSelector((state) => state.orders)

  return (<Container>
    <Paper>
      <Typography>Orders</Typography>
      <Typography>{orders.length}</Typography>
      <Typography>Prtoducts</Typography>
      <Typography>{products.length}</Typography>
      <Typography>Users</Typography>
      <Typography>{users.length}</Typography>
    </Paper>
  </Container>);
}

export default AdminSummaryPage;
