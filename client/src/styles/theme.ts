import { createTheme } from '@mui/material';
import { blue, green, grey } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    primary: {
      light: blue[100],
      main: blue[500],
      dark: blue[800],
    },
    secondary: {
      light: grey[200],
      main: grey[600],
      dark: grey[900],
    },
    success: {
      light: green[300],
      main: green[500],
      dark: green[900],
    }
  },
});
