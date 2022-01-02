import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import { theme } from './styles/theme';
import { routes } from './layout/routes';
import { Layout } from './layout/Layout';
import { SignIn } from './pages/Auth/SignIn';
import { RequireAuth } from './layout/RequireAuth';
import { SignUp } from './pages/Auth/SignUp';

export const App: React.FC = () => {
  return (
    <Router>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/signup' element={<SignUp />} />
            <Route path='/signin' element={<SignIn />} />
            {routes.map(route => (
              <Route
                key={route.path}
                path={route.path}
                element={<RequireAuth>{route.element}</RequireAuth>}
              />
            ))}
          </Route>
        </Routes>
      </ThemeProvider>
    </Router>
  );
};
