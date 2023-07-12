// mui-overrides.d.ts

import '@mui/material';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    gradient: true;
  }
}
