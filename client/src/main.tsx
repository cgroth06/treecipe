import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


import App from './App.jsx';
//import Home from './pages/Home';
import Signup from './components/signup.jsx';
import Login from './components/login.jsx';
//import SingleThought from './pages/SingleThought';
import Profile from './pages/profile.jsx';
import ErrorPage from './components/error.jsx';
import ExplorePage from './pages/explore.tsx';
//import AboutArtVine from './pages/AboutArtVine.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        //element: <Home />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      }, {
        path: '/profile',
        element: <Profile />
      }, {
        path: '/me',
        //element: <Profile />
      }, {
        path: '/explore',
        element: <ExplorePage />
      }
    ]
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}

