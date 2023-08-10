import * as React from "react";
import { Card } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Stack, CardActions } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fCurrency } from "../../utils";
import AddToCartButton from "../cart/AddToCartButton";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "relative",
  transition: "transition 0.2s",
  "&:hover": {
    transform: "scale(1.2)",
    zIndex: 1
  },
  borderRadius: "10px"
});

function ProductCard({ product, hideButton }) {
  const navigate = useNavigate();
  return (
    <StyledCard>
      <CardActionArea
        onClick={() => navigate(`/product/${product._id}`)}
        sx={{ p: "1rem" }}
      >
        <CardMedia
          sx={{ borderRadius: "15px" }}
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
      <CardActions disableSpacing>
        <AddToCartButton
          product={product}
          display={"Add to cart"}
          hideButton={hideButton}
        />
      </CardActions>
    </StyledCard>
  );
}

export default ProductCard;
