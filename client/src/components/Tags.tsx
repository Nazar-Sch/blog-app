import React from 'react';
import { Chip, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

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
  const classes = useStyles();

  const handleClick = () => {
    console.log('Click on tags');
  };
  return (
    <div className={classes.root}>
      <Typography variant='h6' gutterBottom>
        Topics:
      </Typography>
      <Chip label='Travel' onClick={handleClick} />
      <Chip label='City' onClick={handleClick} />
    </div>
  );
};
