import * as React from "react";
import Box from "@mui/material/Box";
import { Slider, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { setPriceRange } from "../slices/filterSlice";

export default function ProductPriceSlider({ sliderValue, setSliderValue }) {
  const dispatch = useDispatch();

  const handleChange = (event, value) => {
    setSliderValue(value);
  };

  const handleClick = () => {
    dispatch(setPriceRange(sliderValue));
  };

  return (
    <Box>
      <Slider
        getAriaLabel={() => "Price range"}
        value={sliderValue}
        step={10}
        onChange={handleChange}
        max={200}
        min={0}
        valueLabelDisplay="auto"
      />
      <Button onClick={handleClick} variant="contained">
        Filter
      </Button>
    </Box>
  );
}
