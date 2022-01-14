import React, { useEffect } from 'react';
import { makeStyles } from '@mui/styles';

import { Tags } from '../../components/Tags';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getPosts, getPostsBySearch } from '../../store/posts/services';
import { Pagination } from '../../components/Pagination';
import { useSearchQuery } from '../../utils/searchQuery';
import { Loader } from '../../components/Loader';
import { PostsList } from './containers/PostsList';

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
  const query = useSearchQuery();
  const searchQuery = query.get('query');
  const page = query.get('page') || '1';

  const { isLoading } = useAppSelector(state => state.postsReducer);

  useEffect(() => {
    if (searchQuery && searchQuery.length > 0) {
      dispatch(getPostsBySearch({ search: searchQuery }));
    } else {
      dispatch(getPosts());
    }
  }, [dispatch, searchQuery]);

  if (isLoading) return <Loader />;

  return (
    <>
      <div className={classes.root}>
        <PostsList />
        <Tags />
      </div>
      <Pagination page={page} />
    </>
  );
};
