import React, { createContext, useContext, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

type SnackbarContextProps = {
  openSnackbar: (message: string, severity: "success" | "info" | "warning" | "error") => void;
};

const SnackbarContext = createContext<SnackbarContextProps>({
  openSnackbar: () => {}
});

export const useSnackbar = () => useContext(SnackbarContext);
export const SnackbarProvider: React.PropsWithChildren<{}> = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState<"success" | "info" | "warning" | "error">("info");
  
    const openSnackbar = (message: string, severity: "success" | "info" | "warning" | "error") => {
      setMessage(message);
      setSeverity(severity);
      setOpen(true);
    };
  
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };
  
    return (
      <SnackbarContext.Provider value={{ openSnackbar }}>
        <Snackbar anchorOrigin={{ vertical:'top', horizontal:'center' }} open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
        {children}
      </SnackbarContext.Provider>
    );
  };
  