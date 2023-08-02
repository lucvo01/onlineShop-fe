import { Box, Container, Stack } from "@mui/material";
import React from "react";
import {
  FCheckbox,
  FMultiCheckbox,
  FSelect,
  FTextField,
  FormProvider
} from "../components/form";
import { LoadingButton } from "@mui/lab";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createOrder,
  getSingleUserOrders
} from "../components/slices/ordersSlice";
import useAuth from "../hooks/useAuth";
import { clearCart } from "../components/slices/cartSlice";
import CartPage from "./CartPage";
import CartProductCard from "../components/cart/CartProductCard";
import { useNavigate } from "react-router-dom";

const shippingSchema = Yup.object().shape({
  // email: Yup.string().email("Invalid email").required("Email is required"),
  shipping: Yup.string().required("Shipping address is required")
});

const defaultValues = {
  shipping: ""
};

function CheckoutPage() {
  const navigate = useNavigate;
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => {
    return state.orders;
  });
  const { subtotal, products } = useSelector((state) => state.cart);
  const auth = useAuth();
  const user = auth.user;
  let userId;
  if (user) userId = user._id;

  const methods = useForm({
    resolver: yupResolver(shippingSchema),
    defaultValues
  });

  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting }
  } = methods;

  const onSubmit = async (data) => {
    let { shipping, payment_method } = data;
    dispatch(
      createOrder({
        userId,
        shipping,
        subtotal,
        products,
        payment_method
      })
    );
    dispatch(clearCart());
    // navigate(`/order/${orderId}`);
    dispatch(getSingleUserOrders(userId));
  };
  return (
    <Container
      maxWidth="md"
      sx={{ mt: "5rem", display: "flex", height: "100vh" }}
    >
      <Box sx={{ flex: "2", padding: "20px" }}>
        {products.map((item) => {
          return <CartProductCard key={item._id} product={item} />;
        })}
      </Box>
      <Box sx={{ flex: "1", padding: "20px" }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <FTextField name="shipping" label="Shipping address" />
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ my: 2 }}
          >
            <FSelect name="payment_method" required>
              <option disabled selected>
                Select Payment Method
              </option>
              <option>Cash On Delivery</option>
              <option>Credit Card</option>
            </FSelect>
            {/* <FCheckbox name="payment_status" label="Cash On Delivery" /> */}
            {/* <Link component={RouterLink} variant="subtitle2" to="/">
              Forgot password?
            </Link> */}
          </Stack>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting || isLoading}
          >
            Place Order
          </LoadingButton>
        </FormProvider>
      </Box>
    </Container>
  );
}

export default CheckoutPage;
