import { TextField, Theme } from '@mui/material';
import { makeStyles, styled } from '@mui/styles';

export const TitleTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: 'none',
    },
    '& .MuiInputBase-input': {
      fontSize: 38,
    },
  },
});

export const StoryTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: 'none',
    },
    '& .MuiInputBase-input': {
      fontSize: 26,
    },
  },
});


export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'grid',
    marginTop: theme.spacing(2),
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