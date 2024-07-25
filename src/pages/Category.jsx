import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { GifState } from "../context/gif-context";
import Gif from "../components/Gif";
import FollowOn from "../components/FollowOn";

const Category = () => {
  // Importing the data key
  const { giphy } = GifState();

  // used this variable to store the fetched data
  const [results, setResults] = useState([]);

  // Extracting the url id we passed in dynamic routing
  const { category } = useParams();

  // We will use useEffect to fetch the data
  // Whenever the category changes this is called to fetch the data again
  useEffect(() => {
    fetchSearchResult();
  }, [category]);

  const fetchSearchResult = async () => {
    // Again .gifs is a property of giphy api
    const { data } = await giphy.gifs(category, category);

    // Updating the state variable
    setResults(data);
  };

  return (
    // We want it in flex-cols when in mobile ui and flex-row when in large mode
    <div className="flex flex-col sm:flex-row gap-5 my-4">
      {/* Creating the left side bar, displaying the first gif */}
      {/* We don't need the hover text here */}
      <div className="w-full sm:w-72">
        {results.length > 0 && <Gif gif={results[0]} hover={false} />}
        <span className="text-gray-400 text-sm pt-2">
          Don&apos;t tell it to me, GIF it to me!
        </span>
        <FollowOn />
        {/* For creating a hr */}
        <div className="w-full h-0.5 mt-6 bg-gray-800" />
      </div>

      <div>
        <h2 className="text-4xl pb-1 font-extrabold capitalize">
          {/* If we have a multi-word category name */}
          {category.split("-").join(" & ")} GIFs
        </h2>

        <h2 className="text-lg text-gray-400 pb-3 font-bold hover:text-gray-50 cursor-pointer">
          @{category}
        </h2>

        {/* Rendering the GIFs related to the category */}
        {results.length > 0 && (
          <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
            {/* Mapping while skipping the fist element */}
            {results.slice(1).map((gif) => (
              <Gif gif={gif} key={gif.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
