import React from 'react';
import { Typography, Stack, Chip, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { Author } from '../../../store/posts/types';
import { Tags } from '../../../store/tags/types';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    maxWidth: 800,
    width: '100%',
    borderRight: `1px solid ${theme.palette.secondary.light}`,
  },
  actionButtons: {
    justifySelf: 'end',
    marginBottom: theme.spacing(2),
  },
  sideWrapper: {
    paddingLeft: theme.spacing(2),
    width: '100%',
    maxWidth: 350,
  },
}));

interface SelectedPostProps {
  author: Author;
  lastUpdatePost: string;
  tags: string[];
  content: string;
  title: string;
}
export const SelectedPost: React.FC<SelectedPostProps> = ({
  author,
  lastUpdatePost,
  tags,
  content,
  title,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant='body1'>
        Posted by {author.firstName} {author.lastName}
      </Typography>
      <Typography variant='caption'>{lastUpdatePost}</Typography>
      {tags && tags.length > 0 ? (
        <Stack direction='row' spacing={1} marginBottom={1} marginTop={1}>
          {tags.map(tag => (
            <Chip label={tag} />
          ))}
        </Stack>
      ) : null}
      <Typography
        variant='h5'
        align='center'
        marginTop={3}
        marginBottom={1}
      >
        {title}
      </Typography>
      <Typography variant='body1'>{content}</Typography>
    </div>
  );
};
