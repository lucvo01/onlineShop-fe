import React, { useCallback, useEffect } from "react";
import { Box, Card, alpha, Stack, InputAdornment } from "@mui/material";
import { FCheckbox, FormProvider, FSelect, FTextField } from "../form";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { createProduct, editProduct } from "../slices/productsSlice";
import { LoadingButton } from "@mui/lab";
import FUploadImage from "../form/FUploadImage";
import { useNavigate, useParams } from "react-router-dom";
import { editOrder } from "../slices/ordersSlice";

const yupSchema = Yup.object().shape({
  // content: Yup.string().required("Content is required")
});

const defaultValues = {
  payment_status: "Unpaid",
  delivery_status: "Pending"
};

function OrderEditForm({ orderId }) {
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.products);
  // const { orderId } = useParams();

  const methods = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues
  });
  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors }
  } = methods;

  const dispatch = useDispatch();

  const handleClose = () => {
    navigate(-1);
  };

  const onSubmit = (data) => {
    // console.log(data);
    dispatch(editOrder({ orderId, ...data }));
    handleClose();
  };

  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <FSelect
            name="payment_status"
            label="Payment Status"
            defaultValues={"Select Payment Status"}
          >
            <option disabled>Select Payment Status</option>
            <option>Paid</option>
            <option>Unpaid</option>
          </FSelect>
          <FSelect
            name="delivery_status"
            label="Delivery Status"
            defaultValues={"Select Delivery Status"}
          >
            <option disabled>Select Delivery Status</option>
            <option>Pending</option>
            <option>Shipped</option>
            <option>Delivered</option>
          </FSelect>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end"
            }}
          >
            <LoadingButton
              type="submit"
              variant="contained"
              size="small"
              loading={isSubmitting || isLoading}
            >
              Submit
            </LoadingButton>
          </Box>
        </Stack>
      </FormProvider>
    </Card>
  );
}

export default OrderEditForm;
