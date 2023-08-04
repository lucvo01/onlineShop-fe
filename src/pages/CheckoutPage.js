import { Grid, Stack } from "@mui/material";
import React from "react";
import { FSelect, FTextField, FormProvider } from "../components/form";
import { LoadingButton } from "@mui/lab";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../components/slices/ordersSlice";
import useAuth from "../hooks/useAuth";

import { useNavigate } from "react-router-dom";

const shippingSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.number().required("Phone number is required"),
  shipping: Yup.string().required("Shipping address is required"),
  payment_method: Yup.string().required("Payment method is required")
});

function CheckoutPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => {
    return state.orders;
  });
  const { subtotal, products } = useSelector((state) => state.cart);
  const { user } = useAuth();

  const defaultValues = {
    email: user?.data.email || "",
    phone: user?.data.phone || "",
    shipping: user?.data.address || ""
  };

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
    try {
      // console.log(user.data._id);
      dispatch(
        createOrder({
          ...data,
          userId: user.data._id,
          subtotal,
          products
        })
      );
      navigate("/orders");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid
      container
      spacing={3}
      sx={{ mt: "3rem", display: "flex", justifyContent: "center" }}
    >
      <Grid item xs={8} md={8}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <FTextField name="email" label="Email" />
            <FTextField name="phone" label="Phone Number" />
            <FTextField name="shipping" label="Shipping address" />
            <FSelect
              name="payment_method"
              label="Payment Method"
              required
              defaultValue={"Select Payment Method"}
            >
              <option disabled>Select Payment Method</option>
              <option>Cash On Delivery</option>
              <option>Credit Card</option>
            </FSelect>
          </Stack>

          <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting || isLoading}
            >
              Place Order
            </LoadingButton>
          </Stack>
        </FormProvider>
      </Grid>
    </Grid>
  );
}

export default CheckoutPage;
