import React, { FormEvent, useState } from 'react';
import Button from '@mui/material/Button';
import { Theme } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { makeStyles } from '@mui/styles';

import { useFormCustom } from '../../hooks/useForm';
import { Post } from '../../components/Post';
import { Article } from '../../types';
import { validationShcema } from '../../validationSchema';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1, 0),
    },
  },
}));

interface NewArticleProps {
  openPopup: boolean;
  handleClosePopup: () => void;
  handleChangeArticle: (article: Article) => void;
}

export const NewArticle: React.FC<NewArticleProps> = ({
  openPopup,
  handleClosePopup,
  handleChangeArticle,
}) => {
  const classes = useStyles();

  const { handleSubmit, handleChange, values, errors } =
    useFormCustom<Article>({
      validations: validationShcema,
    });

  const { nickname, short_description } = values;

  const handleSubmitNewArticle = (e: React.FormEvent<HTMLFormElement>)  => {
    handleSubmit(e);
    handleChangeArticle(values);
    handleClosePopup();
  };

  const handleClose = () => {
    handleClosePopup();
  };

  const disabledSubmit = !!errors.nickname && !!errors.short_description;

  return (
    <Dialog open={openPopup} onClose={handleClose}>
      <form className={classes.root} onSubmit={handleSubmitNewArticle}>
        <DialogTitle>New Article</DialogTitle>
        <DialogContent>
          <TextField
            id='outlined-basic'
            label='Your Name of Post'
            variant='outlined'
            helperText={errors.nickname}
            name='nickname'
            value={nickname}
            error={!!errors.nickname}
            // onChange={handleChange('nickname')}
            onInput={handleChange('nickname')}
            fullWidth
            required
          />
          <TextField
            id='outlined-basic'
            label='Heading of Article'
            variant='outlined'
            helperText={errors.short_description}
            name='heading'
            value={short_description}
            error={!!errors.short_description}
            // onChange={heading}
            onInput={handleChange('short_description')}
            fullWidth
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button disabled={disabledSubmit} type='submit'>Create</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
