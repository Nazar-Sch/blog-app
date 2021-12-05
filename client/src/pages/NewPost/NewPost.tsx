import React from 'react';
import { Button } from '@mui/material';
import { useForm } from '../../hooks/useForm';
import { Article } from '../../types/initialTypes';
import { newArticleValidationSchema } from '../../validationSchema';
import { useStyles, TitleTextField, StoryTextField } from './styles';
import { addNewPost } from '../../api/posts';

export const NewPost: React.FC = () => {
  const initialValues = { title: '', content: '' };
  const { handleChange, handleSubmit, values, errors } = useForm<Article>({
    validations: newArticleValidationSchema,
    onSubmit: handleSubmitNewArticle,
    initialValues,
  });
  const classes = useStyles();

  const { title, content } = values;

  async function handleSubmitNewArticle() {
    const newArticle = { title, content };
    await addNewPost(newArticle);
  }

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
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
