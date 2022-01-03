import React, { ChangeEvent, useState } from 'react';
import { Button } from '@mui/material';
import { useForm } from '../../../hooks/useForm';
import { Article, CreatedPost } from '../../../types/initialTypes';
import { newArticleValidationSchema } from '../../../validationSchema';
import { useStyles } from './styles';
import { InputField } from '../Input';
import { TextFieldMultiline } from '../TextField';
import { useAppSelector } from '../../../store/hooks';

interface PostFormProps {
  handleSubmitArticle: (post: CreatedPost) => void;
  initialValues: CreatedPost;
}

export const PostForm: React.FC<PostFormProps> = ({
  initialValues,
  handleSubmitArticle,
}) => {
  const [title, setTitle] = useState(initialValues.title || '');
  const [content, setContent] = useState(initialValues.content || '');
  const { user } = useAppSelector(state => state.authReducer);

  const classes = useStyles();

  const handleChangeTitle = (
    e: ChangeEvent<HTMLInputElement & HTMLSelectElement>
  ) => {
    setTitle(e.target.value);
  };

  const handleChangeContent = (
    e: ChangeEvent<HTMLInputElement & HTMLSelectElement>
  ) => {
    setContent(e.target.value);
  };

  const handleSubmit = () => {
    const post = {
      title,
      content,
      author: { 
        firstName: user?.firstName,
        lastName: user?.lastName,
        id: user?._id,
      },
      likes: [],
    }
    console.log(post);
    return handleSubmitArticle(post);
  }

  return (
    <form
      className={classes.root}
      onSubmit={handleSubmit}
    >
      <InputField
        name='title'
        value={title}
        onChange={handleChangeTitle}
        fullWidth
        // error={Boolean(errors.title)}
        // helperText={errors.title}
        placeholder='Title'
      />
      <TextFieldMultiline
        multiline
        name='content'
        value={content}
        onChange={handleChangeContent}
        fullWidth
        // error={Boolean(errors.content)}
        // helperText={errors.content}
        placeholder='Tell your story...'
      />
      <Button type='submit' variant='outlined'>
        Publish
      </Button>
    </form>
  );
};
