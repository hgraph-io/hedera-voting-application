'use client'

import { createTheme } from '@mui/material'

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
}

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
    h1: {
      fontWeight: 500,
    },
    h2: {
      fontWeight: 500,
    },
    h3: {
      fontWeight: 500,
    },
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
          borderBottom: `1px solid ${colors.black}`, // Add a border bottom
        },
      },
    },
    MuiButton: {
      
      variants: [
        {
          props: { variant: 'gradient' },
          style: {
            color: colors.white,
            background: ' linear-gradient(45deg, #3ec878, transparent) #21a056;',
            borderRadius: '50px',
            border: 'none',
            textTransform: 'capitalize',
            transition: 'background 0.3s ease-out',  // Corrected this line
            '&:hover': {
              background: 'linear-gradient(45deg, #3ec878, transparent) #3ec878',
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
            color: colors.white,
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
})
