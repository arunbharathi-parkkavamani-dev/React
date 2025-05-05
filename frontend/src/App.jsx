import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import React, { useState, useMemo } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import AppRoutes from './AppRoutes';

function App() {
  const [expanded, setExpanded] = useState(false);
  const [themeMode, setThemeMode] = useState('light');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
          ...(themeMode === 'dark' && {
            background: {
              default: '#121212',
              paper: '#1e1e1e',
            },
          }),
        },
        transitions: {
          duration: {
            enteringScreen: 500,
            leavingScreen: 500,
          },
        },
      }),
    [themeMode]
  );

  axios.defaults.withCredentials = true;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppRoutes
          expanded={expanded}
          setExpanded={setExpanded}
          themeMode={themeMode}
          onThemeToggle={setThemeMode}  /* Correctly pass onThemeToggle */
        />
      </Router>
    </ThemeProvider >
  );
}

export default App;

