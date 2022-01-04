import * as React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import moment from 'moment';
import { Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Box, Paper, IconButton } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { Post as PostType} from '../../store/posts/types';

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
    '& .MuiTypography-body1': {
      overflow: 'hidden',
      display: '-webkit-box',
      '-webkit-line-clamp': 3,
      '-webkit-box-orient': 'vertical',
    },
    '& .MuiTypography-h4': {
      overflow: 'hidden',
      display: '-webkit-box',
      '-webkit-line-clamp': 1,
      '-webkit-box-orient': 'vertical',
    },
  },
  name: {
    gridArea: 'name',
    paddingLeft: theme.spacing(1),
  },
  wrapperContent: {
    cursor: 'pointer',
    gridArea: 'wrapperContent',
    textDecoration: 'none',
    '& .MuiTypography-h4': {
      color: theme.palette.secondary.dark,
    },
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

interface PostProps {
  clickOnLike: (id: string) => void;
  article: PostType,
}

export const Post: React.FC<PostProps> = ({ article, clickOnLike }) => {
  const classes = useStyles();
  const { date, title, content, _id, author, likes } = article;


  const clickOnSave = () => {
    console.log('Save');
  };

  const handleClickOnLike = () => {
    clickOnLike(_id);
  }

  return (
    <Paper elevation={0} className={classes.articleRoot}>
      <Box alignItems='center' display='flex'>
        <AccountCircle />
        <Typography variant='caption' className={classes.name}>
          {author.firstName} {author.lastName}
        </Typography>
      </Box>
      <Typography variant='caption' className={classes.date}>
        {moment(date).format('LLL')}
      </Typography>
      <Link to={`/post/${_id}`} className={classes.wrapperContent}>
        <Typography variant='h4'>{title}</Typography>
        <Typography variant='body1' color='secondary'>
          {content}
        </Typography>
      </Link>
      <Box className={classes.btnGroup}>
        <IconButton size='small' onClick={clickOnSave} color='secondary'>
          <BookmarkBorderIcon />
        </IconButton>
        <IconButton size='small' onClick={handleClickOnLike}>
          <FavoriteIcon />
        </IconButton>
          {likes.length}
      </Box>
    </Paper>
  );
};
