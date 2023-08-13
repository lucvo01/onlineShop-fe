import React, { useCallback } from "react";
import { Box, Card, alpha, Stack, InputAdornment } from "@mui/material";
import { FormProvider, FSelect, FTextField } from "../form";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { createProduct, editProduct } from "../slices/productsSlice";
import { LoadingButton } from "@mui/lab";
import FUploadImage from "../form/FUploadImage";
import { useNavigate } from "react-router-dom";

const yupSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  category: Yup.string().required("category is required"),
  gender: Yup.string().required("gender is required"),
  price: Yup.string().required("Price is required")
});

function ProductEditForm({ productId }) {
  const navigate = useNavigate();
  const { products, isLoading, page } = useSelector((state) => state.products);

  const product = products.find((e) => e._id === productId);

  const defaultValues = {
    name: product?.name || "",
    description: product?.description || "",
    category: product?.category || "",
    gender: product?.gender || "",
    price: product?.price || "",
    image: product?.image || null
  };

  const methods = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues
  });
  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting }
  } = methods;

  const dispatch = useDispatch();

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          "image",
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        );
      }
    },
    [setValue]
  );
  const handleClose = () => {
    navigate(-1);
  };

  const onSubmit = (data) => {
    console.log(data);
    if (productId) {
      // console.log(`Update Product ${productId}`);
      dispatch(editProduct({ ...data, productId, page }));
      handleClose();
    } else {
      // console.log(`Create Product`);
      dispatch(createProduct({ ...data, page }));
      handleClose();
    }
  };

  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <FTextField
            name="name"
            label="Name"
            fullWidth
            rows={4}
            sx={{
              "& fieldset": {
                borderWidth: `1px !important`,
                borderColor: alpha("#919EAB", 0.32)
              }
            }}
          />
          <FTextField
            name="description"
            label="Description"
            multiline
            fullWidth
            rows={4}
            sx={{
              "& fieldset": {
                borderWidth: `1px !important`,
                borderColor: alpha("#919EAB", 0.32)
              }
            }}
          />
          <FSelect
            name="category"
            label="Category"
            fullWidth
            defaultValues={"Select Category"}
          >
            <option disabled>Select Category</option>
            <option>shirt</option>
            <option>pants</option>
            <option>shoes</option>
          </FSelect>
          <FSelect
            name="gender"
            label="Gender"
            fullWidth
            defaultValues={"Select Gender"}
          >
            <option disabled>Select Gender</option>
            <option>male</option>
            <option>female</option>
          </FSelect>

          <FTextField
            name="price"
            label="Price"
            fullWidth
            rows={4}
            // placeholder={product.name}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              )
            }}
            sx={{
              "& fieldset": {
                borderWidth: `1px !important`,
                borderColor: alpha("#919EAB", 0.32)
              }
            }}
          />
          <FUploadImage
            name="image"
            accept="image/*"
            maxSize={3145728}
            onDrop={handleDrop}
          />

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

export default ProductEditForm;
