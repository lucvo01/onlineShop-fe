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

function HomePage() {
  const dispatch = useDispatch();
  const [pageNum, setPageNum] = useState(1);

  const { products, isLoading, totalPages, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProducts({ pageNum }));
  }, [dispatch, pageNum]);

  const defaultValues = {
    gender: [],
    category: "All",
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

  return (
    <Container sx={{ display: "flex", minHeight: "100vh", mt: 3 }}>
      <Stack>
        <FormProvider methods={methods}>
          <ProductFilter resetFilter={reset} />
        </FormProvider>
      </Stack>
      <Stack sx={{ flexGrow: 1 }}>
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
        <Box sx={{ position: "relative", height: 1 }}>
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
        </Box>
        <PaginationBar
          pageNum={pageNum}
          setPageNum={setPageNum}
          totalPageNum={totalPages || 10}
        />
      </Stack>
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
  if (gender && gender.length > 0) {
    filteredProducts = filteredProducts.filter((product) =>
      gender.includes(product.gender)
    );
  }

  if (category !== "All") {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === category
    );
  }

  if (priceRange) {
    filteredProducts = filteredProducts.filter((product) => {
      if (priceRange === "below") {
        return product.price < 25;
      } else if (priceRange === "between") {
        return product.price >= 25 && product.price <= 75;
      } else if (priceRange === "above") {
        return product.price > 75;
      }
      return true;
    });
  }

  if (searchQuery) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  return filteredProducts;
}
