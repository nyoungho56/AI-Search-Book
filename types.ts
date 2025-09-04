export interface Review {
  id: string;
  author: string;
  content: string;
  password: string;
}

export interface RecommendedBook {
  title: string;
  coverImageUrl: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  publicationYear: number;
  publisher: string;
  genre: string;
  summary: string;
  coverImageUrl: string;
  otherBooksByAuthor?: RecommendedBook[];
  reviews?: Review[];
}
