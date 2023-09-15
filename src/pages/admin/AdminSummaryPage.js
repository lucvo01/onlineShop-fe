import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Link,
  Breadcrumbs
} from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import DescriptionIcon from "@mui/icons-material/Description";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import apiService from "../../app/apiService";
import { Link as RouterLink } from "react-router-dom";

function AdminSummaryPage() {
  const [userStats, setUserStats] = useState([]);
  const [userPercentage, setUserPercentage] = useState(0);
  const [orderStats, setOrderStats] = useState([]);
  const [orderPercentage, setOrderPercentage] = useState(0);
  const [income, setIncome] = useState(0);
  const [incomePercentage, setIncomePercentage] = useState(0);

  const compare = (a, b) => {
    if (a._id < b._id) {
      return 1;
    }
    if (a._id > b._id) {
      return -1;
    }
    return 0;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiService.get("/users/stats");
        res.data.data.sort(compare);

        setUserStats(res.data.data[0]);
        setUserPercentage(
          ((res.data.data[0].total - res.data.data[1].total) /
            res.data.data[1].total) *
            100
        );

        const resOrder = await apiService.get("/orders/stats");

        resOrder.data.data.sort(compare);

        setOrderStats(resOrder.data.data[0]);
        setOrderPercentage(
          ((resOrder.data.data[0].total - resOrder.data.data[1].total) /
            resOrder.data.data[1].total) *
            100
        );

        setIncome(resOrder.data.data[0].income);
        setIncomePercentage(
          ((resOrder.data.data[0].income - resOrder.data.data[1].income) /
            resOrder.data.data[1].income) *
            100
        );
      } catch (error) {}
    };
    fetchData();
  }, []);

  return (
    <Container>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
        <Link underline="hover" color="inherit" component={RouterLink} to="/">
          Online Shop
        </Link>
        <Typography color="text.primary">Admin Dashboard</Typography>
      </Breadcrumbs>
      <Typography variant="h4" align="center">
        Overview
      </Typography>
      <Typography textAlign="center">
        Current month's performance compared to previous month
      </Typography>
      <Paper
        sx={{
          gap: 2,
          height: "200px",
          borderRadius: "15px",
          mt: "2rem"
        }}
      >
        <Grid
          container
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
            height: "200px",
            borderRadius: "15px"
          }}
        >
          <Grid
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 1
            }}
          >
            <DescriptionIcon color="success" fontSize="large" />
            <Box>
              <Typography>{orderStats.total}</Typography>
              <Typography>Orders</Typography>
            </Box>
            <Typography
              sx={{
                color: orderPercentage < 0 ? "red" : "green"
              }}
            >
              {orderPercentage.toFixed(0)}%
            </Typography>
          </Grid>

          <Grid
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 1
            }}
          >
            <PeopleAltIcon color="secondary" fontSize="large" />
            <Box>
              <Typography>{userStats.total}</Typography>
              <Typography>Users</Typography>
            </Box>
            <Typography
              sx={{
                color: userPercentage < 0 ? "red" : "green"
              }}
            >
              {userPercentage.toFixed(0)}%
            </Typography>
          </Grid>

          <Grid
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 1
            }}
          >
            <AttachMoneyIcon color="action" fontSize="large" />
            <Box>
              <Typography>${income}</Typography>
              <Typography>Earnings</Typography>
            </Box>
            <Typography
              sx={{
                color: incomePercentage < 0 ? "red" : "green"
              }}
            >
              {incomePercentage.toFixed(0)}%
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default AdminSummaryPage;
