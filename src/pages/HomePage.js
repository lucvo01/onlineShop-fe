import React, { useState, useEffect } from "react";
import { Alert, Box, Container, Stack } from "@mui/material";
import ProductFilter from "../components/ProductFilter";
import ProductSearch from "../components/ProductSearch";
import ProductSort from "../components/ProductSort";
import ProductList from "../components/ProductList";
import { FormProvider } from "../components/form";
import { useForm } from "react-hook-form";
import apiService from "../app/apiService";
import orderBy from "lodash/orderBy";
import LoadingScreen from "../components/LoadingScreen";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const res = await apiService.get("/products");
        setProducts(res.data);
        setError("");
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
      setLoading(false);
    };
    getProducts();
  }, []);

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
          {loading ? (
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
      </Stack>
    </Container>
  );
}

// function applyFilter(products, filters) {
//   const { sortBy } = filters;
//   let filteredProducts = products;

//   // SORT BY
//   if (sortBy === "featured") {
//     filteredProducts = orderBy(products, ["sold"], ["desc"]);
//   }
//   if (sortBy === "newest") {
//     filteredProducts = orderBy(products, ["createdAt"], ["desc"]);
//   }
//   if (sortBy === "priceDesc") {
//     filteredProducts = orderBy(products, ["price"], ["desc"]);
//   }
//   if (sortBy === "priceAsc") {
//     filteredProducts = orderBy(products, ["price"], ["asc"]);
//   }

//   // FILTER PRODUCTS

//   if (filters.gender) {
//     filteredProducts = products.filter((product) =>
//       filters.gender.includes(product.gender)
//     );
//   }

//   if (filters.category !== "All") {
//     filteredProducts = products.filter(
//       (product) => product.category === filters.category
//     );
//   }

//   // if (filters.category === "All") {
//   //   filteredProducts = products;
//   // }
//   if (filters.priceRange) {
//     filteredProducts = products.filter((product) => {
//       if (filters.priceRange === "below") {
//         return product.price < 25;
//       }
//       if (filters.priceRange === "between") {
//         return product.price >= 25 && product.price <= 75;
//       }
//       return product.price > 75;
//     });
//   }
//   if (filters.searchQuery) {
//     filteredProducts = products.filter((product) =>
//       product.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
//     );
//   }
//   return filteredProducts;
// }

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

export default HomePage;
