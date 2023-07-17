import ProductReview from '@/components/ProductReview';
import { Button } from '@/components/ui/button';
import { useSingleProductQuery } from '@/redux/Features/Products/ProductApi';
import { useParams } from 'react-router-dom';

export default function ProductDetails() {
  const { id } = useParams();

  const { data, isLoading, error } = useSingleProductQuery(id);
  console.log(isLoading);
  console.log(error);
  return (
    <>
      <div className="flex max-w-7xl mx-auto items-center border-b border-gray-300">
        <div className="w-[25%]">
          <img src={data?.data?.image} alt="" />
        </div>
        <div className="w-[50%] space-y-3">
          <h1 className="text-3xl font-semibold">{data?.data?.title}</h1>
          <p className="text-xl"> {data?.data?.author}</p>
          <p className="text-xl"> {data?.data?.genre}</p>
          <ul className="space-y-1 text-lg">
            {data?.data?.reviews?.map((feature: string) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <div className="space-x-4">
            <Button>Edit</Button>
            <Button className="bg-red-600 hover:bg-red-800">Delete</Button>
          </div>
        </div>
      </div>
      <ProductReview id={id} />
    </>
  );
}
