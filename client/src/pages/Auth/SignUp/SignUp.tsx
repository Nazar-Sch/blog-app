import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import { Formik, FormikProps, Form } from 'formik';
import { Link, useNavigate } from 'react-router-dom';

import { Input } from '../../../components/Input';
import { validationSignUp } from '../../../utils/validations';
import { SignUpProps } from '../../../api/user';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { signup } from '../../../store/auth/services';
import { useStyles } from '../styles';

export const SignUp = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const classes = useStyles();

  const { isLoggedIn } = useAppSelector(
    state => state.authReducer
  );

  if (isLoggedIn) {
    navigate('/posts');
  }

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  const handleShowPassword = () => setShowPassword(!showPassword);

  const onSubmit = (values: SignUpProps) => {
    dispatch(signup(values));
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSignUp}
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
      }: FormikProps<SignUpProps>) => (
        <div className={classes.root}>
          <Form>
            <Typography variant='h3'>Sign up</Typography>
            <Input
              name='firstName'
              label='First name'
              variant='standard'
              fullWidth
              margin='normal'
              type='text'
              onChange={handleChange}
              value={values.firstName}
              error={errors.firstName && touched.firstName ? true : false}
              onBlur={handleBlur}
            />
            <Input
              name='lastName'
              label='Last name'
              variant='standard'
              margin='normal'
              fullWidth
              type='text'
              onChange={handleChange}
              value={values.lastName}
              error={errors.lastName && touched.lastName ? true : false}
              onBlur={handleBlur}
            />
            <Input
              name='email'
              label='Your email'
              variant='standard'
              margin='normal'
              fullWidth
              type='text'
              onChange={handleChange}
              value={values.email}
              error={errors.email && touched.email ? true : false}
              onBlur={handleBlur}
            />
            <Input
              name='password'
              label='Password'
              id='standard-password-input'
              margin='normal'
              fullWidth
              variant='standard'
              type={showPassword ? 'text' : 'password'}
              onChange={handleChange}
              value={values.password}
              handleShowPassword={handleShowPassword}
              error={errors.password && touched.password ? true : false}
              onBlur={handleBlur}
            />
            <Button onClick={handleSubmit} variant='outlined' type='submit' disabled={!dirty}>
              Submit
            </Button>
            <Link to='/signin' className={classes.link}>
              Already have an account? Sign in
            </Link>
          </Form>
        </div>
      )}
    </Formik>
  );
};
