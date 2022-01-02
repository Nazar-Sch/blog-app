import { Home } from "../pages/Home";
import { NewPost } from "../pages/NewPost";
import { Post } from "../pages/Post";

export const routes = [
  {
    path: '/posts',
    element: <Home />,
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