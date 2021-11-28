import React from 'react';
import moment from 'moment';
import Button from '@mui/material/Button';
import { Theme } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { makeStyles } from '@mui/styles';

import { useForm } from '../hooks/useForm';
import { Article, NewArticleProps } from '../types/initialTypes';
import { newArticleValidationSchema } from '../validationSchema';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1, 0),
    },
  },
}));

export const NewArticle: React.FC<NewArticleProps> = ({
  openPopup,
  handleClosePopup,
  handleChangeArticle,
}) => {
  const initialValues = { title: '', content: '' };
  const { handleChange, handleSubmit, values, errors } = useForm<Article>({
    validations: newArticleValidationSchema,
    onSubmit: handleSubmitNewArticle,
    initialValues,
  });
  const classes = useStyles();

  const { title, content } = values;

  function handleSubmitNewArticle() {
    const newArticle = {
      date: moment().format('LLL'),
      title,
      content,
    };
    handleChangeArticle(newArticle);
    handleClosePopup();
  }

  const handleClose = () => {
    handleClosePopup();
  };

  return (
    <Dialog open={openPopup} onClose={handleClose}>
      <form className={classes.root} onSubmit={handleSubmit}>
        <DialogTitle>New Article</DialogTitle>
        <DialogContent>
          <TextField
            id='outlined-basic'
            label='Title'
            variant='outlined'
            name='title'
            value={title}
            onChange={handleChange('title')}
            fullWidth
            error={Boolean(errors.title)}
            helperText={errors.title}
          />
          <TextField
            id='outlined-multiline-static'
            label='Tell about your story...'
            multiline
            rows={5}
            name='content'
            value={content}
            onChange={handleChange('content')}
            fullWidth
            error={Boolean(errors.content)}
            helperText={errors.content}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type='submit'>Create</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
