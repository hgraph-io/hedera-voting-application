'use client';

import { createTheme } from '@mui/material';

// Define your colors
const colors = {
  blue: "#4263eb",
  purple: "#7048e8",
  green: "#51cf66",
  yellow: "#eada0b",
  lime: "#b7f133",
  black: "#212429",
  white: "#f9f9f9",
  grey1: "#dde2e5",
  grey2: "#acb5bd",
  grey3: "#495057",
};

// Use these colors in your theme
export default createTheme({
  palette: {
    primary: {
      main: colors.blue,
      contrastText: colors.yellow,
    },
    secondary: {
      light: colors.green,
      main: colors.purple,
      contrastText: colors.yellow,
    },
    text: {
      primary: colors.black,
      secondary: colors.grey3,
    },
  },
  typography: {
    fontFamily: "Styrene A Web, Arial",
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: colors.white, // Set AppBar background to white
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        text: {
          height: '32px',
          minWidth: '200px',
          borderRadius: '50px',
          border: 'none',
          color: '#212429',
          background: '#F9F9F9',
          textTransform: 'capitalize',
          '&:hover': {
            backgroundColor: 'linear-gradient(45deg, #21A056, #3EC878)',
          },
        },
        contained: {
          height: '32px',
          minWidth: '200px',
          borderRadius: '50px',
          border: 'none',
          color: '#F9F9F9',
          background: '#8259EF',
          textTransform: 'capitalize',
          '&:hover': {
            backgroundColor: 'linear-gradient(45deg, #21A056, #3EC878)',
          },
        },
        outlined: {
          height: '32px',
          minWidth: '200px',
          color: '#212429',
          border: '1px solid #212429',
          borderRadius: '50px',
          textTransform: 'capitalize',
          '&:hover': {
            color: '#FFFFFF',
            backgroundColor: '#7048E8',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          margin: '20px 0px 0px',
        },
      },
    },
  },
});
