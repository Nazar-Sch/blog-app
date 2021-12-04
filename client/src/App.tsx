import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, ThemeProvider } from '@mui/material';

import { theme } from './styles/theme';
import { NewArticle } from './components/NewArticle';
import { Article } from './types/initialTypes';
import { mockedArticles } from './mockedArticles';
import { Navbar } from './components/Navbar';
import { Tags } from './components/Tags';
import { makeStyles } from '@mui/styles';
import { Post } from './components/Post';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: '3fr 1fr',
    position: 'relative',
  },
  articlesRoot: {
    overflowY: 'auto',
  },
});

export const App: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>(mockedArticles);

  const classes = useStyles();

  const handleSubmitNewArticle = (value: Article) => {
    setArticles(prev => [...prev, value]);
  };

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Navbar />
        <Container>
          <div className={classes.root}>
            <div className={classes.articlesRoot}>
              {articles.map(article => (
                <Post article={article} />
              ))}
            </div>
            <Tags />
          </div>
        </Container>
      </ThemeProvider>
    </>
  );
};
