'use client';

import { ThemeProvider } from '@mui/material/styles';
import { ReactNode } from 'react';
import { appTheme } from './theme';

export type AppThemeProviderProps = {
  children: ReactNode;
};

/**
 * Provides the shared MUI theme configuration for the app.
 *
 * @param props - The nested application content.
 * @returns The themed application tree.
 */
export default function AppThemeProvider({ children }: AppThemeProviderProps) {
  return <ThemeProvider theme={appTheme}>{children}</ThemeProvider>;
}
