import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GifState } from "../context/gif-context";
import FilterGif from "../components/FilterGif";
import Gif from "../components/Gif";
import Shimmer from "../components/Shimmer";

const Search = () => {
  // Extracting the url id we passed in dynamic routing
  const { query } = useParams();

  // used this variable to store the fetched data
  const [searchResults, setSearchResults] = useState([]);

  const { giphy, filter } = GifState();

  // We will use useEffect to fetch the data
  // and will re-fetch only if there is an update in filter
  useEffect(() => {
    fetchSearchResult();
  }, [filter]);

  const fetchSearchResult = async () => {
    // Again .search is a property of giphy api
    const { data } = await giphy.search(query, {
      sort: "relevant",
      lang: "en",
      type: filter,
    });

    // Updating the state variable
    setSearchResults(data);
  };

  return (
    <div className="my-4">
      <h2 className="text-5xl pb-3 font-extrabold">{query}</h2>
      {/* Making align left true so to remove the trending icon */}
      <FilterGif alignLeft={true} />

      {/* Mapping the search result we got */}
      {searchResults.length > 0 ? (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-2">
          {searchResults.map((gif) => (
            //Passing the data to the single GIF component
            <Gif gif={gif} key={gif.id} />
          ))}
        </div>
      ) : (
        <Shimmer />
      )}
    </div>
  );
};

export default Search;
