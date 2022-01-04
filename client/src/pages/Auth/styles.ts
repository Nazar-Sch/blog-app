import { TextField, Theme } from '@mui/material';
import { makeStyles, styled } from '@mui/styles';
import { theme } from '../../styles/theme';

export const TitleTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'black',
    padding: 0,
  },
  '& label.Mui-error': {
    color: 'red',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderBottom: '1px solid black',
      border: 'none',
      borderRadius: 0,
    },
    '&:hover fieldset': {
      borderColor: 'black',
    },
    '&:focus fieldset': {
      borderColor: 'black',
    },
    '& .MuiInputBase-input': {
      fontSize: 16,
      padding: theme.spacing(1.5, 1),
    },
    '&.Mui-focused fieldset': {
      borderColor: 'black',
    },
    '&.Mui-error fieldset': {
      borderColor: 'red',
    },
  },
});

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'grid',
    marginTop: theme.spacing(2),
    maxWidth: theme.spacing(50),
    width: '100%',
    margin: 'auto',
    '& .MuiButton-outlined': {
      display: 'block',
      color: 'white',
      width: '100%',
      margin: theme.spacing(2, 0),
      justifySelf: 'center',
      fontSize: 16,
      backgroundColor: 'black',
      borderRadius: theme.spacing(1.5),
      padding: theme.spacing(0.5, 1),
      border: 'none',
      textTransform: 'none',
      '&:hover': {
        backgroundColor: 'black',
        border: 'none',
        boxShadow: 'none',
      },
      '&:active': {
        boxShadow: 'none',
        backgroundColor: 'black',
      },
      '&:focus': {
        boxShadow: 'none',
      },
    },
    '& button.Mui-disabled': {
      color: 'white',
      opacity: 0.3,
    },
  },
  link: {
    fontSize: 12,
    color: 'black',
    textTransform: 'none',
    textAlign: 'center',

    '&:active': {
      color: 'black',
      textTransform: 'none',
    },
  },
}));
