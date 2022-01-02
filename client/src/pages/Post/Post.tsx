import React, { useEffect } from 'react';
import { CircularProgress, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import moment from 'moment';
import { useParams } from 'react-router';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getSelectedPost } from '../../store/posts/services';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(4),
  },
  heading: {
    marginBottom: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

export const Post = () => {
  const classes = useStyles();
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { isLoading, selectedPost, error } = useAppSelector(state => state.postsReducer)


  useEffect(() => {
    if (id) {
      dispatch(getSelectedPost(id))
    }
  }, [id]);

  if (isLoading && !selectedPost) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <div className={classes.heading}>
        <Typography variant='h4'>{selectedPost?.title}</Typography>
        <Typography variant='body2'>{moment(selectedPost?.date).format('LLL')}</Typography>
      </div>
      <Typography variant='body1'>{selectedPost?.content}</Typography>
    </div>
  );
};
