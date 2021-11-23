import * as React from 'react';
import { makeStyles } from '@mui/styles';
import { styled, Theme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

import { Article } from '../../types';

interface ArticlesProps {
  articles: Article[];
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  }
}));

export const Articles: React.FC<ArticlesProps> = ({ articles }) => {
  const classes = useStyles();

  if (articles.length === 0) {
    return <p>List is empty...</p>;
  }

  return (
    <div className={classes.root}> 
      {articles.map(article => (
        <Card sx={{ maxWidth: 345, margin: '0 20px' }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
                R
              </Avatar>
            }
            title={article.nickname}
            subheader='September 14, 2016'
          />
          <CardMedia
            component='img'
            height='194'
            image='/paella.jpg'
            alt='Paella dish'
          />
          <CardContent>
            <Typography variant='body2' color='text.secondary'>
              {article.short_description}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label='add to favorites'>
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label='share'>
              <ShareIcon />
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};
