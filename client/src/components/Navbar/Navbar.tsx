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
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';

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
    marginRight: theme.spacing(2),
    textDecoration: 'none',
    color: theme.palette.secondary.main,
    fontSize: 14,
    '&:hover': {
      color: theme.palette.secondary.dark,
    },
  },
}));

interface NavbarProps {
  userName: string | null;
}

export const Navbar: React.FC<NavbarProps> = ({ userName }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { signout } = useAuth();

  const navigate = useNavigate();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    signout(() => navigate('/signin'));
  };

  if (!userName) {
    return null;
  }

  return (
    <Box sx={{ flexGrow: 1 }} className={classes.root}>
      <AppBar position='static'>
        <Container>
          <Toolbar>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              {userName}
            </Typography>
            <Link className={classes.link} to='/'>
              Home
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
              <MenuItem onClick={handleClose}>Sign out</MenuItem>
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
