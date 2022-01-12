import React from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createNewPost } from '../../store/post/services';
import { PostForm } from '../../components/Forms/PostForm';
import { useNavigate } from 'react-router-dom';
import { CreatedPost } from '../../types/initialTypes';

export const NewPost: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.authReducer);
  const navigate = useNavigate();

  if (!user) {
    return <div>You are not allowed to create new post. Sign in!</div>;
  }

  const author = {
    id: user?._id,
    firstName: user?.firstName,
    lastName: user?.lastName,
  };
  const initialValues = { title: '', content: '', author };

  const handleSubmitNewArticle = (createdPost: CreatedPost) => {
    dispatch(createNewPost({ createdPost, cb: () => navigate(`/posts`) }));
  };

  return (
    <PostForm
      handleSubmitArticle={handleSubmitNewArticle}
      initialValues={initialValues}
    />
  );
};
