import React from 'react';

import { CreatedPost } from '../../types/initialTypes';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createNewPost } from '../../store/posts/services';
import { PostForm } from '../../components/Forms/PostForm';

export const NewPost: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.authReducer);

  if (!user) {
    return <div>
      You are not allowed to create new post. Sign in!
    </div>
  }

  const author = {
    id: user?._id,
    firstName: user?.firstName,
    lastName: user?.lastName,
  };
  const initialValues = { title: '', content: '', author };

 const handleSubmitNewArticle = (post: CreatedPost) => {
    dispatch(createNewPost(post));
  }

  return (
    <PostForm
      handleSubmitArticle={handleSubmitNewArticle}
      initialValues={initialValues}
    />
  );
};
