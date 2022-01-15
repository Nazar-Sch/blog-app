import React, { useEffect, useState } from 'react';
import {
  Chip,
  CircularProgress,
  IconButton,
  Theme,
  Typography,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { makeStyles } from '@mui/styles';

import { getPosts, getPostsByTag } from '../store/posts/services';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getTags } from '../store/tags/services';
import { Tags as TagsType } from '../store/tags/types';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderLeft: `1px solid ${theme.palette.secondary.light}`,
    marginTop: 25,
    padding: theme.spacing(2),
    '& .MuiChip-root': {
      margin: theme.spacing(0.5),
    },
  },
}));

export const Tags = () => {
  const [isShowClearButton, setIsShowButtonClear] = useState(false);
  const [selectedTag, setSelectedTag] = useState('');

  const dispatch = useAppDispatch();
  const { tags, isLoading } = useAppSelector(state => state.tagsReducer);
  const { currentPage } = useAppSelector(state => state.postsReducer);
  const classes = useStyles();

  useEffect(() => {
    dispatch(getTags());
  }, [dispatch]);

  const handleClick = (tag: TagsType) => async () => {
    setSelectedTag(tag.label);
    dispatch(getPostsByTag(tag.posts.join(',')));
    setIsShowButtonClear(true);
  };

  const handleClearSearchByTags = () => {
    dispatch(getPosts(currentPage || 1));
    setIsShowButtonClear(false);
    setSelectedTag('');
  };

  return (
    <div className={classes.root}>
      {isLoading ? (
        <CircularProgress color='secondary' />
      ) : (
        <>
          <Typography variant='h6' gutterBottom>
            Discover by tags:
            {isShowClearButton && (
              <IconButton size='small' onClick={handleClearSearchByTags}>
                <ClearIcon />
              </IconButton>
            )}
          </Typography>
          {tags && (
            <>
              {tags.map(tag => (
                <Chip
                  variant={
                    selectedTag === tag.label ? 'filled' : 'outlined'
                  }
                  component={'button'}
                  label={tag.label}
                  clickable
                  onClick={handleClick(tag)}
                />
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};
