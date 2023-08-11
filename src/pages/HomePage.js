import React, { useEffect } from "react";
import { Box, Container, Button, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { setGender } from "../components/slices/genderSlice";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
// import SearchInput from "../components/SearchInput";
import { FormProvider } from "../components/form";
import { useForm } from "react-hook-form";
import { getProducts } from "../components/slices/productsSlice";
import FButton from "../components/form/FButton";

const Img = styled("img")(({ theme }) => ({
  margin: "auto",
  // display: "block",
  // maxWidth: "100%",
  // maxHeight: "100%",
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
          {/* <FormProvider methods={methods}> */}
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "1rem",
              // backgroundColor: 'rgba(255, 255, 255, 0.7)',
              padding: "1rem",
              borderRadius: "8px"
            }}
          >
            {/* <FButton
                name="gender"
                options={FILTER_GENDER_OPTIONS}
                row={false}
              /> */}
            <Button onClick={handleClickMen} variant="contained" size="large">
              Shop Men
            </Button>
            <Button onClick={handleClickWonen} variant="contained" size="large">
              Shop Women
            </Button>
          </Box>
          {/* </FormProvider> */}
        </Box>
      </Grid>
    </Container>
  );
}
export default HomePage;
