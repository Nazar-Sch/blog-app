import axios from 'axios';

const API_LINK = '/api/user';

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
  axios.post(`${API_LINK}/signin`, payload);

export const signUpApiCall = (payload: SignUpProps) =>
  axios.post(`${API_LINK}/signup`, payload);

export const signUp = async (
  firstname: string,
  lastname: string,
  email: string,
  password: string,
) => {
  try {
    const payload = {
      firstname,
      lastname,
      email,
      password,
    };

    const {
      data: { token, userId },
    } = await axios.post(`${API_LINK}/signup`, { user: payload });

    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('userId', JSON.stringify(userId));
  } catch (err) {
    console.log(err);
  }
};

export const logout = async () => {
  localStorage.removeItem('token');
};
