import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#408080',
      light: '#71b0b0',
      dark: '#366161',
    },
    secondary: {
      main: '#30718D',
      dark: '#1A3D4D',
    },
    text: {
      primary: '#001823',
      secondary: '#667982',
      disabled: '#667982',
    },
    background: {
      default: '#2F2F2F',
    },
    a: {
      color: '#007bff !important',
    },
  },
  typography: {
    fontFamily: '"Inder", sans-serif',
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

export default theme;
