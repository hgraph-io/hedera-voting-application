import { createContext, useContext, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import type { SnackbarContextProps } from '@/types';
import { SnackbarMessageSeverity } from '@/types';

const SnackbarContext = createContext<SnackbarContextProps>({
  openSnackbar: () => {},
});

export const useSnackbar = () => useContext(SnackbarContext);

export default function SnackbarProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<SnackbarMessageSeverity>(
    SnackbarMessageSeverity.Info
  );

  const openSnackbar = (message: string, severity?: SnackbarMessageSeverity) => {
    setMessage(message);
    setSeverity(severity ?? SnackbarMessageSeverity.Info);
    setOpen(true);
  };

  const handleClose = () => {
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
}
