import React from 'react';

import { CreatedPost } from '../../types/initialTypes';
import { useAppDispatch } from '../../store/hooks';
import { createNewPost } from '../../store/posts/services';
import { PostForm } from '../../components/Forms/PostForm';

export const NewPost: React.FC = () => {
  const dispatch = useAppDispatch();

  const initialValues = { title: '', content: '' };

 const handleSubmitNewArticle = async (post: CreatedPost) => {
    dispatch(createNewPost(post));
  }

  return (
    <PostForm
      handleSubmitArticle={handleSubmitNewArticle}
      initialValues={initialValues}
    />
  );
};
