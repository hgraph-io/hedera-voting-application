'use client';

import { createTheme } from '@mui/material';

export default createTheme({
  palette: {
    primary: {
      main: '#7048E8',
      contrastText: '#ffcc00',
    },
    secondary: {
      light: '#51CF66',
      main: '#7048E8',
      contrastText: '#ffcc00',
    },
    text: {
      primary: '#212429',
      secondary: '#495057',
    },
  },
  typography: {
    fontFamily: 'Styrene A Web, Arial',
  },
  components: {
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
