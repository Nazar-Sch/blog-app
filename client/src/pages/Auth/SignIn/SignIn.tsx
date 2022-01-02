import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import { Formik, Form, FormikProps } from 'formik';
import { Link, useNavigate } from 'react-router-dom';

import { Input } from '../../../components/Input';
import { SignInProps } from '../../../api/user';
import { validationSignIn } from '../../../utils/validations';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { signin } from '../../../store/auth/services';
import { useStyles, TitleTextField } from '../styles';

interface IFormStatus {
  message: string;
  type: string;
}

interface IFormStatusProps {
  [key: string]: IFormStatus;
}

const formStatusProps: IFormStatusProps = {
  success: {
    message: 'Signed up successfully.',
    type: 'success',
  },
  duplicate: {
    message: 'Email-id already exist. Please use different email-id.',
    type: 'error',
  },
  error: {
    message: 'Something went wrong. Please try again.',
    type: 'error',
  },
};

export const SignIn = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, isLoading, error, isLoggedIn } = useAppSelector(
    state => state.authReducer
  );

  if (isLoggedIn) {
    navigate('/posts');
  }

  const intialValues = { email: '', password: '' };

  const handleShowPassword = () => setShowPassword(!showPassword);

  const onSubmit = ({ email, password }: SignInProps) => {
    dispatch(signin({ email, password }));
  };

  return (
    <Formik
      initialValues={intialValues}
      validationSchema={validationSignIn}
      onSubmit={onSubmit}
    >
      {({
        values,
        handleChange,
        handleSubmit,
        errors,
        touched,
        handleBlur,
        dirty,
      }: FormikProps<SignInProps>) => (
        <div className={classes.root}>
          <Typography variant='h3'>Sign In</Typography>
          <Form>
            <Input
              name='email'
              label='Your email'
              variant='standard'
              margin="normal"
              fullWidth
              type='text'
              onChange={handleChange}
              value={values.email}
              helperText={
                errors.email && touched.email ? errors.email : ''
              }
              error={errors.email && touched.email ? true : false}
              onBlur={handleBlur}
            />
            <Input
              name='password'
              label='Your password'
              id='standard-password-input'
              variant='standard'
              margin="normal"
              fullWidth
              type={showPassword ? 'text' : 'password'}
              onChange={handleChange}
              value={values.password}
              handleShowPassword={handleShowPassword}
              helperText={
                errors.password && touched.password
                  ? 'Please type valid password. One uppercase, one lowercase, one special character and no spaces'
                  : ''
              }
              error={errors.password && touched.password ? true : false}
              onBlur={handleBlur}
            />
            <Button onClick={handleSubmit} variant='outlined' type='submit' disabled={!dirty}>
              Submit
            </Button>
            <Link to='/signup' className={classes.link}>
              Don't have an account? Sign Up
            </Link>
          </Form>
        </div>
      )}
    </Formik>
  );
};
