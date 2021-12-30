import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';

import { theme } from './styles/theme';
import { routes } from './layout/routes';
import { Layout } from './layout/Layout';
import { AuthProvider } from './context/AuthProvider';
import { SignIn } from './pages/SignIn';
import { RequireAuth } from './context/RequireAuth';
import { SignUp } from './pages/SignUp';
import { Navbar } from './components/Navbar';

export const App: React.FC = () => {
  const userName = JSON.parse(localStorage.getItem('userName') as string);
  console.log('userName', userName);

  return (
    <AuthProvider>
      <Router>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <Navbar userName={userName} />
          <Container>
            <Routes>
              <Route path='/signup' element={<SignUp />} />
              <Route path='/signin' element={<SignIn />} />
              {routes.map(route => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<RequireAuth>{route.component}</RequireAuth>}
                />
              ))}
            </Routes>
          </Container>
        </ThemeProvider>
      </Router>
    </AuthProvider>
  );
};
