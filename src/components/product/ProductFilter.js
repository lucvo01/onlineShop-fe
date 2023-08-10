import { Box, Button, Stack, Typography, Paper } from "@mui/material";
import { FMultiCheckbox, FRadioGroup } from "../form";
import ClearAllIcon from "@mui/icons-material/ClearAll";
// import SearchInput from "../SearchInput";

export const SORT_BY_OPTIONS = [
  { value: "priceDesc", label: "Price: High-Low" },
  { value: "priceAsc", label: "Price: Low-High" }
];

export const FILTER_GENDER_OPTIONS = ["Male", "Female"];

export const FILTER_CATEGORY_OPTIONS = ["Shoes", "Shirt", "Pants"];

// export const FILTER_PRICE_OPTIONS = [
//   { value: "below", label: "Below $25" },
//   { value: "between", label: "Between $25 - $75" },
//   { value: "above", label: "Above $75" }
// ];

function ProductFilter({ resetFilter }) {
  return (
    <Stack spacing={3} sx={{ width: 200 }}>
      <Stack>
        <Paper sx={{ p: "1rem", borderRadius: "10px" }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Gender
          </Typography>
          <FMultiCheckbox
            name="gender"
            options={FILTER_GENDER_OPTIONS}
            sx={{ width: 1 }}
          />
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

      {/* <Stack spacing={1}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Price
        </Typography>
        <FRadioGroup
          name="priceRange"
          options={FILTER_PRICE_OPTIONS.map((item) => item.value)}
          getOptionLabel={FILTER_PRICE_OPTIONS.map((item) => item.label)}
        />
      </Stack> */}

      <Box>
        <Button
          size="large"
          type="submit"
          color="inherit"
          variant="outlined"
          onClick={resetFilter}
          startIcon={<ClearAllIcon />}
        >
          Clear All
        </Button>
      </Box>
    </Stack>
  );
}

export default ProductFilter;
