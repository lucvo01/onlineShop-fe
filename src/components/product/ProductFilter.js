import { Box, Button, Stack, Typography, Paper } from "@mui/material";
import { FRadioGroup } from "../form";
import ClearAllIcon from "@mui/icons-material/ClearAll";
// import SearchInput from "../SearchInput";
import { useDispatch, useSelector } from "react-redux";
import { setGender } from "../slices/genderSlice";
import { useNavigate } from "react-router-dom";
import ProductPriceSlider from "./ProductPriceSlider";
import FSlider from "../form/FSlider";
import FButton from "../form/FButton";

export const SORT_BY_OPTIONS = [
  { value: "priceDesc", label: "Price: High-Low" },
  { value: "priceAsc", label: "Price: Low-High" }
];

export const FILTER_CATEGORY_OPTIONS = ["Shoes", "Shirt", "Pants"];

export const FILTER_GENDER_OPTIONS = [
  { value: "male", label: "Men" },
  { value: "female", label: "Women" }
];

function ProductFilter({ resetFilter, handleSubmit, setValue }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickMen = () => {
    dispatch(setGender("male"));
    navigate("/shop");
  };

  const handleClickWonen = () => {
    dispatch(setGender("female"));
    navigate("/shop");
  };
  return (
    <Stack spacing={3} sx={{ width: 200 }}>
      <Stack spacing={3}>
        <Paper
          sx={{
            p: "1rem",
            borderRadius: "10px",
            display: "flex"
          }}
        >
          <Button onClick={handleClickMen} variant="contained" size="large">
            Men
          </Button>
          <Button onClick={handleClickWonen} variant="contained" size="large">
            Women
          </Button>
        </Paper>
      </Stack>

      <Stack>
        <Paper sx={{ p: "1rem", borderRadius: "10px" }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Category
          </Typography>
          <FRadioGroup
            name="category"
            options={FILTER_CATEGORY_OPTIONS}
            row={false}
          />
        </Paper>
      </Stack>
      <Stack>
        <Paper sx={{ p: "1rem", borderRadius: "10px" }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Price Range
          </Typography>
          {/* <ProductPriceSlider /> */}
          <FSlider
            name="sliderValue"
            min={0}
            max={200}
            step={10}
            onchange={setValue}
          />
        </Paper>
      </Stack>

      <Box>
        <Button
          size="large"
          type="submit"
          color="inherit"
          variant="outlined"
          onClick={() => {
            dispatch(setGender(""));
            resetFilter();
          }}
          startIcon={<ClearAllIcon />}
        >
          Clear All
        </Button>
      </Box>
    </Stack>
  );
}

export default ProductFilter;
