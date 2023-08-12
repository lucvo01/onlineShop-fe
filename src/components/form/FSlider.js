import { useFormContext, Controller } from "react-hook-form";
import { Slider, Button } from "@mui/material";
import * as React from "react";

function FSlider({ name, ...other }) {
  const { control } = useFormContext();
  const [value, setValue] = React.useState([0, 200]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // console.log("value", value);
  };

  const handleClick = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[0, 200]}
      render={({ field }) => (
        <>
          <Slider
            {...field}
            getAriaLabel={() => name}
            valueLabelDisplay="auto"
            // onChange={handleChange}
            {...other}
          />
          <Button onClick={() => setValue}>Filter</Button>
        </>
      )}
    />
  );
}

export default FSlider;
