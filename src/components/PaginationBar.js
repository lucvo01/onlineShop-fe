import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const PaginationBar = ({ pageNum, setPageNum, totalPages }) => {
  const handleChange = (event, value) => {
    setPageNum(value);
  };

  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPages}
        page={pageNum}
        onChange={handleChange}
        showFirstButton
        showLastButton
      />
    </Stack>
  );
};

export default PaginationBar;
