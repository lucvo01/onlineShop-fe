import React, { useCallback, useEffect } from "react";
import { Box, Card, alpha, Stack } from "@mui/material";
import { FormProvider, FTextField } from "./form";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { editProduct } from "./slices/productsSlice";
import { LoadingButton } from "@mui/lab";
// import useAuth from "../../hooks/useAuth";
import apiService from "../app/apiService";

const yupSchema = Yup.object().shape({
  content: Yup.string().required("Content is required")
});

const defaultValues = {
  content: "",
  image: null
};

function ProductEditForm({ productId }) {
  const { isLoading } = useSelector((state) => state.prouducts);
  
let product;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiService.get(`/products/${productId}`);
        product = res.data.data
      } catch (error) {
        console.log(error);
      }
    };
    fetchData(); 
  }, [productId]);

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

  // const { user } = useAuth();
  // const productId = product._id;
  const onSubmit = (data) => {
    dispatch(editProduct({ ...data, productId }));
  };

  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <FTextField
            name="content"
            multiline
            fullWidth
            rows={4}
            placeholder={product.name}
            sx={{
              "& fieldset": {
                borderWidth: `1px !important`,
                borderColor: alpha("#919EAB", 0.32)
              }
            }}
          />

          {/* <FUploadImage
            name="image"
            accept="image/*"
            maxSize={3145728}
            onDrop={handleDrop}
          /> */}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end"
            }}>
            <LoadingButton
              type="submit"
              variant="contained"
              size="small"
              loading={isSubmitting || isLoading}>
              Post
            </LoadingButton>
          </Box>
        </Stack>
      </FormProvider>
    </Card>
  );
}

export default ProductEditForm;