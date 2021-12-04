export interface Article {
  title: string;
  content: string;
  date: Date | string;
}

export interface ArticlesProps {
  article: Article;
}

export interface NewArticleProps {
  openPopup: boolean;
  handleClosePopup: () => void;
  handleChangeArticle: (article: Article) => void;
}
