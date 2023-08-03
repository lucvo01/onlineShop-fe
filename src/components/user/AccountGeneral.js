import React from "react";
import { Box, Grid, Card, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import useAuth from "../../hooks/useAuth";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, FTextField, FUploadAvatar } from "../../components/form";
import { fData } from "../../utils/numberFormat";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../slices/userSlice";

const UpdateUserSchema = yup.object().shape({
  name: yup.string().required("Name is required")
});

function AccountGeneral() {
  const { user } = useAuth();
  // const isLoading = useSelector((state) => state.user.isLoading);
  const isLoading = false;

  const defaultValues = {
    name: user?.data.name || "",
    email: user?.data.email || "",
    phoneNumber: user?.data.phoneNumber || "",
    address: user?.data.address || ""
  };

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues
  });
  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting }
  } = methods;

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(updateUserProfile({ userId: user._id, ...data }));
  };

  return (
  
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack 
                spacing ={3}
              >
                <FTextField name="name" label="Name" placeholder={user?.data.name} />
                <FTextField name="email" label="Email" disabled />
                <FTextField name="address" label="Address" />
                <FTextField name="phoneNumber" label="Phone Number" />
              </Stack>

              <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
                <FTextField
                  name="aboutMe"
                  multiline
                  rows={4}
                  label="About Me"
                />

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
 
  );
}

export default AccountGeneral;
