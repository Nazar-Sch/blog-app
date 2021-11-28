export interface Article {
  title: string;
  content: string;
  date: Date | string;
}

export interface ArticlesProps {
  articles: Article[];
}

export interface NewArticleProps {
  openPopup: boolean;
  handleClosePopup: () => void;
  handleChangeArticle: (article: Article) => void;
}

export interface HeaderProps {
  handleShowPopup: () => void;
}
