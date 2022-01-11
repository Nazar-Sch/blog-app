import React, { ChangeEvent, useState } from 'react';
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

import { useAppDispatch } from '../../../store/hooks';
import { Comment } from '../components/Comment';
import { Comments as CommentsType } from '../../../store/posts/types';
import { Post } from '../../../store/posts/types';
import {
  addComment,
  deleteComment,
  editComment,
  likeComment,
} from '../../../store/posts/services';
import { UserData } from '../../../store/auth/types';

interface CommentsProps {
  comments: CommentsType[];
  selectedPost: Post;
  user: UserData;
}

export const Comments: React.FC<CommentsProps> = ({
  comments,
  selectedPost,
  user,
}) => {
  const [newComment, setNewComment] = useState('');
  const [editCommentMode, setEditCommentMode] = useState<boolean>(false);
  const [selectedCommentId, setSelectedCommentId] = useState('');

  const dispatch = useAppDispatch();

  const handleChangeNewComment = (e: ChangeEvent<HTMLInputElement>) =>
    setNewComment(e.target.value);

  const handleClearInputNewComment = () => setNewComment('');

  const handleCreateNewComment = () => {
    dispatch(
      addComment({
        id: selectedPost._id,
        text: newComment,
        author: user,
      })
    );
  };

  const handleDeleteComment = (commentId: string) =>
    dispatch(deleteComment({ postId: selectedPost._id, commentId }));

  const handleClickLikeComment = (commentId: string) =>
    dispatch(likeComment({ postId: selectedPost._id, commentId }));

  const handleEditModeComment = (id: string) => {
    setEditCommentMode(!editCommentMode);
    setSelectedCommentId(id);
  };

  const saveEditedComment = (commentId: string, text: string) => {
    dispatch(
      editComment({
        postId: selectedPost._id,
        commentId,
        text,
      })
    );
    setEditCommentMode(false);
  };

  return (
    <>
      <>
        <TextField
          variant='standard'
          value={newComment}
          onChange={handleChangeNewComment}
          label='Type you thoughts'
          fullWidth
          multiline
          InputProps={{
            endAdornment: (
              <InputAdornment position='start'>
                <IconButton onClick={handleClearInputNewComment}>
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          onClick={handleCreateNewComment}
          variant='text'
          color='secondary'
          size='small'
          fullWidth
        >
          Add comment
        </Button>
        {comments.map(comment => (
          <Comment
            comment={comment}
            user={user}
            selectedCommentId={selectedCommentId}
            handleDeleteComment={handleDeleteComment}
            handleClickLikeComment={handleClickLikeComment}
            handleEditModeComment={handleEditModeComment}
            saveEditedComment={saveEditedComment}
            editCommentMode={editCommentMode}
          />
        ))}
      </>
    </>
  );
};
