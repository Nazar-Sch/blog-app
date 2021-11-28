import * as React from 'react';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Button, Container, Paper } from '@mui/material';

import { ArticlesProps } from '../types/initialTypes';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: 'auto',
  },
  articleRoot: {
    marginBottom: theme.spacing(4),
    padding: theme.spacing(4),
    width: '100%',
    borderLeft: 'none',
    borderRight: 'none',
    display: 'grid',
    gridTemplateAreas: `
      'name date'
      'title title'
      'content content'
      '. learn-more'
      `,
  },
  name: {
    gridArea: 'name',
  },
  date: {
    gridArea: 'date',
    justifySelf: 'end',
  },
  title: {
    gridArea: 'title',
  },
  contentData: {
    gridArea: 'content',
  },
  learnMore: {
    gridArea: 'learn-more',
    justifySelf: 'end',
  },
}));

export const Articles: React.FC<ArticlesProps> = ({ articles }) => {
  const classes = useStyles();

  const renderEmptyList = () => <Typography variant='h3'>List is empty...</Typography>;

  const renderArticles = () => (
    <>
      {articles.map(article => (
        <Paper elevation={8} className={classes.articleRoot}>
          <Typography variant='caption' className={classes.name}>
            User name
          </Typography>
          <Typography variant='caption' className={classes.date}>
            {article.date}
          </Typography>
          <Typography variant='h5' className={classes.title}>
            {article.title}
          </Typography>
          <Typography variant='body1' className={classes.contentData}>
            {article.content}
          </Typography>
          <Button
            href='#learn-more'
            size='small'
            disableElevation
            className={classes.learnMore}
          >
            Learn more
          </Button>
        </Paper>
      ))}
    </>
  );

  return (
    <Container maxWidth='lg'>
      {articles.length > 0 ? renderArticles() : renderEmptyList()}
    </Container>
  );
};
