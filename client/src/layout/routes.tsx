import { Posts } from "../pages/Posts";
import { NewPost } from "../pages/NewPost";
import { Post } from "../pages/Post";

export const routes = [
  {
    path: '/posts',
    element: <Posts />,
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