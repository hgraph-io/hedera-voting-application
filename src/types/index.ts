export enum SnackbarMessageSeverity {
  Success = 'success',
  Info = 'info',
  Warning = 'warning',
  Error = 'error',
}
export type SnackbarContextProps = {
  openSnackbar: (message: string, severity: SnackbarMessageSeverity) => void;
};
