'use client';

import { createTheme } from '@mui/material';

// Define your colors
const colors = {
  blue: '#4263eb',
  purple: '#7048e8',
  darkPurple: '#6541d2',
  green: '#51cf66',
  darkGreen: '#21a056',
  yellow: '#eada0b',
  lime: '#b7f133',
  black: '#212429',
  white: '#f9f9f9',
  whiteText: '#FFFFFF',
  grey1: '#dde2e5',
  grey2: '#acb5bd',
  grey3: '#495057',
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
    fontFamily: 'Styrene A Web, Arial',
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        gutterBottom: {
          marginBottom: 20,
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: colors.white, // Set AppBar background to white
          color: colors.black, // Set text color to black
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: 'gradient' },
          style: {
            color: colors.white,
            background: colors.darkGreen,
            borderRadius: '50px',
            border: 'none',
            textTransform: 'capitalize',
            '&:hover': {
              background: colors.green,
            },
          },
        },
      ],
      styleOverrides: {
        text: {
          height: '32px',
          borderRadius: '50px',
          minWidth: '100px',
          border: 'none',
          color: colors.black,
          background: colors.white,
          textTransform: 'capitalize',
          '&:hover': {
            backgroundColor: colors.purple,
          },
        },
        contained: {
          height: '32px',
          minWidth: '100px',
          borderRadius: '50px',
          border: 'none',
          color: colors.white,
          background: colors.darkPurple,
          textTransform: 'capitalize',
          '&:hover': {
            backgroundColor: colors.purple,
          },
        },
        outlined: {
          height: '32px',
          color: colors.black,
          minWidth: '100px',
          border: `1px solid ${colors.black}`,
          borderRadius: '50px',
          textTransform: 'capitalize',
          '&:hover': {
            color: colors.whiteText,
            backgroundColor: colors.purple,
            border: `none`,
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
