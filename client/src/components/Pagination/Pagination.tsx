import React from 'react';
import {
  Pagination as MuiPagination,
  PaginationItem,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useStyles } from './styles';

export const Pagination = ({ page }: { page: number }) => {
  const dispatch = useDispatch();

  const classes = useStyles();

  return (
    <div>
      <MuiPagination
        page={Number(page) | 1}
        count={5}
        renderItem={item => (
          <PaginationItem
            {...item}
            component={Link}
            to={`/posts?page=${1}`}
          />
        )}
      />
    </div>
  );
};
