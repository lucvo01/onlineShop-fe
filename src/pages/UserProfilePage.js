import React, { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import useAuth from "../hooks/useAuth";
import AccountGeneral from "../components/user/AccountGeneral";
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
      component: <AccountGeneral user={user} />
    },
    {
      value: "password",
      icon: <AccountBoxIcon sx={{ fontSize: 24 }} />,
      component: <AccountGeneral user={user} />
    },
    // {
    //   value: "favorite",
    //   icon: <ContactMailIcon sx={{ fontSize: 24 }} />,
    //   component: < />
    // },
    
  ];
  return (
    <Box>
      <Tabs
        value={currentTab}
        scrollButtons="auto"
        variant="scrollable"
        allowScrollButtonsMobile
        onChange={(e, value) => handleChangeTab(value)}>

        {PROFILE_TABS.map((tab) => (
          <Tab
            disableRipple
            key={tab.value}
            value={tab.value}
            icon={tab.icon}
            label={capitalCase(tab.value)}
          />
        ))}

      </Tabs>
    </Box>
  );
};

export default UserProfilePage;
