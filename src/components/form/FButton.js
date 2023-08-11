import { useFormContext, Controller } from "react-hook-form";
import { Button, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { useState, useEffect } from "react";

function FButton({ name, options, ...other }) {
  const { control } = useFormContext();
  // const [clicked, setClicked] = useState(false);

  // const onClick = () => {
  //   setValue(`${name}`, value);
  //   setClicked(true);
  // };

  return (
    // <Controller
    //   name={name}
    //   control={control}
    //   render={({ field, fieldState: { error } }) => (
    //     <Button
    //       onClick={onClick}
    //       style={{ backgroundColor: clicked ? "blue" : "initial" }}
    //       {...other}
    //     >
    //       {value}
    //     </Button>
    //   )}
    // />
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, ...fieldProps } }) => (
        <ToggleButtonGroup
          {...fieldProps}
          value={value}
          exclusive
          onChange={(event, newValue) => onChange(newValue)}
          aria-label="text alignment"
          // sx={{ gap: 3 }}
        >
          {options.map((option) => (
            <ToggleButton
              variant="outlined"
              key={option.value}
              value={option.value}
              aria-label={`${option.value} aligned`}
              // sx={{ marginLeft: 3 }}
            >
              {option.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      )}
    />
  );
}

export default FButton;
