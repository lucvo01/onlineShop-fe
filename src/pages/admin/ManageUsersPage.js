import React, { useEffect } from "react";
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

function ManageUsersPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
                      onClick={() =>
                        navigate(`/manage_users/${user._id}/Deactivate`)
                      }
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
