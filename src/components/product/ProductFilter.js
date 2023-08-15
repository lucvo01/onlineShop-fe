import { Button, Stack, Typography, Paper } from "@mui/material";
import { FRadioGroup } from "../form";
import ClearAllIcon from "@mui/icons-material/ClearAll";
// import SearchInput from "../SearchInput";
import { useDispatch } from "react-redux";
import { setGender } from "../slices/filterSlice";
import { useNavigate } from "react-router-dom";
import ProductPriceSlider from "./ProductPriceSlider";
// import SearchInput from "../SearchInput";
// import ProductSearch from "./ProductSearch";
// import { getProducts } from "../slices/productsSlice";
// import SearchInput from "../SearchInput";

export const SORT_BY_OPTIONS = [
  { value: "priceDesc", label: "Price: High-Low" },
  { value: "priceAsc", label: "Price: Low-High" }
];

export const FILTER_CATEGORY_OPTIONS = [
  "Shirts",
  "Tshirts",
  "Jeans",
  "Shorts",
  "Sandals",
  "Sunglasses"
];

// export const FILTER_GENDER_OPTIONS = [
//   { value: "male", label: "Men" },
//   { value: "female", label: "Women" }
// ];

const buttonStyle = {
  common: {
    size: "large",
    variant: "contained",
    width: "100%"
  },
  male: {
    backgroundColor: "#e0e0eb",
    color: "white"
  },
  female: {
    backgroundColor: "#e0e0eb",
    color: "white"
  }
};

function ProductFilter({ resetFilter, sliderValue, setSliderValue, gender }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { page } = useSelector((state) => state.products);

  const handleClickMen = () => {
    dispatch(setGender("men"));
    navigate("/shop");
  };

  const handleClickWonen = () => {
    dispatch(setGender("women"));
    navigate("/shop");
  };
  return (
    <Stack spacing={3}>
      <Stack spacing={3}>
        <Paper>
          {/* <ProductSearch /> */}
          {/* <SearchInput /> */}
        </Paper>

        <Paper
          sx={{
            p: "1rem",
            borderRadius: "10px",
            display: "flex",
            flexDirection: { xs: "row", md: "column" },
            gap: 3
          }}
        >
          <Button
            onClick={handleClickMen}
            variant="contained"
            size="large"
            sx={{
              ...buttonStyle.common,
              ...(gender === "male" ? buttonStyle.male : {})
            }}
          >
            Men
          </Button>
          <Button
            onClick={handleClickWonen}
            variant="contained"
            size="large"
            sx={{
              ...buttonStyle.common,
              ...(gender === "female" ? buttonStyle.male : {})
            }}
          >
            Women
          </Button>
        </Paper>
      </Stack>

      <Stack
        sx={{
          display: "flex",
          gap: 3,
          flexDirection: { xs: "row", md: "column" },
          justifyContent: "center"
        }}
      >
        <Paper
          sx={{
            p: "1rem",
            borderRadius: "10px"
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Category
          </Typography>
          <FRadioGroup
            name="category"
            options={FILTER_CATEGORY_OPTIONS}
            row={false}
          />
        </Paper>

        <Paper
          sx={{
            p: "1rem",
            borderRadius: "10px"
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Price Range
          </Typography>
          <ProductPriceSlider
            sliderValue={sliderValue}
            setSliderValue={setSliderValue}
          />
        </Paper>
      </Stack>
      <Button
        size="large"
        type="submit"
        color="inherit"
        variant="outlined"
        onClick={() => {
          // dispatch(setGender(""));
          resetFilter();
          // dispatch(getProducts(page));
          console.log("test");
        }}
        startIcon={<ClearAllIcon />}
      >
        Clear All
      </Button>
    </Stack>
  );
}

export default ProductFilter;
