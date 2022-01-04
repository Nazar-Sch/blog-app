export interface Post {
  title: string;
  content: string;
  date: Date | string;
  likes: Likes[];
  author: Author;
  _id: string;
  tags?: string[],
}

export type Likes = {
  user: string;
  _id: string;
}

export type Author = {
  id: string,
  firstName: string,
  lastName: string,
}

export interface PostsState {
  posts: Post[] | [],
  selectedPost: Post | null,
  isLoading: boolean,
  error?: string,
}

export type CreatedPost = {
  title: string;
  content: string;
  author: {
    id: string,
    firstName: string,
    lastName: string,
  }
  id: string;
}

export type EditPost = {
  title: string;
  content: string;
}
