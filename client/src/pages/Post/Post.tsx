import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Theme,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import moment from 'moment';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Chip from '@mui/material/Chip';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import PersonIcon from '@mui/icons-material/Person';
import ClearIcon from '@mui/icons-material/Clear';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  editPost,
  getSelectedPost,
  deletePost,
  updateLikes,
  addComment,
  deleteComment,
  likeComment,
  editComment,
} from '../../store/posts/services';
import { PostForm } from '../../components/Forms/PostForm';
import { CreatedPost } from '../../types/initialTypes';
import {
  deletePostByID,
  editCommentById,
  editPostById,
  updateCommentLike,
} from '../../api/posts';
import { Comments } from './containers/Comments';
import { Comments as CommentsType } from '../../store/posts/types';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { FavoriteOutlined } from '@mui/icons-material';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(4),
    display: 'flex',
    // justifyContent: 'space-between',
  },
  actionButtons: {
    justifySelf: 'end',
    marginBottom: theme.spacing(2),
  },
  selectedPostWrapper: {
    maxWidth: 800,
    width: '100%',
    borderRight: `1px solid ${theme.palette.secondary.light}`,
  },
  sideWrapper: {
    paddingLeft: theme.spacing(2),
    width: '100%',
    maxWidth: 350,
  },
}));

export const Post: React.FC = () => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [isShowComments, setIsShowComments] = useState<boolean>(false);

  const classes = useStyles();
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getSelectedPost(id));
    }
  }, [id]);

  const navigate = useNavigate();

  const { isLoading, selectedPost } = useAppSelector(
    state => state.postsReducer
  );
  const { user } = useAppSelector(state => state.authReducer);

  if (!selectedPost) {
    return null;
  }

  const { author, _id, comments, content, title, date, likes, tags } =
    selectedPost;

  if (isLoading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
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
    dispatch(editPost({ id: _id, post: updatedPost }));
    setEditMode(false);
  };

  const renderEditMode = () => (
    <PostForm
      handleSubmitArticle={handleChangePost}
      initialValues={{
        title,
        content,
        author: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      }}
    />
  );

  const handleClickLike = () => dispatch(updateLikes(_id));

  const handleClickComments = () => {
    setIsShowComments(!isShowComments);
  };

  const handleSavePost = () => {
    // dispatch add to favourite with id

  };


  const renderSideMenu = () => (
    <div className={classes.sideWrapper}>
      <IconButton onClick={handleClickLike}>
        <FavoriteIcon />
        {likes.length}
      </IconButton>
      <IconButton onClick={handleClickComments}>
        <ChatBubbleIcon />
        {comments.length}
      </IconButton>
      <IconButton onClick={handleSavePost}>
        <BookmarkIcon />
      </IconButton>
      {isShowComments && (
        <Comments
          user={user}
          comments={comments}
          selectedPost={selectedPost}
        />
      )}
    </div>
  );

  const renderSelectedPost = () => (
    <>
      <div className={classes.selectedPostWrapper}>
        <Typography variant='body1'>
          Posted by {author.firstName}{' '}
          {author.lastName}
        </Typography>
        <Typography variant='caption'>
          {moment(date).format('LLL')}
        </Typography>
        {tags && tags.length > 0 ? (
          <Stack
            direction='row'
            spacing={1}
            marginBottom={1}
            marginTop={1}
          >
            {tags.map(tag => (
              <Chip label={tag} />
            ))}
          </Stack>
        ) : null}
        {isAuthorSelectedPost && (
          <div className={classes.actionButtons}>
            <IconButton onClick={handleEditMode}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => removePost(_id)}>
              <DeleteOutlineIcon />
            </IconButton>
          </div>
        )}
        <Typography
          variant='h5'
          align='center'
          marginTop={3}
          marginBottom={1}
        >
          {title}
        </Typography>
        <Typography variant='body1'>{content}</Typography>
      </div>
      {renderSideMenu()}
    </>
  );

  return (
    <div className={classes.root}>
      {editMode ? renderEditMode() : renderSelectedPost()}
    </div>
  );
};
