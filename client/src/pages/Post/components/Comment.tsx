import React, { ChangeEvent, useState } from 'react';
import {
  Button,
  IconButton,
  TextField,
  Theme,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import moment from 'moment';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { FavoriteOutlined } from '@mui/icons-material';

import { Comments as CommentsType } from '../../../store/posts/types';
import { UserData } from '../../../store/auth/types';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
    margin: theme.spacing(2, 0),
    padding: theme.spacing(1, 2),
    borderRadius: 15,
    width: '100%',
    display: 'grid',
    gridTemplateAreas: `
    'name date'
    'body body'
    'likes-actions btn-actions'
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
  commentLikeActions: {
    gridArea: 'likes-actions',
  },
  commentBtnActions: {
    gridArea: 'btn-actions',
    justifySelf: 'end',
  },
}));

interface CommentProps {
  user: UserData;
  comment: CommentsType;
  selectedCommentId: string;
  editCommentMode: boolean;
  saveEditedComment: (id: string, text: string) => void;
  handleEditModeComment: (id: string) => void;
  handleClickLikeComment: (id: string) => void;
  handleDeleteComment: (id: string) => void;
}

export const Comment: React.FC<CommentProps> = ({
  user,
  comment,
  selectedCommentId,
  editCommentMode,
  saveEditedComment,
  handleEditModeComment,
  handleClickLikeComment,
  handleDeleteComment,
}) => {
  const { text, author, date, _id, likes } = comment;
  const [editCommentValue, setEditCommentValue] = useState(text);
  const classes = useStyles();

  const handleEditComment = (e: ChangeEvent<HTMLInputElement>) =>
  setEditCommentValue(e.target.value);

  return (
    <div className={classes.root}>
      <Typography variant='subtitle2' className={classes.commentName}>
        {author.firstName} {author.lastName}
      </Typography>
      <Typography
        variant='caption'
        className={classes.commentDate}
        color='secondary'
      >
        {moment(date).startOf('s').fromNow()}
      </Typography>
      <Typography
        variant='body1'
        className={classes.commentBody}
        marginTop={1}
        marginBottom={1}
      >
        {_id === selectedCommentId && editCommentMode ? (
          <>
            <TextField
              variant='standard'
              value={editCommentValue}
              onChange={handleEditComment}
              color='secondary'
            />
            <Button
              variant='text'
              onClick={() => saveEditedComment(_id, editCommentValue)}
            >
              Save
            </Button>
          </>
        ) : (
          text
        )}
      </Typography>
      <IconButton
        className={classes.commentLikeActions}
        size='small'
        onClick={() => handleClickLikeComment(_id)}
      >
        <FavoriteOutlined fontSize='small' />
        {likes.length > 0 && likes.length}
      </IconButton>
      {user._id === comment.author.id && (
        <div className={classes.commentBtnActions}>
          <IconButton
            size='small'
            onClick={() => handleEditModeComment(_id)}
          >
            <EditIcon fontSize='small' />
          </IconButton>
          <IconButton
            size='small'
            onClick={() => handleDeleteComment(_id)}
          >
            <DeleteOutlineIcon fontSize='small' />
          </IconButton>
        </div>
      )}
    </div>
  );
};
