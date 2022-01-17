import { Tags } from "../tags/types";

export interface Post {
  title: string;
  content: string;
  date: Date | string;
  likes: Likes[];
  author: Author;
  _id: string;
  tags: string[];
  comments: Comments[];
}

export type PaginationsPages = {
  currentPage: number,
  amountOfPages: number,
}

export type Comments = {
  text: string;
  author: {
    firstName: string;
    lastName: string;
    id: string;
  };
  date: Date | string;
  likes: Likes[];
  _id: string;
};

export type Likes = {
  user: string;
  _id: string;
};

export type Author = {
  id: string;
  firstName: string;
  lastName: string;
};

export interface PostState {
  post: Post | null;
  isLoading: boolean;
  error?: string;
}

export interface PostsState {
  posts: Post[] | [];
  isLoading: boolean;
  error?: string;
  currentPage?: number,
  amountOfPages?: number,
}

export type CreatedPost = {
  title: string;
  content: string;
  author: {
    id: string;
    firstName: string;
    lastName: string;
  };
  id: string;
};

export type NewComment = {
  id: string;
  text: string;
  author: { firstName: string; lastName: string };
};

export type CommentIds = {
  postId: string;
  commentId: string;
}

export type EditComment = {
  postId: string;
  commentId: string;
  text: string;
}