import React, { useEffect, useState } from 'react';
import { CircularProgress, IconButton, Theme, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { makeStyles } from '@mui/styles';
import moment from 'moment';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getSelectedPost } from '../../store/posts/services';
import { PostForm } from '../../components/Forms/PostForm';
import { CreatedPost } from '../../types/initialTypes';
import { deletePostByID, editPost } from '../../api/posts';

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
  },
}));

export const Post = () => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const classes = useStyles();
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { isLoading, selectedPost, error } = useAppSelector(state => state.postsReducer)


  useEffect(() => {
    if (id) {
      dispatch(getSelectedPost(id))
    }
  }, [id]);

  const navigate = useNavigate();

  const updatePost = (id: string) => {
    setEditMode(true);
  };

  const deletePost = async (id: string) => {
    try {
      await deletePostByID(id);
      return navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  if (isLoading && !selectedPost) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  if (!selectedPost) {
    return null;
  }

  const handleChangePost = async (updatedPost: CreatedPost) => {
    await editPost(selectedPost._id, updatedPost);
    setEditMode(false);
  };

  return (
    <div className={classes.root}>
      <div className={classes.heading}>
        <Typography variant='h4'>{selectedPost?.title}</Typography>
        <Typography variant='body2'>{moment(selectedPost?.date).format('LLL')}</Typography>
      </div>
      <Typography variant='body1'>{selectedPost?.content}</Typography>
      {editMode ? (
        <PostForm
          handleSubmitArticle={handleChangePost}
          initialValues={{ title: selectedPost?.title, content: selectedPost.content }}
        />
      ) : (
        <>
          <div className={classes.actionButtons}>
            <IconButton onClick={() => updatePost(selectedPost?._id)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => deletePost(selectedPost?._id)}>
              <DeleteOutlineIcon />
            </IconButton>
          </div>
          <div className={classes.heading}>
            <Typography variant='h4'>{selectedPost?.title}</Typography>
            <Typography variant='body2'>
              {moment(selectedPost.date).format('LLL')}
            </Typography>
          </div>
          <Typography variant='body1'>{selectedPost?.content}</Typography>
        </>
      )}
    </div>
  );
};
