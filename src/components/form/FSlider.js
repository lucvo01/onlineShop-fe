import { useFormContext, Controller } from "react-hook-form";
import { Slider } from "@mui/material";

function FSlider({ name, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name} // This should match the field name in the form data
      control={control}
      defaultValue={[0, 100]} // Initial value of the Slider
      render={({ field }) => (
        <Slider
          {...field}
          getAriaLabel={() => name}
          valueLabelDisplay="auto"
          //   min={0}
          //   max={100}
          {...other}
        />
      )}
    />
  );
}

export default FSlider;
