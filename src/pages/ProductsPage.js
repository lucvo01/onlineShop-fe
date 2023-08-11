import React, { useState, useEffect } from "react";
import { Alert, Box, Container, Stack, Button } from "@mui/material";
import ProductFilter from "../components/product/ProductFilter";
import ProductSearch from "../components/product/ProductSearch";
import ProductSort from "../components/product/ProductSort";
import ProductList from "../components/product/ProductList";
import { FormProvider } from "../components/form";
import { useForm } from "react-hook-form";
import orderBy from "lodash/orderBy";
import LoadingScreen from "../components/LoadingScreen";
import PaginationBar from "../components/PaginationBar";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../components/slices/productsSlice";
import { Grid } from "@mui/material";
// import SearchInput from "../components/SearchInput";
// import { LoadingButton } from "@mui/lab";

function ProductsPage() {
  const dispatch = useDispatch();
  const [pageNum, setPageNum] = useState(1);

  const { products, isLoading, totalPages, error } = useSelector(
    (state) => state.products
  );

  const { gender } = useSelector((state) => state.gender);

  const defaultValues = {
    gender: gender || "",
    category: "",
    priceRange: [],
    sortBy: "featured",
    searchQuery: ""
  };
  const methods = useForm({
    defaultValues
  });
  const {
    handleSubmit,
    watch,
    reset,
setValue,
    formState: { isSubmitting }
  } = methods;
  const filters = watch();
  const filterProducts = applyFilter(products, filters);

  const { searchQuery, category, priceRange } = filters;

  useEffect(() => {
    dispatch(
      getProducts({
        pageNum,
        searchQuery,
        gender,
        category,
        priceRange
      })
    );
  }, [dispatch, pageNum, searchQuery, gender, category, priceRange]);

  const onSubmit = async (data) => {
    dispatch(getProducts({ pageNum, ...data }));
  };

  return (
    <Container sx={{ mt: "1rem" }}>
      <Grid container>
        <Grid item xs={12} md={3}>
          <FormProvider methods={methods}>
            <ProductFilter
              resetFilter={reset}
              onSubmit={handleSubmit(onSubmit)}
              setValue={setValue}
            />
          </FormProvider>
        </Grid>
        <Grid item sx={{ flexGrow: 1 }} xs={12} md={9}>
          <FormProvider methods={methods}>
            <Stack
              spacing={2}
              direction={{ xs: "column", sm: "row" }}
              alignItems={{ sm: "center" }}
              justifyContent="space-between"
              mb={2}
            >
              <ProductSearch />
              <ProductSort />
            </Stack>
          </FormProvider>
          <Grid item sx={{ position: "relative", height: 1 }}>
            {isLoading ? (
              <LoadingScreen />
            ) : (
              <>
                {error ? (
                  <Alert severity="error">{error}</Alert>
                ) : (
                  <ProductList products={filterProducts} />
                )}
              </>
            )}
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "center", mt: "2rem" }}>
            <PaginationBar
              pageNum={pageNum}
              setPageNum={setPageNum}
              totalPages={totalPages}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
export default ProductsPage;

function applyFilter(products, filters) {
  const { sortBy } = filters;

  let filteredProducts = [...products];

  // SORT BY
  if (sortBy === "featured") {
    filteredProducts = orderBy(filteredProducts, ["sold"], ["desc"]);
  } else if (sortBy === "newest") {
    filteredProducts = orderBy(filteredProducts, ["createdAt"], ["desc"]);
  } else if (sortBy === "priceDesc") {
    filteredProducts = orderBy(filteredProducts, ["price"], ["desc"]);
  } else if (sortBy === "priceAsc") {
    filteredProducts = orderBy(filteredProducts, ["price"], ["asc"]);
  }

  return filteredProducts;
}
