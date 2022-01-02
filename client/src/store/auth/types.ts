export type UserData = { firstName: string, lastName: string };

export interface AuthState {
  user: UserData | null,
  isLoading: boolean,
  isLoggedIn: boolean,
  error?: string,
}
