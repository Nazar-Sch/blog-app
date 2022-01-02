import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getUser } from "../store/auth/services";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const { user, isLoading, error, isLoggedIn } = useAppSelector(state => state.authReducer);

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (!user && !isLoggedIn) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to='/signin' state={{ from: location }} />;
  }

  return children;
};
