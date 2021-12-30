import React, { useState, ReactNode } from 'react';

import { User } from '../types/initialTypes';
import { AuthContext } from './AuthContext';
import { auth } from './authState';
import { signInApiCall, SignInProps, signUpApiCall, SignUpProps } from '../api/user';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const signin = (payload: SignInProps, callback: VoidFunction) => auth.signin(async () => {
    try {  
      const {
        data: { token, userName, userId },
      } = await signInApiCall(payload);
      localStorage.setItem('token', JSON.stringify(token));
      localStorage.setItem('userId', JSON.stringify(userId));
      localStorage.setItem('userName', JSON.stringify(userName));

      setUser(user);
      callback();
    } catch (err) {
      console.log(err);
    }
  });

  const signup = (payload: SignUpProps, callback: VoidFunction) => {
    return auth.signup(async () => {
      try {
        const { data: { userId, userName, token }} = await signUpApiCall(payload);
        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('userId', JSON.stringify(userId));
        localStorage.setItem('userName', JSON.stringify(userName));

        setUser(user);
        callback();
      } catch (err) {
        console.log(err);
      }
    });
  };

  const signout = (callback: VoidFunction) => {
    return auth.signout(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('userName');
  
      setUser(null);
      callback();
    });
  };

  const value = { user, signin, signup, signout };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};
