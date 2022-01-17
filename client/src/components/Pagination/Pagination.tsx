import React, { useEffect } from 'react';
import {
  Pagination as MuiPagination,
  PaginationItem,
} from '@mui/material';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getPosts } from '../../store/posts/services';

interface PaginationProps {
  page: number | string;
}

export const Pagination: React.FC<PaginationProps> = ({ page }) => {
  const { amountOfPages } = useAppSelector(state => state.postsReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (page) {
      dispatch(getPosts(page));
    }
  }, [dispatch, page]);

  return (
    <div>
      <MuiPagination
        page={Number(page)}
        count={amountOfPages}
        color='secondary'
        renderItem={item => (
          <PaginationItem
            {...item}
            component={Link}
            to={`/posts?page=${item.page}`}
          />
        )}
      />
    </div>
  );
};
