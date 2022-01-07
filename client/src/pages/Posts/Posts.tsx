import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';

import { Post } from '../../components/Post';
import { Tags } from '../../components/Tags';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getPosts, updateLikes } from '../../store/posts/services';
import { Pagination } from '../../components/Pagination';

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

export const Posts = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const { isLoading, posts } = useAppSelector(state => state.postsReducer)

  useEffect((() => {
    dispatch(getPosts());
  }), [dispatch])

  if (isLoading) {
    return (
      <p>Loading...</p>
    )
  }

  const clickOnLike = (id: string) => {
    dispatch(updateLikes(id));
  };

  return (
    <div className={classes.root}>
      <div className={classes.articlesRoot}>
        {posts.length === 0 ? (
          <p>Empty list</p>
        ) : posts.map(article => (
          <Post article={article} clickOnLike={clickOnLike} />
        ))}
        <Pagination page={1} />
      </div>
      <Tags />
    </div>
  );
};
