import {
  Box,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import apiService from "../../app/apiService";
import ProductCard from "../../components/product/ProductCard";
import { useLocation, useNavigate } from "react-router-dom";
import PaginationBar from "../../components/PaginationBar";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../components/slices/productsSlice";

function ProductsPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { products, isLoading, totalPages, error } = useSelector(
    (state) => state.products
  );
  const from = location.state?.from?.pathname || "/";

  const [pageNum, setPageNum] = useState(1);

  const methods = useForm({});
  const { watch, reset } = methods;
  const filters = watch();

  useEffect(() => {
    const res = dispatch(getProducts({ pageNum }));
    console.log("test", res);
  }, [dispatch, pageNum]);

  return (
    <Container>
      <Box sx={{ overflowX: "auto" }}>
        <Box sx={{ display: "flex", justifyContent: "center", mt: "1rem" }}>
          <Button onClick={() => navigate(`/products/create`)}>
            Create New Product
          </Button>
        </Box>

        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: { xs: "20%", sm: "25%" } }}>
                  Product
                </TableCell>

                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((item) => {
                return (
                  <TableRow key={item._id} hover>
                    <TableCell
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer"
                      }}
                    >
                      <ProductCard product={item} />
                    </TableCell>
                    <TableCell
                      // align="left"
                      sx={{ display: { xs: "none", md: "table-cell" } }}
                    >
                      <Button
                        onClick={() => navigate(`/products/${item._id}/edit`)}
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => navigate(`/products/${item._id}/delete`)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ display: { xs: "none", md: "table-cell" } }}
                    ></TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <PaginationBar
          pageNum={pageNum}
          setPageNum={setPageNum}
          totalPageNum={totalPages || 10}
        />
      </Box>
    </Container>
  );
}

export default ProductsPage;
