/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { DropdownMenuSeparator } from '../components/ui/dropdown-menu';
import { DropdownMenuLabel } from '../components/ui/dropdown-menu';
import {
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '../components/ui/dropdown-menu';
import { HiOutlineSearch } from 'react-icons/hi';
import Cart from '../components/WishList';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { setUser } from '@/redux/Features/user/userSlice';
import { useState } from 'react';
import { setSearchTerm } from '@/redux/Features/Books/BooksSlice';

const imgLogo =
  'https://www.clipartmax.com/png/middle/89-891042_letter-b-logo-design-free-b-letter-logo-design-png.png';

export default function Navbar() {
  const { user } = useAppSelector(
    (state: { reducer: { user: any } }) => state.reducer.user
  );
  const [isTrue, setIsTrue] = useState<boolean>(false);
  const [isSearch, setIsSearch] = useState<string>('');

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    signOut(auth).then(() => {
      dispatch(setUser(null));
    });
  };

  const handleSearchButtonClick = () => {
    dispatch(setSearchTerm(isSearch));
  };

  return (
    <nav className="w-full h-16 fixed top backdrop-blur-lg z-10">
      <div className="h-full w-full bg-white/60">
        <div className="flex items-center justify-between w-full md:max-w-7xl h-full mx-auto ">
          <div>
            <img src={imgLogo} alt="" className="w-16 h-14" />
          </div>
          <div>
            <ul className="flex items-center">
              {isTrue ? (
                <div className="flex space-x-2">
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="search"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setIsSearch(e.target.value)
                    }
                    className="w-96 p-1 border border-slate-600"
                  />
                  <p
                    onClick={() => setIsTrue(false)}
                    className="hover:cursor-pointer hover:underline"
                  >
                    X
                  </p>
                </div>
              ) : (
                <>
                  <li>
                    <Button variant="link" asChild>
                      <Link to="/">Home</Link>
                    </Button>
                  </li>
                  <li>
                    <Button variant="link" asChild>
                      <Link to="/books">Books</Link>
                    </Button>
                  </li>
                  <li>
                    <Button variant="link" asChild>
                      <Link to="/add-new-book">Add New Book</Link>
                    </Button>
                  </li>
                </>
              )}
              <li>
                {isTrue ? (
                  <Button variant="ghost" onClick={handleSearchButtonClick}>
                    <HiOutlineSearch size="25" />
                  </Button>
                ) : (
                  <Button variant="ghost" onClick={() => setIsTrue(true)}>
                    <HiOutlineSearch size="25" />
                  </Button>
                )}
              </li>
              <li>
                <Cart />
              </li>
              <li className="ml-5">
                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                      Profile
                    </DropdownMenuItem>
                    {!user.email && (
                      <>
                        <Link to="/login">
                          <DropdownMenuItem className="cursor-pointer">
                            Login
                          </DropdownMenuItem>
                        </Link>
                        <Link to="/signup">
                          <DropdownMenuItem className="cursor-pointer">
                            signUp
                          </DropdownMenuItem>
                        </Link>
                      </>
                    )}
                    {user.email && (
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="cursor-pointer"
                      >
                        Logout
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
