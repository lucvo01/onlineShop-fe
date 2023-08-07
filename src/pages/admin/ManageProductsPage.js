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
// import { useForm } from "react-hook-form";
import ProductCard from "../../components/product/ProductCard";
import {  useNavigate } from "react-router-dom";
import PaginationBar from "../../components/PaginationBar";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../components/slices/productsSlice";
import SearchInput from "../../components/SearchInput";

function ManageProductsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [pageNum, setPageNum] = useState(1);

  const { products, isLoading, totalPages, error } = useSelector(
    (state) => state.products
  );


  // const methods = useForm({});
  // const { watch, reset } = methods;
  // const filters = watch();

    const handleSubmit = (query) => {
      setSearchQuery(query);
    };

  useEffect(() => {
    dispatch(getProducts({ pageNum, searchQuery }));
  }, [dispatch, pageNum, searchQuery]);

  return (
    <Container>
      <Box sx={{ overflowX: "auto" }}>
        <Box sx={{ display: "flex", justifyContent: "center", mt: "1rem" }}>
          <SearchInput handleSubmit={handleSubmit} />
          <Button variant="contained" onClick={() => navigate(`/manage_products/create`)}>
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
              {products.map((item, index) => {
                return (
                  <TableRow key={item._id || index} hover>
                    <TableCell
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer"
                      }}>
                      <ProductCard product={item} />
                    </TableCell>
                    <TableCell
                      // align="left"
                      sx={{ display: { md: "table-cell" } }}>
                      <Button variant="outlined"
                        onClick={() =>
                          navigate(`/manage_products/${item._id}/edit`)
                        }>
                        Edit
                      </Button>
                      <Button variant="outlined"
                        color="error"
                        onClick={() =>
                          navigate(`/manage_products/${item._id}/delete`)
                        }>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: "flex", justifyContent: "center", mt: "2rem" }}>
          <PaginationBar
            pageNum={pageNum}
            setPageNum={setPageNum}
            totalPages={totalPages}
          />
        </Box>
      </Box>
    </Container>
  );
}

export default ManageProductsPage;
