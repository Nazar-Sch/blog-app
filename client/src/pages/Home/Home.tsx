import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Post } from '../../components/Post';
import { Tags } from '../../components/Tags';
import { mockedArticles } from '../../mockedArticles';
import { Article } from '../../types/initialTypes';

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

export const Home = () => {
  const [articles, setArticles] = useState<Article[]>(mockedArticles);
  const classes = useStyles();

  const handleSubmitNewArticle = (value: Article) => {
    setArticles(prev => [...prev, value]);
  };

  return (
    <div className={classes.root}>
      <div className={classes.articlesRoot}>
        {articles.map(article => (
          <Post article={article} />
        ))}
      </div>
      <Tags />
    </div>
  );
};
