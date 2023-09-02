import React from "react";
import { Box, Card, Stack } from "@mui/material";
import { FormProvider, FSelect } from "../form";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { editOrder } from "../slices/ordersSlice";

const yupSchema = Yup.object().shape({
  // content: Yup.string().required("Content is required")
});

function OrderEditForm({ orderId }) {
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.products);
  const { pageNum } = useSelector((state) => state.orders);

  const defaultValues = {
    payment_status: "Unpaid",
    delivery_status: "Pending"
  };

  const methods = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues
  });
  const {
    handleSubmit,

    formState: { isSubmitting }
  } = methods;

  const dispatch = useDispatch();

  const handleClose = () => {
    navigate(-1);
  };

  const onSubmit = (data) => {
    dispatch(editOrder({ orderId, pageNum, ...data }));
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
