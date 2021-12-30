import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import { Formik, Form, FormikProps } from 'formik';

import { Input } from '../../components/Input';
import { useLocation, useNavigate } from 'react-router-dom';
import { User } from '../../types/initialTypes';
import { useAuth } from '../../context/useAuth';
import { SignInProps } from '../../api/user';
import { validationSignIn } from '../../utils/validations';

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
  const { signin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const intialValues = { email: '', password: '' };

  const handleShowPassword = () => setShowPassword(!showPassword);
  const onSubmit = ({ email, password }: SignInProps) =>
    signin({ email, password }, navigateToPosts);

    const from = location.state?.from?.pathname || '/';

  const navigateToPosts = () => navigate(from, { replace: true });
  const goToSignUp = () => navigate('/signup');

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
      }: FormikProps<SignInProps>) => (
        <div>
          <Typography>Sign In</Typography>
          <Form>
            <Input
              name='email'
              placeholder='Email'
              variant='standard'
              type='text'
              onChange={handleChange}
              value={values.email}
              helperText={
                errors.email && touched.email
                  ? errors.email
                  : ''
              }
              error={errors.email && touched.email ? true : false}
              onBlur={handleBlur}
            />
            <Input
              name='password'
              placeholder='Password'
              id='standard-password-input'
              variant='standard'
              type={showPassword ? 'text' : 'password'}
              onChange={handleChange}
              value={values.password}
              handleShowPassword={handleShowPassword}
              helperText={
                errors.password && touched.password
                  ? 'Please valid password. One uppercase, one lowercase, one special character and no spaces'
                  : ''
              }
              error={errors.password && touched.password ? true : false}
              onBlur={handleBlur}
            />
            <Button onClick={handleSubmit} type='submit'>
              Submit
            </Button>
            <Button onClick={goToSignUp}>
              Don't have an account? Sign Up
            </Button>
          </Form>
        </div>
      )}
    </Formik>
  );
};
