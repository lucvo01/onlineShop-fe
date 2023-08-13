import React, { useState, useEffect } from "react";
import { Alert, Box, Container, Stack } from "@mui/material";
import ProductFilter from "../components/product/ProductFilter";
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
import SearchInput from "../components/SearchInput";
import { setGender } from "../components/slices/filterSlice";

function ProductsPage() {
  const dispatch = useDispatch();
  const [pageNum, setPageNum] = useState(1);
  const [sliderValue, setSliderValue] = useState([0, 200]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const { products, isLoading, totalPages, error } = useSelector(
    (state) => state.products
  );

  let { gender, priceRange } = useSelector((state) => state.filter);

  const defaultValues = {
    gender: gender || "",
    category: "",
    priceRange: []
    // searchQuery: ""
  };

  const methods = useForm({
    defaultValues
  });

  const { handleSubmit, watch, reset } = methods;
  const filters = watch();
  const filterProducts = applyFilter(products, filters);

  const { category } = filters;

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

  const resetFilter = () => {
    setPageNum(1);
    setSearchQuery("");
    setGender("");
    reset();
  };

  return (
    <Container sx={{ mt: "1rem" }}>
      <Grid container spacing={3}>
        <Grid item sx={{ flexGrow: 1 }} xs={12} md={3}>
          <SearchInput handleSubmit={handleSearch} />

          <FormProvider methods={methods}>
            <ProductFilter
              resetFilter={resetFilter}
              onSubmit={handleSubmit(onSubmit)}
              sliderValue={sliderValue}
              setSliderValue={setSliderValue}
              gender={gender}
            />
          </FormProvider>
        </Grid>
        <Grid item sx={{ flexGrow: 1 }} xs={12} md={9}>
          <FormProvider methods={methods}>
            <Stack
              spacing={2}
              direction={{ xs: "column", sm: "row" }}
              justifyContent={{ sx: "center", md: "flex-end" }}
            >
              <ProductSort />
            </Stack>
          </FormProvider>
          <Grid item>
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
            <Box sx={{ display: "flex", justifyContent: "center", mt: "2rem" }}>
              <PaginationBar
                pageNum={pageNum}
                setPageNum={setPageNum}
                totalPages={totalPages}
              />
            </Box>
          </Grid>
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
