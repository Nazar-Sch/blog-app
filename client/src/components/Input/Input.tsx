import React from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from '@mui/material';

interface InputProps {
  handleShowPassword?: () => void;
}

export const Input: React.FC<TextFieldProps & InputProps> = ({
  name,
  onChange,
  variant,
  type,
  handleShowPassword,
  ...rest
}) => (
  <div>
    <TextField
      name={name}
      onChange={onChange}
      variant={variant}
      type={type}
      InputProps={
        name === 'password'
          ? {
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={handleShowPassword}>
                    {type === 'password' ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : undefined
      }
      {...rest}
    />
  </div>
);
