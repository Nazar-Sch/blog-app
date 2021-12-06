import React from 'react';
import { Container } from '@mui/material';

import { Navbar } from '../components/Navbar';

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container>{children}</Container>
    </>
  );
};
