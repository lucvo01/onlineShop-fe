import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";

function ProductList({ products, loading }) {
  return (
    <Grid container spacing={2} mt={1}>
      {products.map((product, index) => (
        <Grid key={product._id} item xs={6} md={4} lg={3}>
          <ProductCard product={product} displayAddButton={"Add To Cart"} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductList;
