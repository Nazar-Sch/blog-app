import React, { useEffect, useState } from 'react';
import axios from 'axios';
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

  useEffect((() => {
    (async () => {
      try {
        const { data } = await axios.get('/api/posts');
        setArticles(data.posts);
      } catch (e) {
        console.log(e);
      }
    })();
  }), [])

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
