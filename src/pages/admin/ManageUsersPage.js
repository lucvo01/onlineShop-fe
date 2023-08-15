import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Paper,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Breadcrumbs,
  Link,
  Typography
} from "@mui/material";
import { getAllUsers } from "../../components/slices/usersSlice";
import { useNavigate } from "react-router-dom";
import { updateUserProfile } from "../../components/slices/usersSlice";
import { Link as RouterLink } from "react-router-dom";
import LoadingScreen from "../../components/LoadingScreen";

function ManageUsersPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const { users, isLoading } = useSelector((state) => state.users);

  // const handleClick = () => {

  // }

  return (
    <Container  sx={{ position: "relative", height: 1 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
            <Link
              underline="hover"
              color="inherit"
              component={RouterLink}
              to="/"
            >
              Online Shop
            </Link>
            <Typography color="text.primary">Manage Users</Typography>
          </Breadcrumbs>

          <Typography variant="h5" gutterBottom>
            Manage Users
          </Typography>
          
          <Paper sx={{ borderRadius: "10px", mt: 3,  position: "relative", height: 1  }}>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
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
                            variant="contained"
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
       
        </>
      )}
         </Paper>
    </Container>
  );
}

export default ManageUsersPage;
