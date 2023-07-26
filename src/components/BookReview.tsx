/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, FormEvent, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { FiSend } from 'react-icons/fi';
import {
  useGetReviewsQuery,
  usePostReviewMutation,
} from '@/redux/Features/Books/BooksApi';
import { useAppSelector } from '@/redux/hooks';
import { Toaster, toast } from 'react-hot-toast';

interface IProps {
  id: string | undefined;
}

export default function BookReview({ id }: IProps) {
  const [inputValue, setInputValue] = useState<string>('');

  const { data } = useGetReviewsQuery(id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 30000,
  });

  const [postComment] = usePostReviewMutation();

  const { user } = useAppSelector((state) => state.reducer.user);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user.email) {
      toast.error('First login then review');
      return;
    }
    const options = {
      id: id,
      data: { reviews: inputValue },
    };

    postComment(options).then((result) => {
      if ('data' in result) {
        toast.success(result.data.message);
      } else if ('error' in result) {
        if ('error' in result.error) {
          const errorData = result.error as any;
          toast.error(errorData.message);
        }
      }
    });

    setInputValue('');
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <>
      <Toaster />
      <div className="max-w-7xl mx-auto mt-5">
        <form className="flex gap-5 items-center" onSubmit={handleSubmit}>
          <Textarea
            className="min-h-[30px]"
            onChange={handleChange}
            required
            value={inputValue}
          />
          <Button
            type="submit"
            className="rounded-full h-10 w-10 p-2 text-[25px]"
          >
            <FiSend />
          </Button>
        </form>
        <div className="mt-10">
          {data?.data?.reviews?.map((review: string, index: number) => (
            <div key={index} className="flex gap-3 items-center mb-5">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p>{review}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
