import * as React from 'react';
import { Theme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { Box, Paper, IconButton } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { ArticlesProps } from '../../types/initialTypes';
import { makeStyles } from '@mui/styles';
import moment from 'moment';

const useStyles = makeStyles((theme: Theme) => ({
  articleRoot: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    padding: theme.spacing(4),
    width: '100%',
    borderLeft: 'none',
    borderRight: 'none',
    display: 'grid',
    gridTemplateAreas: `
      'name date'
      'wrapperContent wrapperContent'
      '. btnGroup'
      `,
  },
  name: {
    gridArea: 'name',
    paddingLeft: theme.spacing(1),
  },
  wrapperContent: {
    cursor: 'pointer',
    gridArea: 'wrapperContent',
  },
  date: {
    gridArea: 'date',
    justifySelf: 'end',
  },
  btnGroup: {
    gridArea: 'btnGroup',
    justifySelf: 'end',
  },
}));

export const Post: React.FC<ArticlesProps> = ({ article }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  
  const openArticle = (id: string) => {
    navigate(`/post/${id}`);
  };

  const clickOnLike = () => {
    console.log('Like');
  };

  const clickOnSave = () => {
    console.log('Save');
  };

  return (
    <Paper elevation={0} className={classes.articleRoot}>
      <Box alignItems='center' display='flex'>
        <AccountCircle />
        <Typography variant='caption' className={classes.name}>
          User name
        </Typography>
      </Box>
      <Typography variant='caption' className={classes.date}>
        {moment(article.date).format('LLL')}
      </Typography>
      <Box onClick={() => openArticle(article._id)} className={classes.wrapperContent}>
        <Typography variant='h4'>{article.title}</Typography>
        <Typography variant='body1' color='secondary'>
          {article.content}
        </Typography>
      </Box>
      <Box className={classes.btnGroup}>
        <IconButton size='small' onClick={clickOnSave} color='secondary'>
          <BookmarkBorderIcon />
        </IconButton>
        <IconButton size='small' onClick={clickOnLike}>
          <FavoriteIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};
