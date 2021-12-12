import React from 'react';
import { addNewPost } from '../../api/posts';
import { PostForm } from '../../components/Forms/PostForm';
import { CreatedPost } from '../../types/initialTypes';

export const NewPost: React.FC = () => {
  const initialValues = { title: '', content: '' };

  const handleSubmitNewArticle = async (post: CreatedPost) =>
    await addNewPost(post);

  return (
    <PostForm
      handleSubmitArticle={handleSubmitNewArticle}
      initialValues={initialValues}
    />
  );
};
