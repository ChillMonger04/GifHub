import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/app-layout";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Search from "./pages/Search";
import SingleGIF from "./pages/SingleGIF";
import Favorites from "./pages/Favorites";
import GifProvider from "./context/gif-context";

const App = () => {
  // New way of defining routes in React
  const router = createBrowserRouter([
    {
      // This will stay on every page
      element: <AppLayout />,
      errorElement: <ErrorPage />,
      // Creating the different routes for different pages
      children: [
        { path: "/", element: <Home /> },
        { path: "/:category", element: <Category /> },
        { path: "/search/:query", element: <Search /> },
        { path: "/:type/:slug", element: <SingleGIF /> },
        { path: "/favorites", element: <Favorites /> },
      ],
    },
  ]);
  return (
    <GifProvider>
      <RouterProvider router={router} />
    </GifProvider>
  );
};

export default App;
