import React, { useEffect } from 'react';
import { makeStyles } from '@mui/styles';

import { Post } from '../../components/Post';
import { Tags } from '../../components/Tags';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getPosts } from '../../store/posts/services';

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
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const { isLoading, posts, error } = useAppSelector(state => state.postsReducer)

  useEffect((() => {
    dispatch(getPosts());
  }), [])

  if (isLoading && posts.length === 0) {
    return (
      <p>Loading...</p>
    )
  }
  console.log(posts);
  return (
    <div className={classes.root}>
      <div className={classes.articlesRoot}>
        {posts.map(article => (
          <Post article={article} />
        ))}
      </div>
      <Tags />
    </div>
  );
};
