/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import BookCard from '@/components/BookCard';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';

import {
  useGetBooksQuery,
  useGetUserWishListQuery,
  useUserWishListMutation,
} from '@/redux/Features/Books/BooksApi';
import { useAppSelector } from '@/redux/hooks';
import { IBook } from '@/types/globalTypes';
import { Toaster, toast } from 'react-hot-toast';

export default function Books() {
  const { data } = useGetBooksQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 30000,
  });

  const [userWishList] = useUserWishListMutation();

  const { user } = useAppSelector((state) => state.reducer.user);
  const { data: wishData } = useGetUserWishListQuery(user?.email);

  const handleSlider = (value: number[]) => {
    console.log('set price');
  };

  const handleWish = (id: string) => {
    if (!user.email) {
      toast.error('First login then review');
      return;
    }
    const options = {
      email: user.email,
      data: { wishList: { _id: id } },
    };
    userWishList(options).then((result) => {
      if ('data' in result) {
        if (result.data.statusCode === 200) {
          toast.success('Book has been successfully added to wishlist');
        }
      } else {
        toast.error('Somthing went wrong');
      }
    });
  };

  return (
    <>
      <Toaster />
      <div className="grid grid-cols-12 max-w-7xl mx-auto relative ">
        <div className="col-span-3 z mr-10 space-y-5 border rounded-2xl border-gray-200/80 p-5 self-start sticky top-16 h-[calc(100vh-80px)]">
          <div>
            <h1 className="text-2xl uppercase">Availability</h1>
            <div className="flex items-center space-x-2 mt-3">
              <Switch id="in-stock" />
              <Label htmlFor="in-stock">In stock</Label>
            </div>
          </div>
          <div className="space-y-3 ">
            <h1 className="text-2xl uppercase">Price Range</h1>
            <div className="max-w-xl">
              <Slider
                defaultValue={[150]}
                max={150}
                min={0}
                step={1}
                onValueChange={(value) => handleSlider(value)}
              />
            </div>
            <div>From 0$ To 150$</div>
          </div>
        </div>
        <div className="col-span-9 grid grid-cols-3 gap-10 pb-20">
          {data?.data?.map((book: IBook) => (
            <BookCard
              book={book}
              handleWish={handleWish}
              wishData={wishData ? wishData.data : null}
            />
          ))}
        </div>
      </div>
    </>
  );
}
