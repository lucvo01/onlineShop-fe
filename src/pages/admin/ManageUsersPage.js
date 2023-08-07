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
import { set } from "lodash";

function ManageUsersPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [deleteStatus, setDeleteStatus] = useState();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const { users } = useSelector((state) => state.users);

  console.log(users);

  return (
    <Container>
      ManageUsersPage
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User Email</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>More</TableCell>
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
                      onClick={() =>
                        navigate(`/manage_users/${user._id}/orders`)
                      }
                    >
                      See Orders
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        if (user.isDeleted === true) {
                          setDeleteStatus(false);
                        } else {
                          setDeleteStatus(true);
                        }
                        dispatch(
                          updateUserProfile({
                            userId: user._id,
                            isDeleted: deleteStatus
                          })
                        );
                      }}
                    >
                      Deactivate
                    </Button>
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
