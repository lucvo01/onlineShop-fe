import {
  Box,
  Paper,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Breadcrumbs,
  Link,
  Typography,
  Grid
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ProductCard from "../../components/product/ProductCard";
import { useNavigate } from "react-router-dom";
import PaginationBar from "../../components/PaginationBar";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../components/slices/productsSlice";
import SearchInput from "../../components/SearchInput";
import { Link as RouterLink } from "react-router-dom";
import LoadingScreen from "../../components/LoadingScreen";

function ManageProductsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [pageNum, setPageNum] = useState(
    useSelector((state) => state.products.page)
  );

  const { products, isLoading, totalPages } = useSelector(
    (state) => state.products
  );

  const handleSubmit = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    dispatch(getProducts({ pageNum, searchQuery }));
  }, [dispatch, pageNum, searchQuery]);

  return (
    <Container sx={{ position: "relative", height: 1 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
        <Link underline="hover" color="inherit" component={RouterLink} to="/">
          Online Shop
        </Link>
        <Typography color="text.primary">Manage Products</Typography>
      </Breadcrumbs>

      <Typography variant="h4" align="center">
        Manage Poducts
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "center", md: "space-between" },
          justifyContent: { xs: "center", md: "center" },
          mt: "2rem",
          gap: "1rem"
        }}
      >
        <Box>
          <SearchInput handleSubmit={handleSubmit} />
        </Box>

        <Button
          sx={{ mr: "1rem" }}
          variant="contained"
          onClick={() => navigate(`/manage_products/create`)}
        >
          Create New Product
        </Button>
      </Box>
      <Grid item xs={12}>
        <Paper
          sx={{ borderRadius: "10px", mt: 3, position: "relative", height: 1 }}
        >
          {isLoading ? (
            <LoadingScreen />
          ) : (
            <>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{
                          fontWeight: "bold"
                        }}
                      >
                        Product
                      </TableCell>

                      <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products.map((item, index) => {
                      return (
                        <TableRow key={item._id || index} hover>
                          <TableCell
                            sx={{
                              display: "flex",
                              cursor: "pointer"
                            }}
                          >
                            <Box sx={{ width: "250px" }}>
                              <ProductCard product={item} hideButton={"yes"} />
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: {
                                  xs: "column",
                                  md: "row",
                                  gap: 3,
                                  alignItems: "center",
                                  justifyContent: "center"
                                }
                              }}
                            >
                              <Button
                                variant="contained"
                                sx={{ flex: 1 }}
                                onClick={() =>
                                  navigate(`/manage_products/${item._id}/edit`)
                                }
                              >
                                Edit
                              </Button>
                              <Button
                                sx={{ flex: 1 }}
                                variant="contained"
                                color="error"
                                onClick={() =>
                                  navigate(
                                    `/manage_products/${item._id}/delete`
                                  )
                                }
                              >
                                Delete
                              </Button>
                            </Box>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </Paper>
        <Box sx={{ display: "flex", justifyContent: "center", mt: "2rem" }}>
          <PaginationBar
            pageNum={pageNum}
            setPageNum={setPageNum}
            totalPages={totalPages}
          />
        </Box>
      </Grid>
    </Container>
  );
}

export default ManageProductsPage;
