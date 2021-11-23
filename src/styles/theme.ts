import { createTheme } from '@mui/material';
import { blue, grey } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    primary: {
      light: blue[100],
      main: blue[500],
      dark: blue[800],
    },
    secondary: {
      light: grey[200],
      main: grey[400],
      dark: grey[900],
    },
  },
});
