import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Theme,
  InputAdornment,
  TextField,
  Tooltip,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import LogoutIcon from '@mui/icons-material/Logout';
import { makeStyles } from '@mui/styles';
import SearchIcon from '@mui/icons-material/Search';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/auth/reducer';
import { getPosts, getPostsBySearch } from '../../store/posts/services';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .MuiAppBar-root': {
      backgroundColor: 'white',
      paddingTop: '10px',
      paddingBottom: '10px',
      color: theme.palette.secondary.dark,
      boxShadow:
        'rgb(0 0 0 / 5%) 0px 6px 24px 0px, rgb(0 0 0 / 8%) 0px 0px 0px 1px',
    },
    '& .MuiButton-text': {
      textTransform: 'none',
      color: theme.palette.secondary.main,
      '&:hover': {
        background: 'none',
        color: 'black',
      },
    },
  },
  link: {
    margin: theme.spacing(0, 2),
    textDecoration: 'none',
    color: theme.palette.secondary.main,
    fontSize: 14,
    '&:hover': {
      color: theme.palette.secondary.dark,
    },
  },
}));

export const Navbar: React.FC = () => {
  const [query] = useSearchParams();
  const searchQuery = query.get('query');
  const [search, setSearch] = useState(searchQuery || '');

  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector(state => state.authReducer);
  const { currentPage } = useAppSelector(state => state.postsReducer);

  const logOut = () => {
    dispatch(logout());
  };

  if (!user) {
    return null;
  }

  const handleClearSearchInput = () => {
    setSearch('');
    dispatch(getPosts(currentPage || 1));
    navigate(`/posts`);
  };

  const handleChangeSearchInput = (e: any) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const handleSearchPost = () => {
    if (search.trim()) {
      dispatch(getPostsBySearch({ search }));
      navigate(`/posts/search?query=${search}`);
    } else {
      navigate('/');
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }} className={classes.root}>
      <AppBar position='static'>
        <Container>
          <Toolbar>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              {user.firstName} {user.lastName}
            </Typography>
            <TextField
              variant='standard'
              size='small'
              label='Search posts by title'
              InputProps={
                search.length > 0
                  ? {
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton onClick={handleClearSearchInput}>
                            <ClearIcon fontSize='small' />
                          </IconButton>
                          <IconButton
                            aria-label='search'
                            onClick={handleSearchPost}
                          >
                            <SearchIcon fontSize='small' />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }
                  : undefined
              }
              onChange={handleChangeSearchInput}
              value={search}
            />
            <Link className={classes.link} to='/posts'>
              Posts
            </Link>
            <Link className={classes.link} to='/new-story'>
              Write a story
            </Link>
            <Tooltip title='Logout'>
              <IconButton onClick={logOut}>
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
