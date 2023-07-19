export interface IBook {
  _id: number;
  title: string;
  image: string;
  author: string;
  genre: string;
  year: string;
  reviews?: string[];
  quantity?: number;
}
