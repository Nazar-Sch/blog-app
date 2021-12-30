import { Navigate, useLocation } from "react-router-dom";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  if (!token && !userId) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to='/signin' state={{ from: location }} />;
  }

  return children;
};
