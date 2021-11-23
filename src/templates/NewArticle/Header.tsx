import React from 'react';
import { Button, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(3, 5),

    '& .MuiButton-text': {
      textTransform: 'capitalize',
      color: theme.palette.secondary.main,
    },
  },
}));

interface HeaderProps {
  handleShowPopup: () => void;
}

export const Header: React.FC<HeaderProps> = ({ handleShowPopup }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <span>MyBlog</span>
      <div>
        <Button variant='text'>Home</Button>
        <Button variant='text' onClick={handleShowPopup}>New Article</Button>
      </div>
    </div>
  );
};
