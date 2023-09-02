import * as React from "react";
import { CssBaseline } from "@mui/material";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider
} from "@mui/material/styles";

const PRIMARY = {
  lighter: "#D6E4FF",
  light: "#84A9FF",
  main: "#3366FF",
  dark: "#1939B7",
  darker: "#091A7A",
  contrastText: "#FFF"
};
const SECONDARY = {
  lighter: "#bcd9e7",
  light: "#8fc0d8",
  main: "#62a7c8",
  dark: "#358eb8",
  darker: "#1e81b0",
  contrastText: "#FFF"
};
const SUCCESS = {
  lighter: "#E9FCD4",
  light: "#AAF27F",
  main: "#54D62C",
  dark: "#229A16",
  darker: "#08660D",
  contrastText: "#FFF"
};

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const ThemeProvider = ({ children }) => {
  const [mode, setMode] = React.useState(
    window.localStorage.getItem("colorMode") || "light"
  );

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
        window.localStorage.setItem(
          "colorMode",
          mode === "light" ? "dark" : "light"
        );
      }
    }),
    [mode]
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          primary: PRIMARY,
          secondary: SECONDARY,
          success: SUCCESS,
          mode: `${mode}`
        }
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ColorModeContext.Provider>
  );
};

export { ThemeProvider, ColorModeContext };
