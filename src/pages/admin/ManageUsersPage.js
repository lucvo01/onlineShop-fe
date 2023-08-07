import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import { getAllUsers } from "../../components/slices/usersSlice";
import { useNavigate } from "react-router-dom";
import { updateUserProfile } from "../../components/slices/usersSlice";

function ManageUsersPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const { users } = useSelector((state) => state.users);

  console.log(users);

  // const handleClick = () => {

  // }

  return (
    <Container>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User Email</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>More</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((user, index) => {
              return (
                <TableRow key={user._id || index} hover>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.name}</TableCell>

                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() =>
                        navigate(`/manage_users/${user._id}/orders`)
                      }
                    >
                      See Orders
                    </Button>
                  </TableCell>
                  <TableCell>
                    {user.isDeleted ? (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => {
                          console.log(!user.isDeleted);
                          dispatch(
                            updateUserProfile({
                              userId: user._id,
                              isDeleted: !user.isDeleted
                            })
                          );
                          dispatch(getAllUsers());
                        }}
                      >
                        activate
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                          console.log(!user.isDeleted);
                          dispatch(
                            updateUserProfile({
                              userId: user._id,
                              isDeleted: !user.isDeleted
                            })
                          );
                          dispatch(getAllUsers());
                        }}
                      >
                        Deactivate
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default ManageUsersPage;
