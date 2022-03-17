import { Tag } from '../tags/tag.model';
export interface ArticlesResponse {
  articles: Article[],
  articlesCount: number
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: Tag[];
  createdAt: Date;
  updatedAt: Date;
  favorited: boolean;
  favoritesCount: number;
  author: Author;
}


interface Author {
  username: string;
  bio: string;
  image: string;
  following: boolean
}
