import React, { useState } from "react";
import { Box, Container, Tab, Tabs, Typography } from "@mui/material";
import useAuth from "../hooks/useAuth";
import AccountGeneral from "../components/user/AccountGeneral";
import ProfileUpdatePassword from "../components/user/ProfileUpdatePassword";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { capitalCase } from "change-case";


const UserProfilePage = () => {
  const { user } = useAuth();
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
      icon: <AccountBoxIcon sx={{ fontSize: 24 }} />,
      component: <ProfileUpdatePassword />
    }
  ];

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        My Profile
      </Typography>
      <Tabs
        value={currentTab}
        scrollButtons="auto"
        variant="scrollable"
        allowScrollButtonsMobile
        onChange={ handleChangeTab}>
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
