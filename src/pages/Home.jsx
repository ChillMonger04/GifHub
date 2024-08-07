import { useEffect, useState } from "react";
import { GifState } from "../context/gif-context";
import Gif from "../components/Gif";
import FilterGif from "../components/FilterGif";
import Shimmer from "../components/Shimmer"; // Import the Shimmer component

const Home = () => {
  const { giphy, filter, gifs, setGifs } = GifState();
  // State to handle loading and display shimmer
  const [loading, setLoading] = useState(true);

  // This will be called whenever there is a change in the filter in our Context state
  useEffect(() => {
    fetchTrendingGIFs();
  }, [filter]);

  // These are the GIFs that'll be displayed on home page
  // So the filter we toggle in the FilterGif component changes the filter in context
  // After in context filter changes the useEffect is called again, and new data is fetched for the filter
  const fetchTrendingGIFs = async () => {
    // Set loading to true before fetching
    setLoading(true);
    
    const { data } = await giphy.trending({
      // These all the properties in the api, read sandbox
      limit: 30,
      type: filter,
      rating: "g",
    });

    setGifs(data);
    // Set loading to false after fetching
    setLoading(false);
  };

  return (
    <div className="">
      <div className="w-full mt-5 mb-2 h-[8vw] bg-zinc-800 rounded overflow-hidden">
        <img
          src="/banner.gif"
          alt="banner"
          className="w-full h-full object-cover"
        />
      </div>

      <FilterGif showTrending />

      {/* Styling the divs in a Masonry layout */}
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
        {loading ? (
          <Shimmer /> // Show shimmer while loading
        ) : (
          gifs.map((gif) => <Gif gif={gif} key={gif.id} />)
        )}
      </div>
    </div>
  );
};

export default Home;
