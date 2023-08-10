import React, { useState, useEffect } from "react";
import { Box, Container, Button, Grid } from "@mui/material";
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
import { setGender } from "../components/slices/genderSlice";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
// import SearchInput from "../components/SearchInput";

const Img = styled("img")(({ theme }) => ({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
  [theme.breakpoints.up("xs")]: {
    display: "none"
  },
  [theme.breakpoints.up("md")]: {
    display: "block"
  }
}));

function HomePage() {
  const navigate = useNavigate();
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

  const handleClickMen = () => {
    dispatch(setGender("male"));
    navigate("/shop");
  };
  
  const handleClickWonen = () => {
    dispatch(setGender("female"));
    navigate("/shop");
  };
  return (
    <Container>
      <Grid container>
        <Img src="https://content.asos-media.com/-/media/homepages/unisex/generic-hp/july-2023/julymonthly_12062023_womens_shot07_034_1440x698.jpg" />
        {/* <source srcset="https://content.asos-media.com/-/media/homepages/unisex/generic-hp/july-2023/carly_asos_6_640x1070.jpg" media="(max-width: 768px)"/> */}
        <Box
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "1rem",
            // backgroundColor: 'rgba(255, 255, 255, 0.7)',
            padding: "1rem",
            borderRadius: "8px"
          }}>
          <Button onClick={handleClickMen} variant="contained" size="large">
            Shop Men
          </Button>
          <Button onClick={handleClickWonen}  variant="contained" size="large">
            Shop Women
          </Button>
        </Box>
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
