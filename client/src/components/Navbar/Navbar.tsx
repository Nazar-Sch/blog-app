import * as React from 'react';
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
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { makeStyles } from '@mui/styles';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import uniqid from 'uniqid';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/auth/reducer';
import { useState } from 'react';
import { Search } from '../Search';
import { getPosts, getPostsBySearch } from '../../store/posts/services';
import { ChipData } from '../Chips/Chips';
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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isOpenSearchBar, setIsOpenSearchBar] = useState(false);
  const query = useSearchQuery();
  // const searchQuery = query.get('query');
  // const searchTags = query.get('tags');
  // const initialTagsLabels = searchTags?.split(',')
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState<ChipData[]>([]);
  const [tagLabel, setTagLabel] = useState<string>('');

  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.authReducer);
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const isPostsPage = location.pathname === '/posts';

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

  const handleOpenSearchBar = () => setIsOpenSearchBar(!isOpenSearchBar);

  const handleClearSearchInput = () => {
    setSearch('');
    dispatch(getPosts());
  };

  const handleChangeSearchInput = (e: any) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const handleSearchPost = () => {
    if (search.trim() || tags.length > 0) {
      const tagsLabels = tags.map(tag => tag.label).join(',')
      dispatch(getPostsBySearch({ search, tags: tagsLabels}));
      navigate(`/posts/search?query=${search || 'none'}&tags=${tagsLabels}`);
    } else {
      navigate('/');
    }
  };

  const handleDeleteTag = (tagToRemove: ChipData) => {
    console.log('tagToRemove', tagToRemove);
    setTags(tags =>
      tags.filter(tag => tag.key !== tagToRemove.key)
    );
  };

  const handleAddTags = () => {
    setTags(tags => ([...tags, { key: uniqid(), label: tagLabel }]));
    setTagLabel('');
  };

  const handleChangeChipLabel = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTagLabel(e.target.value);
  };
  

  return (
    <Box sx={{ flexGrow: 1 }} className={classes.root}>
      <AppBar position='static'>
        <Container>
          <Toolbar>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              {user.firstName} {user.lastName}
            </Typography>
            {isPostsPage && (
              <IconButton
                aria-label='search'
                onClick={handleOpenSearchBar}
              >
                <SearchIcon />
              </IconButton>
            )}
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
      {isPostsPage && (
        <Search
          open={isOpenSearchBar}
          handleClear={handleClearSearchInput}
          handleChangeSearch={handleChangeSearchInput}
          valueSearch={search}
          handleSearch={handleSearchPost}
          tags={tags}
          tagLabel={tagLabel}
          handleAddTags={handleAddTags}
          handleDelete={handleDeleteTag}
          handleAddChipts={handleAddTags}
          handleChangeChipLabel={handleChangeChipLabel}
        />
      )}
    </Box>
  );
};
