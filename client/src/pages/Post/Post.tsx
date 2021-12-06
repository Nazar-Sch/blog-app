import React, { useEffect, useState } from 'react';
import { CircularProgress, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import moment from 'moment';
import { useParams } from 'react-router';

import { Article } from '../../types/initialTypes';

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
  const [post, setPost] = useState<Article | null>(null);
  const { id } = useParams();
  const classes = useStyles();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/api/posts/${id}`);
        setPost(data.post);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [id]);

  if (!post) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <div className={classes.heading}>
        <Typography variant='h4'>{post.title}</Typography>
        <Typography variant='body2'>{moment(post.date).format('LLL')}</Typography>
      </div>
      <Typography variant='body1'>{post.content}</Typography>
    </div>
  );
};
