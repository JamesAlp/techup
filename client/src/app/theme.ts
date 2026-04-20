import { createTheme } from '@mui/material/styles';

/**
 * Shared MUI theme for the TechUp client app.
 *
 * Includes a custom `smd` breakpoint between `sm` and `md`.
 */
export const appTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      smd: 750,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});
