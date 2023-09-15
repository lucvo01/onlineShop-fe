import { useFormContext, Controller } from "react-hook-form";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";

function FButton({ name, options, ...other }) {
  const { control } = useFormContext();

  return (
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
        >
          {options.map((option) => (
            <ToggleButton
              variant="outlined"
              key={option.value}
              value={option.value}
              aria-label={`${option.value} aligned`}
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
