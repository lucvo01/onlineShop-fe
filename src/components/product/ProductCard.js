import * as React from "react";
import { Card } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Stack, CardActions, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fCurrency } from "../../utils";
import AddToCartButton from "../cart/AddToCartButton";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import Cookies from "js-cookie";

function ProductCard({ product, hideButton }) {
  const theme = useTheme();

  const StyledCard = styled(Card)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    transition: "transition 0.2s",
    "&:hover": {
      transform: "scale(1.1)",
      zIndex: 1
    },
    borderRadius: "10px",
    border: `1px solid ${theme.palette.primary.light}`
  });

  const cookie = Cookies.get("user");
  let user;
  if (cookie) {
    user = JSON.parse(Cookies.get("user"));
  }
  const isAdmin = user && user.isAdmin;

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
          // width="300"
          image={product.image}
          alt="green iguana"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="body1"
            component="div"
            noWrap
            // sx={{
            //   textOverflow: "ellipsis",
            //   overflow: "hidden",
            //   whiteSpace: "nowrap"
            // }}
          >
            {product.name}
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            {fCurrency(product.price)}
          </Typography>
          <Stack direction="row" spacing={0.5}>
            <Chip label={product.gender} />
            <Chip label={product.category} />
          </Stack>
          <Stack></Stack>
        </CardContent>
      </CardActionArea>
      {isAdmin ? null : (
        <CardActions>
          <AddToCartButton
            product={product}
            display={"Add to cart"}
            hideButton={hideButton}
          />
        </CardActions>
      )}
    </StyledCard>
  );
}

export default ProductCard;
