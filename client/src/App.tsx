import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { theme } from './styles/theme';
import { routes } from './layout/routes';
import { Layout } from './layout/Layout';

export const App: React.FC = () => {
  return (
    <Router>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Layout>
          {routes.map(route => (
            <Routes>
              <Route key={route.toString()} path={route.path} element={route.component} />
            </Routes>
          ))}
        </Layout>
      </ThemeProvider>
    </Router>
  );
};
