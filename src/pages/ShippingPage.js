import { Grid, Stack } from "@mui/material";
import React from "react";
import { FSelect, FTextField, FormProvider } from "../components/form";
import { LoadingButton } from "@mui/lab";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createOrder,
  getSingleUserOrders
} from "../components/slices/ordersSlice";
// import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
// import { useUserState } from "../contexts/AuthContext";
import Cookies from "js-cookie";
import PaypalButton from "../components/cart/PaypalButton";
import { addShippingAddress } from "../components/slices/cartSlice";

const shippingSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.number().required("Phone number is required"),
  address: Yup.string().required("Shipping address is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required")
  // payment_method: Yup.string().required("Payment method is required")
});

function ShippingPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => {
    return state.orders;
  });
  const { subtotal, products } = useSelector((state) => state.cart);

  // const auth = useAuth();
  // const { user } = useUserState();
  // console.log(useAuth());

  const cookies = Cookies.get("user");
  let user;
  if (cookies) {
    user = JSON.parse(cookies);
    // console.log("storedUser", user);
  }

  const defaultValues = {
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    city: "",
    state: ""
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
      console.log(user);
      // dispatch(
      //   createOrder({
      //     ...data,
      //     userId: user._id || null,
      //     subtotal,
      //     products
      //   })
      // );
      // dispatch(getSingleUserOrders({ userId: user._id }));
      // navigate("/my_order");
      console.log(data);
      dispatch(addShippingAddress({ ...data }));
      navigate("/placeorder");
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
            <FTextField name="address" label="Address" />
            <FTextField name="city" label="City" />
            <FTextField name="state" label="State" />
            <FSelect
              name="payment_method"
              label="Payment Method"
              required
              defaultValue={"Select Payment Method"}
            >
              <option disabled>Select Payment Method</option>
              <option>Cash On Delivery</option>
              <option>Paypal</option>
            </FSelect>
            {/* <PaypalButton /> */}
          </Stack>

          <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting || isLoading}
            >
              Continue
            </LoadingButton>
          </Stack>
        </FormProvider>
      </Grid>
    </Grid>
  );
}

export default ShippingPage;
