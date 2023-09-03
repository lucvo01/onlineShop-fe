import React from "react";
import { FSelect } from "../form";

function ProductSizeSelection() {
  return (
    <FSelect name="size" label="Size" size="small" sx={{ display: "flex" }}>
      {[
        { value: "S", label: "S" },
        { value: "M", label: "M" },
        { value: "L", label: "L" },
        { value: "XL", label: "XL" }
      ].map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </FSelect>
  );
}

export default ProductSizeSelection;
