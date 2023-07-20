import BookReview from '@/components/BookReview';
import { Button } from '@/components/ui/button';
import {
  useSingleBookQuery,
  useGetReviewsQuery,
  useDeleteBookMutation,
} from '@/redux/Features/Books/BooksApi';
import { Toaster, toast } from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function BookDetails() {
  const { id } = useParams();

  const { data, isLoading, error } = useSingleBookQuery(id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 30000,
  });
  const { data: review } = useGetReviewsQuery(id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 30000,
  });
  console.log(isLoading);
  console.log(error);

  const [deleteBook, { isSuccess, isError }] = useDeleteBookMutation();

  console.log(isSuccess, isError);

  const navigate = useNavigate();

  const handleDeleteBook = async () => {
    try {
      const response = await deleteBook(id);
      if ('data' in response) {
        toast.success(response.data.message);
        setTimeout(() => {
          return navigate('/books');
        }, 300);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <>
      <Toaster />
      <div className="flex max-w-7xl mx-auto items-center border-b border-gray-300">
        <div className="w-[25%]">
          <img src={data?.data?.image} alt="" />
        </div>
        <div className="w-[50%] space-y-3">
          <h1 className="text-3xl font-semibold">{data?.data?.title}</h1>
          <p className="text-xl">Author: {data?.data?.author}</p>
          <p className="text-xl">Genre: {data?.data?.genre}</p>
          <p className="text-xl">Publication Date: {data?.data?.year}</p>
          <p className="text-xl">
            Reviews:{' '}
            <span className="hover:underline text-yellow-700">
              ({review?.data?.reviews.length} reviews)
            </span>
          </p>
          <div className="space-x-4">
            <Link to={`/edit-book/${id}`}>
              <Button>Edit</Button>
            </Link>
            <Button
              onClick={handleDeleteBook}
              className="bg-red-600 hover:bg-red-800"
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
      <BookReview id={id} />
    </>
  );
}
