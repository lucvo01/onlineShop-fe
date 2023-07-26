import * as React from "react";
import { Stack, Typography, Button, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import useAuth from "../../hooks/useAuth";
import { deletePost } from "./postSlice";

function DeleteProductPage() {
  const { postId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClose = () => {
    navigate(-1);
  };

  const handleClick = () => {
    dispatch(
      deletePost({
        userId: user._id,
        postId
      })
    );
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
                Do you want to delete post?
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

export default DeleteProductPage;
