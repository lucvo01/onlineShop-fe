import React from "react";
import { Box, Container, Button, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { setGender } from "../components/slices/filterSlice";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
// import SearchInput from "../components/SearchInput";

const Img = styled("img")(({ theme }) => ({
  margin: "auto",
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: -1,
  objectFit: "cover"
}));

const LargeScreenImg = styled(Img)(({ theme }) => ({
  [theme.breakpoints.up("xs")]: {
    display: "none"
  },
  [theme.breakpoints.up("md")]: {
    display: "block"
  }
}));

const SmallScreenImg = styled(Img)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "none"
  }
}));

export const FILTER_GENDER_OPTIONS = [
  { value: "male", label: "Men" },
  { value: "female", label: "Women" }
];

function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickMen = () => {
    dispatch(setGender("male"));
    navigate("/shop");
  };

  const handleClickWonen = () => {
    dispatch(setGender("female"));
    navigate("/shop");
  };

  return (
    <Container>
      <Grid container>
        <Box>
          <LargeScreenImg src="https://content.asos-media.com/-/media/homepages/unisex/generic-hp/july-2023/julymonthly_12062023_womens_shot07_034_1440x698.jpg" />

          <SmallScreenImg src="https://content.asos-media.com/-/media/homepages/unisex/generic-hp/july-2023/carly_asos_6_640x1070.jpg" />
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              padding: "1rem",
              borderRadius: "8px"
              // width: "100%"
            }}
          >
            <Button
              onClick={handleClickMen}
              variant="contained"
              size="large"
              sx={{
                flex: 1,
                height: "4rem"
              }}
            >
              Shop Men
            </Button>
            <Button
              onClick={handleClickWonen}
              variant="contained"
              size="large"
              sx={{
                flex: 1,
                height: "4rem"
              }}
            >
              Shop Women
            </Button>
          </Box>
        </Box>
      </Grid>
    </Container>
  );
}
export default HomePage;
