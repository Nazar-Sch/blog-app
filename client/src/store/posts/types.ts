export interface Post {
  title: string;
  content: string;
  date: Date | string;
  likes: any[],
  author: {
    id: string,
    firstName: string,
    lastName: string,
  }
  _id: string;
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
  likes: any[],
  author: {
    id: string,
    firstName: string,
    lastName: string,
  }
}

