import React, { useState } from "react";
import {
  Box,
  Container,
  Tab,
  Tabs,
  Typography,
  Breadcrumbs,
  Link
} from "@mui/material";
import AccountGeneral from "../components/user/AccountGeneral";
import ProfileUpdatePassword from "../components/user/ProfileUpdatePassword";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PasswordIcon from "@mui/icons-material/Password";
import { capitalCase } from "change-case";
// import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";

// const CenteredContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

const UserProfilePage = () => {
  // const { user } = useAuth();
  const [currentTab, setCurrentTab] = useState("profile");

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const PROFILE_TABS = [
    {
      value: "profile",
      icon: <AccountBoxIcon sx={{ fontSize: 24 }} />,
      component: <AccountGeneral />
    },
    {
      value: "password",
      icon: <PasswordIcon sx={{ fontSize: 24 }} />,
      component: <ProfileUpdatePassword />
    }
  ];

  return (
    <Container>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
        <Link underline="hover" color="inherit" component={RouterLink} to="/">
          Online Shop
        </Link>
        <Typography color="text.primary">My Profile</Typography>
      </Breadcrumbs>
      <Typography variant="h4" align="center">
        My Profile
      </Typography>
      <Tabs
        value={currentTab}
        scrollButtons="auto"
        variant="scrollable"
        allowScrollButtonsMobile
        onChange={handleChangeTab}
      >
        {PROFILE_TABS.map((tab) => (
          <Tab
            // disableRipple
            key={tab.value}
            value={tab.value}
            icon={tab.icon}
            label={capitalCase(tab.value)}
          />
        ))}
      </Tabs>
      <Box sx={{ mb: 5 }} />

      {PROFILE_TABS.map((tab) => {
        const isMatched = tab.value === currentTab;
        return isMatched && <Box key={tab.value}>{tab.component}</Box>;
      })}
    </Container>
  );
};

export default UserProfilePage;
