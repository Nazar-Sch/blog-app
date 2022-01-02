import { API } from '.';

export type SignInProps = {
  email: string;
  password: string;
};

export type SignUpProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export const signInApiCall = (payload: SignInProps) =>
  API.post('/user/signin', payload);

export const signUpApiCall = (payload: SignUpProps) =>
  API.post('/user/signup', payload);

export const getUserByIdCall = () =>
  API.get('/user/current');
