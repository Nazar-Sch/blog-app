import React from 'react';
import { Container } from '@mui/material';

import { Navbar } from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

export const Layout: React.FC = ({ children }) => {
  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('userName');

  const navigate = useNavigate();

  if (!userId && !userName) {
    navigate('/signin');
    return null;
  }

  return (
    <>
      <Navbar userName={userName as string} />
      <Container>{children}</Container>
    </>
  );
};
