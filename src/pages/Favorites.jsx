import { GifState } from "../context/gif-context";
import { useState, useEffect } from "react";
import Gif from "../components/Gif";

const Favorites = () => {
  // Importing the data key
  // The favorites here will contain the gifID of the favorite GIFs
  const { giphy, favorites } = GifState();

  const [favoriteGIFs, setFavoriteGIFs] = useState([]);

  const fetchFavoriteGIFs = async () => {
    const { data: gifs } = await giphy.gifs(favorites);
    setFavoriteGIFs(gifs);
  };

  useEffect(() => {
    fetchFavoriteGIFs();
  }, []);

  return (
    <div className="mt-2">
      <span className="faded-text ">My Favorites</span>
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2 mt-2">
        {favoriteGIFs.map((gif) => (
          <Gif gif={gif} key={gif.id} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
