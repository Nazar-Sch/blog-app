import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material';

import { theme } from './styles/theme';
import { NewArticle } from './components/NewArticle';
import { Header } from './components/Header';
import { Article } from './types/initialTypes';
import { Articles } from './components/Articles';
import { mockedArticles } from './mockedArticles';

export const App: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>(mockedArticles);
  const [openPopup, setOpenPopup] = useState(false);

  const handleSubmitNewArticle = (value: Article) => {
    setArticles(prev => [...prev, value]);
  };

  const handleShowPopup = () => {
    setOpenPopup(!openPopup);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  }

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Header handleShowPopup={handleShowPopup} />
        <Articles articles={articles} />
        <NewArticle handleClosePopup={handleClosePopup} openPopup={openPopup} handleChangeArticle={handleSubmitNewArticle} />
      </ThemeProvider>
    </>
  );
};
