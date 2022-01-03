import React, { useEffect, useState } from 'react';
import {
  CircularProgress,
  IconButton,
  Theme,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { makeStyles } from '@mui/styles';
import moment from 'moment';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  editPost,
  getSelectedPost,
  deletePost,
} from '../../store/posts/services';
import { PostForm } from '../../components/Forms/PostForm';
import { CreatedPost } from '../../types/initialTypes';
import { deletePostByID, editPostById } from '../../api/posts';

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

  useEffect(() => {
    if (id) {
      dispatch(getSelectedPost(id));
    }
  }, [id]);

  const navigate = useNavigate();

  const { isLoading, selectedPost, error } = useAppSelector(
    state => state.postsReducer
  );
  const { user } = useAppSelector(state => state.authReducer);

  if (isLoading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  if (!selectedPost) {
    return null;
  }

  if (!user) {
    return <div>You are not allowed to create new post. Sign in!</div>;
  }

  const isAuthorSelectedPost = selectedPost?.author.id === user?._id;

  const handleEditMode = () => {
    setEditMode(!editMode);
  };

  const removePost = (id: string) => {
    dispatch(deletePost({ id, cb: () => navigate('/posts') }));
  };

  const handleChangePost = async (updatedPost: CreatedPost) => {
    dispatch(editPost({ id: selectedPost._id, post: updatedPost }));
    setEditMode(false);
  };

  return (
    <div className={classes.root}>
      <div className={classes.heading}>
        <Typography variant='body1'>
          Author: {selectedPost?.author.firstName}{' '}
          {selectedPost?.author.lastName}
        </Typography>
        <Typography variant='body2'>
          Likes: {selectedPost.likes.length}
        </Typography>
      </div>
      {editMode ? (
        <PostForm
          handleSubmitArticle={handleChangePost}
          initialValues={{
            title: selectedPost?.title,
            content: selectedPost.content,
            author: {
              id: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
            },
          }}
        />
      ) : (
        <>
          {isAuthorSelectedPost && (
            <div className={classes.actionButtons}>
              <IconButton onClick={handleEditMode}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => removePost(selectedPost?._id)}>
                <DeleteOutlineIcon />
              </IconButton>
            </div>
          )}
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
