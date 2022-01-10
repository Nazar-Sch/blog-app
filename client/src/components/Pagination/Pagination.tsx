import React, { useEffect } from 'react';
import {
  Pagination as MuiPagination,
  PaginationItem,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useStyles } from './styles';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getPosts } from '../../store/posts/services';

interface PaginationProps {
  page: string;
}

export const Pagination: React.FC<PaginationProps> = ({ page = '1' }) => {
  const dispatch = useAppDispatch();

  // useEffect((() => {
  //   dispatch(getPosts(page));
  // }), [dispatch]);

  return (
    <div>
      <MuiPagination
        page={Number(page) | 1}
        count={5}
        renderItem={item => (
          <PaginationItem
            {...item}
            component={Link}
            to={`/posts?page=${page}`}
          />
        )}
      />
    </div>
  );
};
