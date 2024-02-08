import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#DB3725',
      light: '#EA695B',
      dark: '#B21F13',
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