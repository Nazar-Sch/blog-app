import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';

import { Post } from '../../components/Post';
import { Tags } from '../../components/Tags';
import { Article } from '../../types/initialTypes';
import { getAllPosts } from '../../api/posts';
import moment from 'moment';

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
  const [articles, setArticles] = useState<Article[]>([]);

  const classes = useStyles();

  useEffect((() => {
    (async () => {
      try {
        const { data } = await getAllPosts();
        setArticles(data.posts);
      } catch (e) {
        console.log(e);
      }
    })();
  }), [])

  const sortedPosts = articles.sort((a, b) => moment(b.date).diff(a.date));

  return (
    <div className={classes.root}>
      <div className={classes.articlesRoot}>
        {sortedPosts.map(article => (
          <Post key={article._id} article={article} />
        ))}
      </div>
      <Tags />
    </div>
  );
};
