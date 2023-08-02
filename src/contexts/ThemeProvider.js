import * as React from "react";
import { CssBaseline } from "@mui/material";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";

const PRIMARY = {
  lighter: "#FFD07F",
  light: "#FDA65D",
  main: "#FF8243",
  dark: "#E26A2C",
  darker: "#cc571f",
  contrastText: "#FFF",
};
const SECONDARY = {
  lighter: "#D6E4FF",
  light: "#84A9FF",
  main: "#3366FF",
  dark: "#1939B7",
  darker: "#091A7A",
  contrastText: "#FFF",
};
const SUCCESS = {
  lighter: "#E9FCD4",
  light: "#AAF27F",
  main: "#54D62C",
  dark: "#229A16",
  darker: "#08660D",
  contrastText: "#FFF",
};

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const ThemeProvider = ({ children }) => {
   const [mode, setMode] = React.useState('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
           primary: PRIMARY,
      secondary: SECONDARY,
      success: SUCCESS,
          mode: `${mode}`,
        },
      }),
    [mode],
  );

  
  // const themeOptions = {
  //   palette: {
  //     primary: PRIMARY,
  //     secondary: SECONDARY,
  //     success: SUCCESS,
  //     mode
  //   },
  //   shape: { borderRadius: 8 },

  // };

  // const theme = createTheme(themeOptions);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ColorModeContext.Provider>
  );
}

export  {ThemeProvider, ColorModeContext};