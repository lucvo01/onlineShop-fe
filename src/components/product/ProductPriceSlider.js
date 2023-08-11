import * as React from "react";
import Box from "@mui/material/Box";
import { Slider, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { getProducts } from "../slices/productsSlice";

export default function ProductPriceSlider() {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState([0, 200]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // console.log("value", value);
  };

  const handleClick = () => {
    dispatch(getProducts({ priceRange: value }));
  };

  return (
    <Box>
      <Slider
        getAriaLabel={() => "Price range"}
        value={value}
        step={10}
        onChange={handleChange}
        max={200}
        min={0}
        valueLabelDisplay="auto"
        // getAriaValueText={valuetext}
      />
      <Button onClick={handleClick}>Filter</Button>
    </Box>
  );
}
