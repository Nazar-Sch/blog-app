import { Button, Paper, TextField } from '@mui/material';
import React, { ChangeEvent, useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { addComment } from '../../store/posts/services';
import { Comments as CommentsType } from '../../store/posts/types';

interface CommentsProps {
  postId: string;
  comments: CommentsType[];
  user: { firstName: string; lastName: string };
}

export const Comments: React.FC<CommentsProps> = ({
  postId,
  comments,
  user,
}) => {
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();

  const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setText(e.target.value);
  };

  const createNewComment = () => {
    const payload = {
      id: postId,
      text,
      author: user,
    };
    dispatch(addComment(payload));
  };

  return (
    <div>
      <TextField
        variant='standard'
        value={text}
        onChange={handleChangeText}
        placeholder='Type your thoughts'
      />
      <Button variant='contained' onClick={createNewComment}>
        Add comment
      </Button>
      {comments.map(comment => (
        <Paper>{comment.text}</Paper>
      ))}
    </div>
  );
};
