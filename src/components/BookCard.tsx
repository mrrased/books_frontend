import { IBook } from '@/types/globalTypes';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

interface IProps {
  book: IBook;
}

export default function BookCard({ book }: IProps) {
  return (
    <div>
      <div className="rounded-2xl h-[480px] flex flex-col items-start justify-between p-5 overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:scale-[102%] transition-all gap-2">
        <Link to={`/book-details/${book._id}`} className="w-full">
          <div className="flex justify-center">
            <img className="h-64 " src={book?.image} alt="product" />
          </div>
          <h1 className="text-xl font-semibold">{book?.title}</h1>
        </Link>
        <p>Author: {book?.author}</p>
        <p className="text-sm">Genre: {book?.genre}</p>
        <p className="text-sm">Publication Date: {book?.year}</p>
        <Link to={`/book-details/${book._id}`}>
          <Button variant="default">Book Details</Button>
        </Link>
      </div>
    </div>
  );
}
