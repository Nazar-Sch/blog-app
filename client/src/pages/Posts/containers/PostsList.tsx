import React from 'react';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { updateLikes } from '../../../store/posts/services';
import { Post } from '../components/Post';

export const PostsList = () => {
  const { posts } = useAppSelector(state => state.postsReducer);
  const dispatch = useAppDispatch();

  const clickOnLike = (id: string) => dispatch(updateLikes(id));

  return (
    <div>
      {posts.map(article => (
        <Post article={article} clickOnLike={clickOnLike} />
      ))}
    </div>
  );
};
