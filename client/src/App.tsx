import React, { useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import { theme } from './styles/theme';
import { routes } from './layout/routes';
import { Layout } from './layout/Layout';
import { SignIn } from './pages/Auth/SignIn';
import { RequireAuth } from './layout/RequireAuth';
import { SignUp } from './pages/Auth/SignUp';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { getUser } from './store/auth/services';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(({ authReducer }) => authReducer);

  useEffect(() => {
    if (localStorage.token) {
      dispatch(getUser());
    }
  }, []);

  return (
    <Router>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/signup' element={!user ? <SignUp /> : <Navigate to='/posts' />} />
            <Route path='/signin' element={!user ? <SignIn /> : <Navigate to='/posts' />} />
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
