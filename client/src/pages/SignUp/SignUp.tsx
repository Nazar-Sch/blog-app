import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import { Formik, FormikProps, Form } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';

import { Input } from '../../components/Input';
import { useAuth } from '../../context/useAuth';
import { validationSignUp } from '../../utils/validations';
import { SignUpProps } from '../../api/user';

export const SignUp = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  const navigate = useNavigate();
  const location = useLocation();

  const { signup } = useAuth();
  const from = location.state?.from?.pathname || '/';

  const handleShowPassword = () => setShowPassword(!showPassword);

  const onSubmit = async (values: SignUpProps) => {
    console.log(values);
    signup(values, () => navigate(from, { replace: true }));
  };

  const goToSignIn = () => navigate('/signin');

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
      }: FormikProps<SignUpProps>) => (
        <div>
          <Form>
            <Typography>Sign up</Typography>
            <Input
              name='firstName'
              placeholder='First name'
              variant='standard'
              type='text'
              onChange={handleChange}
              value={values.firstName}
              error={errors.firstName && touched.firstName ? true : false}
              onBlur={handleBlur}
            />
            <Input
              name='lastName'
              placeholder='Last name'
              variant='standard'
              type='text'
              onChange={handleChange}
              value={values.lastName}
              error={errors.lastName && touched.lastName ? true : false}
              onBlur={handleBlur}
            />
            <Input
              name='email'
              placeholder='Email'
              variant='standard'
              type='email'
              onChange={handleChange}
              value={values.email}
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
              error={errors.password && touched.password ? true : false}
              onBlur={handleBlur}
            />
            <Button onClick={handleSubmit} type='submit'>
              Submit
            </Button>
            <Button onClick={goToSignIn}>
              Already have an account? Sign in
            </Button>
          </Form>
        </div>
      )}
    </Formik>
  );
};
