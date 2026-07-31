export interface ArticleComments {
  author: string;
  body: string;
  date: Date;
}

export interface ArticleFormData {
  title: string;
  body: string;
  synopsis: string;
  author: string;
  comments: ArticleComments[];
  createdAt: string;
  updatedAt: string;
}
