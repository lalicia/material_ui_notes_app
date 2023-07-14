import Notes from "../src/pages/Notes";
import Create from "../src/pages/Create";
import Layout from "../src/components/Layout";

import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple } from "@mui/material/colors";

//you are changing the default theme as visible here: https://mui.com/material-ui/customization/default-theme/
//colors from MUI available here: https://mui.com/material-ui/customization/color/#color-palette
const theme = createTheme({
  palette: {
    primary: {
      main: "#658392",
    },
    secondary: purple,
  },
  typography: {
    fontFamily: "Quicksand",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

const router = createBrowserRouter(
  createRoutesFromElements(
    //for styling around everything, like nav footer etc, make it the element
    <Route path="/" element={<Layout />}>
      <Route index element={<Notes />} />
      <Route path="/create" element={<Create />} />
    </Route>
  )
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
