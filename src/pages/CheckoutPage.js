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
import { createOrder } from "../components/slices/ordersSlice";
import useAuth from "../hooks/useAuth";
import { clearCart } from "../components/slices/cartSlice";
import CartPage from "./CartPage";
import ProductCard from "../components/ProductCard";
import CartProductCard from "../components/CartProductCard";
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
    console.log("state.orders", state.orders);
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
    let { shipping, payment_status } = data;
    // console.log("payment_status", payment_status);
    dispatch(
      createOrder({ userId, shipping, subtotal, products, payment_status })
    );
    dispatch(clearCart());
    // navigate("/");
  };
  console.log("is submit", isSubmitting, isLoading);
  return (
    <Container maxWidth="md" sx={{ mt: "5rem" }}>
      <Box>
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
            <FSelect name="payment_status">
              <option></option>
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
            Submit
          </LoadingButton>
        </FormProvider>
      </Box>
      <Box>
        {products.map((item) => {
          return <CartProductCard key={item._id} product={item} />;
        })}
      </Box>
    </Container>
  );
}

export default CheckoutPage;
