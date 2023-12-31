import * as React from "react";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteOrder } from "./slices/ordersSlice";

function OrderDeleteModal() {
  const { orderId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClose = () => {
    navigate(-1);
  };
  const handleClick = () => {
    dispatch(deleteOrder(orderId));
    handleClose();
  };
  return (
    <Stack>
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Box>
          <Card>
            <CardContent>
              <Typography variant="subtitle" sx={{ color: "text.secondary" }}>
                Do you want to delete product?
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end"
                }}
              >
                <Button variant="contained" size="small" onClick={handleClick}>
                  Confirm Delete
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </Stack>
  );
}

export default OrderDeleteModal;
