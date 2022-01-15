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
import moment from 'moment';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Chip from '@mui/material/Chip';
import BookmarkIcon from '@mui/icons-material/Bookmark';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  editPost,
  getSelectedPost,
  deletePost,
} from '../../store/post/services';
import { PostForm } from '../../components/Forms/PostForm';
import { CreatedPost } from '../../types/initialTypes';
import { Comments } from './containers/Comments';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { updateLikes } from '../../store/posts/services';
import { SelectedPost } from './components/SelectedPost';
import { Loader } from '../../components/Loader';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(4),
    display: 'flex',
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

  const { isLoading, post } = useAppSelector(state => state.postReducer);
  const { user } = useAppSelector(state => state.authReducer);

  if (!post) {
    return null;
  }

  if (isLoading) return <Loader />;

  const { author, _id, comments, content, title, date, likes, tags } =
    post;
  const lastUpdatePost = moment(date).format('LLL');

  if (!user) {
    return <div>You are not allowed to create new post. Sign in!</div>;
  }

  const isAuthorSelectedPost = author.id === user?._id;

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

  const handleClickLike = () => dispatch(updateLikes(_id));

  const handleClickComments = () => {
    setIsShowComments(!isShowComments);
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
      {isShowComments && (
        <Comments user={user} comments={comments} selectedPost={post} />
      )}
    </div>
  );

  return (
    <div className={classes.root}>
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
      {editMode ? (
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
      ) : (
        <>
          <SelectedPost
            author={author}
            content={content}
            lastUpdatePost={lastUpdatePost}
            tags={tags}
            title={title}
          />
          {renderSideMenu()}
        </>
      )}
    </div>
  );
};
