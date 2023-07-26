import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Footer from '@/layouts/Footer';

const imgBanner =
  'https://d3i5mgdwi2ze58.cloudfront.net/swd3lfscp8lshlhuwfjng9s92o8q';
const imgHistory =
  'https://d3i5mgdwi2ze58.cloudfront.net/0em8udf8enqxgqda1rvev3ih7ukh';

export default function Home() {
  return (
    <>
      <div className="flex justify-around items-center h-[calc(100vh-80px)] max-w-7xl mx-auto ">
        <div>
          <h1 className="text-6xl font-black text-primary mb-2">
            War and <br /> Peace
          </h1>
          <p className="text-secondary font-semibold text-xl">by Leo Tolstoy</p>
          <div className="text-primary mt-20">
            <p>Epic in scale, War and Peace delineates in graphic detail</p>
            <p>events leading up to Napoleon's invasion of Russia</p>
          </div>
          <Button className="mt-5">Learn more</Button>
        </div>
        <div className="relative -right-14">
          <img src={imgBanner} alt="" />
        </div>
      </div>
      <div className="mb-96">
        <div>
          <img className="mx-auto" src={imgHistory} alt="" />
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-5xl font-black text-primary uppercase mt-10">
            The future of history is here
          </h1>
          <Button className="mt-10" asChild>
            <Link to="/books">Brows all books</Link>
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
}
