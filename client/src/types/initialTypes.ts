export interface Article {
  title: string;
  content: string;
  date: Date | string;
  _id: string;
}

export interface ArticlesProps {
  article: Article;
}

export interface NewArticleProps {
  openPopup: boolean;
  handleClosePopup: () => void;
  handleChangeArticle: (article: Article) => void;
}

export type CreatedPost = {
  title: string;
  content: string;
}
