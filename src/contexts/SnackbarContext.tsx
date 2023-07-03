//@ts-nocheck
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Snackbar, SnackbarCloseReason } from '@mui/material';
import { Alert } from '@mui/material';

type SnackbarContextProps = {
  openSnackbar: (message: string, severity: 'success' | 'info' | 'warning' | 'error') => void;
};

const SnackbarContext = createContext<SnackbarContextProps>({
  openSnackbar: () => {},
});

export const useSnackbar = () => useContext(SnackbarContext);

type SnackbarProviderProps = {
  children: ReactNode;
};

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('info');

  const openSnackbar = (
    message: string,
    severity: 'success' | 'info' | 'warning' | 'error'
  ) => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ openSnackbar }}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      {children}
    </SnackbarContext.Provider>
  );
};
