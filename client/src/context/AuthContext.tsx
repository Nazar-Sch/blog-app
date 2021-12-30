import { createContext } from 'react';
import { SignInProps, SignUpProps } from '../api/user';
import { User } from '../types/initialTypes';

export interface AuthContextType {
  user: User | null;
  signin: (payload: SignInProps, callback: VoidFunction) => void;
  signup: (payload: SignUpProps, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}

export const AuthContext = createContext<AuthContextType>(null!);
