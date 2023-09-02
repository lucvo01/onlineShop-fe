import React from "react";
import { Grid, Card, Stack, Container } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, FTextField } from "../../components/form";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "../slices/usersSlice";
import Cookies from "js-cookie";
import LoadingScreen from "../LoadingScreen";

const UpdateUserSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  address: yup.string(),
  city: yup.string(),
  state: yup.string(),
  phone: yup.number()
});

function AccountGeneral() {
  const user = JSON.parse(Cookies.get("user"));

  const isLoading = false;

  const defaultValues = {
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    city: user?.city || "",
    state: user?.state || ""
  };

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues
  });
  const {
    handleSubmit,
    formState: { isSubmitting }
  } = methods;

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(updateUserProfile({ userId: user._id, ...data }));
  };

  return (
    <Container>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Card sx={{ p: 3 }}>
                  <Stack spacing={3}>
                    <FTextField name="name" label="Name" />
                    <FTextField name="email" label="Email" disabled />
                    <FTextField name="address" label="Address" />
                    <FTextField name="city" label="City" />
                    <FTextField name="state" label="State" />
                    <FTextField name="phone" label="Phone Number" />
                  </Stack>

                  <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      loading={isSubmitting || isLoading}
                    >
                      Save Changes
                    </LoadingButton>
                  </Stack>
                </Card>
              </Grid>
            </Grid>
          </FormProvider>
        </>
      )}
    </Container>
  );
}

export default AccountGeneral;
