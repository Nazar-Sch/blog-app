import React, { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Stack, Theme } from '@mui/material';

import { Tags } from '../../components/Tags';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getPostsBySearch } from '../../store/posts/services';
import { Pagination } from '../../components/Pagination';
import { Loader } from '../../components/Loader';
import { PostsList } from './containers/PostsList';
import { useSearchParams } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '3fr 1fr',
    position: 'relative',
    marginBottom: theme.spacing(2),
  },
  articlesRoot: {
    overflowY: 'auto',
  },
}));

export const Posts = () => {
  const [pageQuery] = useSearchParams();
  const searchQuery = pageQuery.get('query');
  const pageFromQuery = pageQuery.get('page') || 1;
  const dispatch = useAppDispatch();
  const classes = useStyles();

  const { isLoading } = useAppSelector(state => state.postsReducer);

  useEffect(() => {
    if (searchQuery && searchQuery.length > 0) {
      dispatch(getPostsBySearch({ search: searchQuery }));
    }
  }, [dispatch, searchQuery]);

  return (
    <>
      <div className={classes.root}>
        {isLoading ? <Loader /> : <PostsList />}
        <Tags />
      </div>
      {!searchQuery && (
        <Stack spacing={2} marginBottom={5}>
          <Pagination page={pageFromQuery} />
        </Stack>
      )}
    </>
  );
};
