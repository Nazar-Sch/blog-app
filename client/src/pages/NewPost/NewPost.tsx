import { Button, TextField, Theme } from '@mui/material';
import { makeStyles, styled } from '@mui/styles';
import moment from 'moment';
import React from 'react';
import { useForm } from '../../hooks/useForm';
import { Article, NewArticleProps } from '../../types/initialTypes';
import { newArticleValidationSchema } from '../../validationSchema';

const TitleTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: 'none',
    },
    '& .MuiInputBase-input': {
      fontSize: 38,
    },
  },
});

const StoryTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: 'none',
    },
    '& .MuiInputBase-input': {
      fontSize: 26,
    },
  },
});

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'grid',
    marginTop: theme.spacing(2),
    '& .MuiButton-outlined': {
      justifySelf: 'center',
      fontSize: 14,
      backgroundColor: theme.palette.success.main,
      color: '#fff',
      borderRadius: theme.spacing(1.5),
      padding: theme.spacing(0.5, 1.5),
      border: 'none',
      textTransform: 'none',
      '&:hover': {
        backgroundColor: theme.palette.success.main,
        border: 'none',
        boxShadow: 'none',
      },
      '&:active': {
        boxShadow: 'none',
        backgroundColor: theme.palette.success.main,
      },
      '&:focus': {
        boxShadow: 'none',
      },
    },
  },
}));

export const NewPost: React.FC = () => {
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
    console.log(newArticle);
    // handleChangeArticle(newArticle);
  }

  return (
    <form className={classes.root}>
      <TitleTextField
        name='title'
        value={title}
        onChange={handleChange('title')}
        fullWidth
        error={Boolean(errors.title)}
        helperText={errors.title}
        placeholder='Title'
      />
      <StoryTextField
        multiline
        rows={5}
        name='content'
        value={content}
        onChange={handleChange('content')}
        fullWidth
        error={Boolean(errors.content)}
        helperText={errors.content}
        placeholder='Tell your story...'
      />
      <Button type='submit' variant='outlined'>
        Publish
      </Button>
    </form>
  );
};
