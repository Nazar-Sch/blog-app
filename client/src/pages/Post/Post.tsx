import React, { useEffect, useState } from 'react';
import {
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  Theme,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { makeStyles } from '@mui/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import moment from 'moment';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Chip from '@mui/material/Chip';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import PersonIcon from '@mui/icons-material/Person';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  editPost,
  getSelectedPost,
  deletePost,
  updateLikes,
} from '../../store/posts/services';
import { PostForm } from '../../components/Forms/PostForm';
import { CreatedPost } from '../../types/initialTypes';
import { deletePostByID, editPostById } from '../../api/posts';
import { Comments } from '../../components/Comments';
import { Comments as CommentsType } from '../../store/posts/types';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

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
  comment: {
    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
    margin: theme.spacing(2, 0),
    padding: theme.spacing(1, 2),
    borderRadius: 15,
    width: '100%',
    display: 'grid',
    gridTemplateAreas: `
    'name date'
    'body body'
    'like dislike'
    `,
  },
  commentName: {
    gridArea: 'name',
  },
  commentDate: {
    gridArea: 'date',
    justifySelf: 'end',
  },
  commentBody: {
    gridArea: 'body',
  },
  commentLike: {
    gridArea: 'like',
  },
  commentDislike: {
    gridArea: 'dislike',
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

  const { isLoading, selectedPost, error } = useAppSelector(
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
    dispatch(editPost({ id: selectedPost._id, post: updatedPost }));
    setEditMode(false);
  };

  const renderEditMode = () => (
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
  );

  const handleClickLike = () => dispatch(updateLikes(_id));
  const handleClickLikeComment = () => {
    // dispatch like comment
  };

  const handleClickComments = () => {
    setIsShowComments(!isShowComments);
  };

  const handleSavePost = () => {
    // dispatch add to favourite with id
  };

  const renderComment = (comment: CommentsType) => {
    return (
      <div className={classes.comment}>
        <Typography variant='subtitle2' className={classes.commentName}>
          {comment.author.firstName} {comment.author.lastName}
        </Typography>
        <Typography variant='caption' className={classes.commentDate} color='secondary'>
          {moment(comment.date).startOf('hour').fromNow()}
        </Typography>
        <Typography variant='body1' className={classes.commentBody} marginTop={1} marginBottom={1}>{comment.text}</Typography>
        <IconButton size='small' onClick={handleClickLikeComment} className={classes.commentLike}>
          <ThumbUpAltIcon fontSize='small' />
        </IconButton>
        <IconButton size='small' onClick={handleClickLikeComment} className={classes.commentDislike}>
          <ThumbDownAltIcon fontSize='small' />
        </IconButton>
      </div>
    );
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
        <>{comments.map(comment => renderComment(comment))}</>
      )}
    </div>
  );

  const renderSelectedPost = () => (
    <>
      <div className={classes.selectedPostWrapper}>
        <Typography variant='body1'>
          Posted by {selectedPost?.author.firstName}{' '}
          {selectedPost?.author.lastName}
        </Typography>
        <Typography variant='caption'>
          {moment(selectedPost.date).format('LLL')}
        </Typography>
        {selectedPost.tags && selectedPost.tags.length > 0 ? (
          <Stack
            direction='row'
            spacing={1}
            marginBottom={1}
            marginTop={1}
          >
            {selectedPost.tags.map(tag => (
              <Chip label={tag} />
            ))}
          </Stack>
        ) : null}
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
        <Typography
          variant='h5'
          align='center'
          marginTop={3}
          marginBottom={1}
        >
          {selectedPost?.title}
        </Typography>
        <Typography variant='body1'>{selectedPost?.content}</Typography>
        {/* <Typography variant='body1'>Comments:</Typography> */}
        {/* <Comments
          comments={selectedPost.comments}
          postId={selectedPost._id}
          user={user}
        /> */}
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
