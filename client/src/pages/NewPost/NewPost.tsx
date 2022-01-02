import React from 'react';
import { Button } from '@mui/material';

import { useForm } from '../../hooks/useForm';
import { Article } from '../../types/initialTypes';
import { newArticleValidationSchema } from '../../validationSchema';
import { useStyles } from './styles';
import { useAppDispatch } from '../../store/hooks';
import { createNewPost } from '../../store/posts/services';
import { PostForm } from '../../components/Forms/PostForm';

export const NewPost: React.FC = () => {
  const dispatch = useAppDispatch();
  const classes = useStyles();

  const initialValues = { title: '', content: '' };

  const { handleChange, handleSubmit, values, errors } = useForm<Article>({
    validations: newArticleValidationSchema,
    onSubmit: handleSubmitNewArticle,
    initialValues,
  });

  async function handleSubmitNewArticle() {
    // dispatch(createNewPost({ title, content }));
  }

  return (
    <PostForm
      handleSubmitArticle={handleSubmitNewArticle}
      initialValues={initialValues}
    />
  );
};
