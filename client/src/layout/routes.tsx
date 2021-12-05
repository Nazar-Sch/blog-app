import { Home } from "../pages/Home";
import { NewPost } from "../pages/NewPost";
import { Post } from "../pages/Post";

export const routes = [
  {
    path: '/',
    component: <Home />,
    exact: true,
  },
  {
    path: '/new-story',
    component: <NewPost />,
    exact: true,
  },
  {
    path: 'post/:id',
    component: <Post />,
    exact: true,
  }
]