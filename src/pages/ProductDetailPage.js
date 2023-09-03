import { useEffect, useState } from "react";
import {
  Card,
  Grid,
  Container,
  Typography,
  Box,
  Stack,
  Rating,
  Divider,
  Breadcrumbs,
  Link,
  Chip
} from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";
import { fCurrency } from "../utils";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import apiService from "../app/apiService";
import LoadingScreen from "../components/LoadingScreen";
import { Alert } from "@mui/material";
import AddToCartButton from "../components/cart/AddToCartButton";
import Cookies from "js-cookie";
import ProductSizeSelection from "../components/product/ProductSizeSelection";
import { FormProvider } from "../components/form";
import { useForm } from "react-hook-form";

function ProductDetailPage() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const params = useParams();

  const cookie = Cookies.get("user");
  let user;
  if (cookie) {
    user = JSON.parse(Cookies.get("user"));
  }
  const isAdmin = user && user.isAdmin;

  useEffect(() => {
    if (params.id) {
      const getProduct = async () => {
        setLoading(true);
        try {
          const res = await apiService.get(`/products/${params.id}`);
          setProduct(res.data.data);
          setError("");
        } catch (error) {
          console.log(error);
          setError(error.message);
        }
        setLoading(false);
      };
      getProduct();
    }
  }, [params]);

  const defaultValues = { size: "S" };

  const methods = useForm({
    defaultValues
  });

  const { watch } = methods;
  const filters = watch();
  const { size } = filters;

  return (
    <Container sx={{ my: 3 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
        <Link underline="hover" color="inherit" component={RouterLink} to="/">
          Online Shop
        </Link>
        <Typography color="text.primary">{product?.name}</Typography>
      </Breadcrumbs>
      <Box sx={{ position: "relative", height: 1 }}>
        {loading ? (
          <LoadingScreen />
        ) : (
          <>
            {error ? (
              <Alert severity="error">{error}</Alert>
            ) : (
              <>
                {product && (
                  <Card>
                    <Grid container>
                      <Grid item xs={12} md={6}>
                        <Box p={2}>
                          <Box
                            sx={{
                              borderRadius: 2,
                              overflow: "hidden",
                              display: "flex"
                            }}
                          >
                            <Box
                              component="img"
                              sx={{
                                width: 1,
                                height: 1
                              }}
                              src={product.image}
                              alt="product"
                            />
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography
                          variant="h6"
                          sx={{
                            mt: 2,
                            mb: 1,
                            display: "block",
                            textTransform: "uppercase",
                            color:
                              product.status === "sale"
                                ? "error.main"
                                : "info.main"
                          }}
                        >
                          {product.status}
                        </Typography>
                        <Typography variant="h5" paragraph>
                          {product.name}
                        </Typography>
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={1}
                          sx={{ mb: 2 }}
                        >
                          <Rating
                            value={product.totalRating}
                            precision={0.1}
                            readOnly
                          />
                          <Typography
                            variant="body2"
                            sx={{ color: "text.secondary" }}
                          >
                            ({product.totalReview} reviews)
                          </Typography>
                        </Stack>
                        <Typography variant="h4" sx={{ mb: 3 }}>
                          <Box
                            component="span"
                            sx={{
                              color: "text.disabled",
                              textDecoration: "line-through"
                            }}
                          >
                            {product.priceSale && fCurrency(product.priceSale)}
                          </Box>
                          &nbsp;{fCurrency(product.price)}
                        </Typography>

                        <Divider sx={{ borderStyle: "dashed" }} />
                        <Box>
                          <ReactMarkdown
                            rehypePlugins={[rehypeRaw]}
                            children={product.description}
                          />
                          <Chip label={product.gender} />
                          <Chip label={product.category} />
                        </Box>
                        {isAdmin ? null : (
                          <>
                            <Box mt={3}>
                              <FormProvider methods={methods}>
                                <ProductSizeSelection />
                              </FormProvider>
                            </Box>
                            <Box mt={3}>
                              <AddToCartButton
                                product={product}
                                size={size}
                                display={"Add To Cart"}
                                // size={"large"}
                              />
                            </Box>
                          </>
                        )}
                      </Grid>
                    </Grid>
                  </Card>
                )}
                {!product && (
                  <Typography variant="h6">404 Product not found</Typography>
                )}
              </>
            )}
          </>
        )}
      </Box>
    </Container>
  );
}

export default ProductDetailPage;
