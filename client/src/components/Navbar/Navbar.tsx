import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Menu,
  MenuItem,
  Theme,
  InputAdornment,
  TextField,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

import AccountCircle from '@mui/icons-material/AccountCircle';
import { makeStyles } from '@mui/styles';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/auth/reducer';
import { getPosts, getPostsBySearch } from '../../store/posts/services';
import { useSearchQuery } from '../../utils/searchQuery';

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
  const query = useSearchQuery();
  const searchQuery = query.get('query');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [search, setSearch] = useState(searchQuery || '');

  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector(state => state.authReducer);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    dispatch(logout());
  };

  if (!user) {
    return null;
  }

  const handleClearSearchInput = () => {
    setSearch('');
    dispatch(getPosts());
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
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleMenu}
              color='inherit'
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={logOut}>Sign out</MenuItem>
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
