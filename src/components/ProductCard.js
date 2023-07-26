import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fCurrency } from "../utils";
// import AddToCartButton from "./AddToCartButton";
// import DeccreaseButton from "./DeccreaseButton";
// import RemoveItemButton from "./RemoveItemButton";

function ProductCard({ product }) {
  const navigate = useNavigate();
  return (
    <Card>
      <CardActionArea onClick={() => navigate(`/product/${product._id}`)}>
        <CardMedia
          component="img"
          height="200"
          image={product.image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="body1" component="div" noWrap>
            {product.name}
          </Typography>
          <Stack
            direction="row"
            spacing={0.5}
            alignItems="center"
            justifyContent="flex-end"
          >
            <Typography variant="subtitle1">
              {fCurrency(product.price)}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
      {/* <AddToCartButton product={product} display={"Add"} /> */}
      {/* <DeccreaseButton product={product} />
      <RemoveItemButton product={product} /> */}
    </Card>
  );
}

export default ProductCard;
