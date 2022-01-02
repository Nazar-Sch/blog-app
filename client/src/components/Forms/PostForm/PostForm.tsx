import React from 'react';
import { Button } from '@mui/material';
import { useForm } from '../../../hooks/useForm';
import { Article, CreatedPost } from '../../../types/initialTypes';
import { newArticleValidationSchema } from '../../../validationSchema';
import { useStyles } from './styles';
import { InputField } from '../Input';
import { TextFieldMultiline } from '../TextField';

interface PostFormProps {
  handleSubmitArticle: (post: CreatedPost) => void;
  initialValues: CreatedPost;
}

export const PostForm: React.FC<PostFormProps> = ({
  initialValues,
  handleSubmitArticle,
}) => {
  const { handleChange, handleSubmit, values, errors } = useForm<Article>({
    validations: newArticleValidationSchema,
    onSubmit: handleSubmitArticle,
    initialValues,
  });
  const classes = useStyles();

  const { title, content } = values;

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <InputField
        name='title'
        value={title}
        onChange={handleChange('title')}
        fullWidth
        error={Boolean(errors.title)}
        helperText={errors.title}
        placeholder='Title'
      />
      <TextFieldMultiline
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
