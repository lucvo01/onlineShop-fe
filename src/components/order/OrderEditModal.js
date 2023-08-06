import * as React from "react";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import OrderEditForm from "./OrderEditForm";

function OrderEditModal() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };
  return (
    <Stack>
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <OrderEditForm orderId={orderId} />
        </Box>
      </Modal>
    </Stack>
  );
}

export default OrderEditModal;
