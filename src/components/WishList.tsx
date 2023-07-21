/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { Button } from './ui/button';
import { useAppSelector } from '@/redux/hooks';
import { useGetUserWishListQuery } from '@/redux/Features/Books/BooksApi';
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  ReactPortal,
} from 'react';

export default function Cart() {
  const { user } = useAppSelector((state) => state.reducer.user);
  const { data } = useGetUserWishListQuery(user?.email);

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost">wishList</Button>
      </SheetTrigger>
      <SheetContent className="overflow-auto relative">
        <SheetHeader>
          <SheetTitle>Wish List: {data?.data?.length}</SheetTitle>
        </SheetHeader>
        <div className="space-y-2">
          {data?.data?.map(
            (product: {
              _id: Key | null | undefined;
              title:
                | string
                | number
                | boolean
                | ReactElement<any, string | JSXElementConstructor<any>>
                | ReactFragment
                | ReactPortal
                | null
                | undefined;
            }) => (
              <div
                className="border p-1 flex justify-between rounded-md"
                key={product._id}
              >
                <div className="px-2 w-full flex flex-col gap-3">
                  <h1 className="text-md text-left">{product?.title}</h1>
                </div>
                <div className="border-l pl-5 flex flex-col justify-between">
                  <p className="hover:underline hover:cursor-pointer">unWish</p>
                  {/* <Button
                  variant="destructive"
                  className="bg-red-500 hover:bg-red-400"
                  onClick={() => dispatch(removeToFromCart(product))}
                >
                  <HiOutlineTrash size="20" />
                </Button> */}
                </div>
              </div>
            )
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
