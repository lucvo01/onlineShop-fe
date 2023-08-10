import React, { useState, useEffect } from "react";
import { Alert, Box, Container, Stack } from "@mui/material";
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

function HomePage() {
  const dispatch = useDispatch();
  const [pageNum, setPageNum] = useState(1);

  const { products, isLoading, totalPages, error } = useSelector(
    (state) => state.products
  );

  const defaultValues = {
    gender: [],
    category: "",
    priceRange: "",
    sortBy: "featured",
    searchQuery: ""
  };
  const methods = useForm({
    defaultValues
  });
  const { watch, reset } = methods;
  const filters = watch();
  const filterProducts = applyFilter(products, filters);

  const { searchQuery, gender, category } = filters;

  useEffect(() => {
    dispatch(getProducts({ pageNum, searchQuery, gender, category }));
  }, [dispatch, pageNum, searchQuery, gender, category]);

  return (
    <Container>
      <Grid container>
        <Grid item xs={12} md={3}>
          {/* <SearchInput /> */}
          <FormProvider methods={methods}>
            <ProductFilter resetFilter={reset} />
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
export default HomePage;

function applyFilter(products, filters) {
  const { sortBy, gender, category, priceRange, searchQuery } = filters;

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

  // FILTER PRODUCTS
  // if (gender && gender.length > 0) {
  //   filteredProducts = filteredProducts.filter((product) =>
  //     gender.includes(product.gender)
  //   );
  // }

  // if (category !== "All") {
  //   filteredProducts = filteredProducts.filter(
  //     (product) => product.category === category
  //   );
  // }

  // if (priceRange) {
  //   filteredProducts = filteredProducts.filter((product) => {
  //     if (priceRange === "below") {
  //       return product.price < 25;
  //     } else if (priceRange === "between") {
  //       return product.price >= 25 && product.price <= 75;
  //     } else if (priceRange === "above") {
  //       return product.price > 75;
  //     }
  //     return true;
  //   });
  // }

  // if (searchQuery) {
  //   filteredProducts = filteredProducts.filter((product) =>
  //     product.name.toLowerCase().includes(searchQuery.toLowerCase())
  //   );
  // }

  return filteredProducts;
}
