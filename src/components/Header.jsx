import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiEllipsisVertical, HiMiniBars3BottomRight } from "react-icons/hi2";
import { GifState } from "../context/gif-context";
import GIFSearch from "./GIFSearch";

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);

  const { giphy, favorites } = GifState();

  // Empty dependency array so that the categories are fetched only once
  useEffect(() => {
    fetchGifCategories();
  }, []);

  const fetchGifCategories = async () => {
    // This .categories is a property of the GIPHY API
    const { data } = await giphy.categories();
    setCategories(data);
  };

  return (
    <nav>
      <div className="relative flex gap-4 justify-between items-center mb-3">
        <Link to="/" className="flex gap-2">
          <img src="/logo.svg" className="w-8" alt="Project-Logo" />
          <h1 className="text-5xl font-bold tracking-tight cursor-pointer">
            GifHub
          </h1>
        </Link>

        <div className="font-bold text-md flex gap-2 items-center">
          {/* We did slice 5 because we want 5 categories only and rest in the category menu */}
          {categories?.slice(0, 5).map((category) => {
            return (
              <Link
                className="px-4 py-1 transition ease-in-out hover:gradient border-b-4 hidden lg:block"
                key={category.name}
                to={`/${category.name_encoded}`} //.name_encoded is name we can read it on the sandbox link
              >
                {category.name}
              </Link>
            );
          })}

          <button onClick={() => setShowCategories(!showCategories)}>
            <HiEllipsisVertical
              size={35}
              className={`py-0.5 transition ease-in-out hover:gradient ${
                showCategories ? "gradient" : ""
              } border-b-4 cursor-pointer hidden lg:block`}
            />
          </button>

          {/* We only show the favorites button when the favorites length is more than 0*/}
          {favorites.length > 0 && (
            <div className="h-9 bg-gray-700 pt-1.5 px-6 cursor-pointer rounded transition-all duration-500">
              <Link to="/favorites">Favorite GIFs</Link>
            </div>
          )}

          {/* Displaying the drop down menu only on state change*/}
          <button onClick={() => setShowCategories(!showCategories)}>
            <HiMiniBars3BottomRight
              className="text-sky-400 block lg:hidden"
              size={30}
            />
          </button>
        </div>

        {showCategories && (
          <div className="absolute right-0 top-14 px-10 pt-6 pb-9 w-full gradient z-20 transition-all duration-300">
            <span className="text-3xl font-bold">Categories</span>
            <hr className="bg-gray-100 opacity-50 my-5" />
            {/* Displaying all the categories in a grid layout*/}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {categories?.map((category) => {
                return (
                  <Link
                    onClick={() => setShowCategories(false)}
                    className="transition ease-in-out font-md"
                    key={category.name}
                    to={`/${category.name_encoded}`}
                  >
                    {category.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Search-bar*/}
      <GIFSearch />
    </nav>
  );
};

export default Header;
