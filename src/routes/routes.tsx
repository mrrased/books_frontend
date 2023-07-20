import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import Home from '@/pages/Home';
import Signup from '@/pages/Signup';
import BookDetails from '@/pages/BookDetails';
import PrivateRoutes from './PrivateRoutes';
import Books from '@/pages/Books';
import AddNewBook from '@/pages/AddNewBook';
import EditBook from '@/components/EditBook';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/books',
        element: <Books />,
      },
      {
        path: '/book-details/:id',
        element: <BookDetails />,
      },
      {
        path: '/add-new-book',
        element: (
          <PrivateRoutes>
            <AddNewBook />
          </PrivateRoutes>
        ),
      },
      {
        path: '/edit-book/:id',
        element: (
          <PrivateRoutes>
            <EditBook />
          </PrivateRoutes>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default routes;
