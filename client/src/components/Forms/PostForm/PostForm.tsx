import React, { ChangeEvent, useState } from 'react';
import uniqid from 'uniqid';

import { Button } from '@mui/material';
import { useForm } from '../../../hooks/useForm';
import { Article, CreatedPost } from '../../../types/initialTypes';
import { newArticleValidationSchema } from '../../../validationSchema';
import { useStyles } from './styles';
import { InputField } from '../Input';
import { TextFieldMultiline } from '../TextField';
import { useAppSelector } from '../../../store/hooks';
import { Post } from '../../../store/posts/types';
import { ChipData, Chips } from '../../Chips/Chips';

interface PostFormProps {
  handleSubmitArticle: (post: CreatedPost) => void;
  initialValues: CreatedPost;
}

export const PostForm: React.FC<PostFormProps> = ({
  handleSubmitArticle,
  initialValues,
}) => {
  const [title, setTitle] = useState(initialValues.title || '');
  const [content, setContent] = useState(initialValues.content || '');
  const [tags, setTags] = useState<ChipData[]>([]);
  const [tagLabel, setTagLabel] = useState<string>('');
  const classes = useStyles();


  const handleDeleteTag = (tagToRemove: ChipData) => {
    setTags(tags => tags.filter(tag => tag.key !== tagToRemove.key));
  };

  const handleAddTags = () => {
    setTags(tags => [...tags, { key: uniqid(), label: tagLabel }]);
    setTagLabel('');
  };

  const handleChangeChipLabel = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTagLabel(e.target.value);
  };
 

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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const updatedPost = {
      title,
      content,
      author: initialValues.author,
      tags: tags.map(tag => tag.label),
    };
    handleSubmitArticle(updatedPost);
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <Chips
        tags={tags}
        tagLabel={tagLabel}
        handleDelete={handleDeleteTag}
        handleAddChipts={handleAddTags}
        handleChangeChipLabel={handleChangeChipLabel}
      />
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
