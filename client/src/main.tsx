import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx';
import Signup from './pages/signup.jsx';
import Login from './pages/login.jsx';
import MyProfile from './pages/myProfile.jsx';
import ErrorPage from './components/error.jsx';
import ExplorePage from './pages/explore.jsx';
import Home from './pages/home.jsx';
import RecipeBox from './pages/recipeBox.jsx';
import Profile from './pages/profile.jsx';
import AboutUs from './pages/AboutTreecipe.js';
import RecipeDetails from './pages/recipeDetails.js';



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      }, {
        path: '/myprofile',
        element: <MyProfile />
      }, {
        path: '/profile/:name',
        element: <Profile />
      }, {
        path: '/explore',
        element: <ExplorePage />
      }, {
        path: '/recipeBox',
        element: <RecipeBox />
      }, {
        path: '/recipeDetails/:recipeId',
        element: <RecipeDetails />
      }, {
        path: '/about',
        element: <AboutUs />
      }
    ]
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}

