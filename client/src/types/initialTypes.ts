import { Post } from "../store/posts/types";

export interface Article {
  title: string;
  content: string;
  date: Date | string;
  likes?: any[],
  author: { firstname: string, lastName: string }
  _id: string;
}

export interface ArticlesProps {
  article: Post;
}

export interface NewArticleProps {
  openPopup: boolean;
  handleClosePopup: () => void;
  handleChangeArticle: (article: Article) => void;
}

export type CreatedPost = {
  title: string;
  content: string;
  author: any,
  likes: any,
}


export interface User {
  name?: string;
  email: string;
  password: string; 
  token?: string; 
}
