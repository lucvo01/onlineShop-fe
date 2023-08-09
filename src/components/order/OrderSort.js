import React from "react";
import { FSelect } from "../form";

function OrderSort() {
  return (
    <FSelect
      name="delivery_status"
      label="Delivery Status"
      size="small"
      sx={{ width: 300 }}
    >
      {[
        { value: "", label: "All" },
        { value: "Pending", label: "Pending" },
        { value: "Shipped", label: "Shipped" },
        { value: "Delivered", label: "Delivered" }
      ].map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </FSelect>
  );
}

export default OrderSort;
