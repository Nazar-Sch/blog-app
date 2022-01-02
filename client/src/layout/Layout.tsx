import React, { useEffect } from 'react';
import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { getUser } from '../store/auth/services';
import { useAppDispatch } from '../store/hooks';
import { Navbar } from '../components/Navbar';

export const Layout: React.FC = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.token) {
      dispatch(getUser());
    }
  }, []);

  return (
    <>
      <Navbar />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};
