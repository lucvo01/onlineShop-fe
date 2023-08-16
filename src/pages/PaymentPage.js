import { Grid, Stack } from "@mui/material";
import React from "react";
import { FSelect, FormProvider } from "../components/form";
import { LoadingButton } from "@mui/lab";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
import { addShippingAddress } from "../components/slices/cartSlice";

const shippingSchema = Yup.object().shape({
  payment_method: Yup.string().required("Payment method is required")
});

function PaymentPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => {
    return state.orders;
  });
  // const { subtotal, products } = useSelector((state) => state.cart);

  // const cookies = Cookies.get("user");
  // let user;
  // if (cookies) {
  //   user = JSON.parse(cookies);
  //   // console.log("storedUser", user);
  // }

  const defaultValues = {};

  const methods = useForm({
    resolver: yupResolver(shippingSchema),
    defaultValues
  });

  const {
    handleSubmit,

    formState: { isSubmitting }
  } = methods;

  const onSubmit = async (data) => {
    try {
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

export default PaymentPage;
