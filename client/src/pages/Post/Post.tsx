import React, { useEffect, useState } from 'react';
import { CircularProgress, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import moment from 'moment';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';

import { Article } from '../../types/initialTypes';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { deletePostByID } from '../../api/posts';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(4),
    display: 'grid',
  },
  heading: {
    marginBottom: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
  },
  actionButtons: {
    justifySelf: 'end',
    marginBottom: theme.spacing(2),
  }
}));

export const Post = () => {
  const [post, setPost] = useState<Article | null>(null);
  const { id } = useParams();
  const classes = useStyles();
  const navigate = useNavigate();

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

  const updatePost = (id: string) => {
    console.log(`Update post by: ${id}`);
    // request to server
  };

  const deletePost = async (id: string) => {
    try {
      await deletePostByID(id);
      return navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  if (!post) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <div className={classes.actionButtons}>
        <IconButton onClick={() => updatePost(post._id)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => deletePost(post._id)}>
          <DeleteOutlineIcon />
        </IconButton>
      </div>
      <div className={classes.heading}>
        <Typography variant='h4'>{post.title}</Typography>
        <Typography variant='body2'>
          {moment(post.date).format('LLL')}
        </Typography>
      </div>
      <Typography variant='body1'>{post.content}</Typography>
    </div>
  );
};
