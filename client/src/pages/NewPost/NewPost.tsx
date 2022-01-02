import React from 'react';
import { useNavigate } from 'react-router-dom';

import { addNewPost } from '../../api/posts';
import { PostForm } from '../../components/Forms/PostForm';
import { CreatedPost } from '../../types/initialTypes';

export const NewPost: React.FC = () => {
  const navigate = useNavigate();

  const initialValues = { title: '', content: '' };

  const handleSubmitNewArticle = async (post: CreatedPost) => {
    navigate('/');
    return await addNewPost(post);
  };

  return (
    <PostForm
      handleSubmitArticle={handleSubmitNewArticle}
      initialValues={initialValues}
    />
  );
};
