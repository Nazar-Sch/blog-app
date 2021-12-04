import { Home } from "../pages/Home";
import { NewPost } from "../pages/NewPost";

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
  }
]