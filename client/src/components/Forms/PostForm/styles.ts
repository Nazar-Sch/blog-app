import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'grid',
    marginTop: theme.spacing(2),
    width: '100%',
    '& .MuiButton-outlined': {
      justifySelf: 'center',
      fontSize: 14,
      backgroundColor: theme.palette.success.main,
      color: '#fff',
      borderRadius: theme.spacing(1.5),
      padding: theme.spacing(0.5, 1),
      border: 'none',
      textTransform: 'none',
      '&:hover': {
        backgroundColor: theme.palette.success.main,
        border: 'none',
        boxShadow: 'none',
      },
      '&:active': {
        boxShadow: 'none',
        backgroundColor: theme.palette.success.main,
      },
      '&:focus': {
        boxShadow: 'none',
      },
    },
  },
}));
