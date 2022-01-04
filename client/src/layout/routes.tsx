import { Posts } from "../pages/Posts";
import { NewPost } from "../pages/NewPost";
import { Post } from "../pages/Post";
import { Navigate } from "react-router-dom";

export const routes = [
  {
    path: '/posts',
    element: <Posts />,
  },
  {
    path: '/posts/search?query=',
    element: <Posts />,
  },
  {
    path: '/posts/search',
    element: <Posts />,
  },
  {
    path: '/',
    element: <Navigate to='/posts' />,
  },
  {
    path: '/new-story',
    element: <NewPost />,
  },
  {
    path: 'post/:id',
    element: <Post />,
  },
]