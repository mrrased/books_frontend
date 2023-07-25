/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import BookCard from '@/components/BookCard';
import { Switch } from '@/components/ui/switch';

import {
  useGetBooksQuery,
  useGetUserWishListQuery,
  useUserWishListMutation,
} from '@/redux/Features/Books/BooksApi';
import { useAppSelector } from '@/redux/hooks';
import { IBook } from '@/types/globalTypes';
import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Puff } from 'react-loader-spinner';

interface formType {
  novel: boolean;
  fiction: boolean;
  drama: boolean;
}

export default function Books() {
  const searchTerm = useAppSelector((state) => state.books.searchTerm);

  const { data, isLoading } = useGetBooksQuery(searchTerm, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 30000,
  });

  console.log(data, 'query data');

  const [userWishList] = useUserWishListMutation();

  const { user } = useAppSelector((state) => state.reducer.user);
  const { data: wishData } = useGetUserWishListQuery(user?.email);

  const [pre, setPre] = useState();
  const [pro, setPro] = useState();
  const [checkData, setCheckData] = useState<formType>({
    novel: false,
    fiction: false,
    drama: false,
  });

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

  // const { priceRange, status } = useAppSelector((state) => state.product);
  // const dispatch = useAppDispatch();

  const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
    // console.log(e.target.value, 'set price');
  };

  let booksData;
  // Handle Year Data Start
  if (
    pre !== undefined &&
    (pre as unknown as string).length === 4 &&
    pro !== undefined &&
    (pro as unknown as string).length > 3 &&
    (pro as unknown as string).length < 5
  ) {
    const booksFilter = data?.data?.filter((item: { year: string }) => {
      const itemYear = parseInt(item.year); // Convert 'year' to a number
      return itemYear > pre;
    });
    console.log(booksFilter);
    booksData = booksFilter?.filter((item: { year: string }) => {
      const itemYear = parseInt(item.year);
      return itemYear < pro;
    });
  } else {
    booksData = data?.data;
  }
  // Handle Year Data End

  // Handle Check Data Start
  const InputValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCheckData({
      ...checkData,
      [e.target.name]: e.target.checked,
    });
  };

  if (checkData?.novel) {
    booksData = data?.data?.filter(
      (item: { genre: string }) => item.genre.toLowerCase() === 'novel'
    );
  } else if (checkData?.fiction) {
    booksData = data?.data?.filter(
      (item: { genre: string }) => item.genre.toLowerCase() === 'fiction'
    );
  } else if (checkData?.drama) {
    booksData = data?.data?.filter(
      (item: { genre: string }) => item.genre.toLowerCase() === 'drama'
    );
  }

  // const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   // Update the state when the checkbox value changes
  //   setIsNovelChecked(event.target.name);
  //   console.log(isNovelChecked, 'isChecked working');
  // };

  console.log(booksData, 'outside');

  return (
    <>
      {isLoading && (
        <div className="flex justify-center items-center h-screen w-full">
          <Puff
            height="80"
            width="80"
            radius={1}
            color="#4fa94d"
            ariaLabel="puff-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      )}
      <Toaster />
      <div className="grid grid-cols-12 max-w-7xl mx-auto relative ">
        <div className="col-span-3 z mr-10 space-y-5 border rounded-2xl border-gray-200/80 p-5 self-start sticky top-16 h-[calc(100vh-80px)]">
          <div>
            <h1 className="text-2xl uppercase">Filter Book</h1>
            <div className="mt-3">
              <Switch id="in-stock" />
              <p className="hover:underline hover:cursor-pointer">Genre</p>
              <div className="space-x-2">
                <input
                  type="checkbox"
                  name="novel"
                  id="novelCheckbox"
                  checked={checkData.novel}
                  onChange={InputValue}
                />
                <label htmlFor="novelCheckbox">Novel</label>
              </div>
              <div className="space-x-2">
                <input
                  type="checkbox"
                  name="fiction"
                  id="fictionCheckbox"
                  checked={checkData.fiction}
                  onChange={InputValue}
                />
                <label htmlFor="fictionCheckbox">Fiction</label>
              </div>
              <div className="space-x-2">
                <input
                  type="checkbox"
                  name="drama"
                  id="dramaCheckbox"
                  checked={checkData.drama}
                  onChange={InputValue}
                />
                <label htmlFor="dramaCheckbox">Drama</label>
              </div>
            </div>
          </div>
          <div className="space-y-3 ">
            <p className="hover:underline hover:cursor-pointer">
              Publication year
            </p>
            <div className="max-w-xl">
              {/* <Slider
                defaultValue={[150]}
                max={150}
                min={0}
                step={1}
                onValueChange={(value) => handleSlider(value)}
              /> */}
              <div className="flex space-x-2 ">
                <input
                  type="text"
                  placeholder="year"
                  className="w-20 p-1 border border-slate-600 rounded-md "
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setPre(event.target.value)
                  }
                />
                <p>to</p>
                <input
                  type="text"
                  placeholder="year"
                  className="w-20 p-1 border border-slate-600 rounded-md "
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPro(e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-9 grid grid-cols-3 gap-10 pb-20">
          {booksData?.map((book: IBook) => (
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
