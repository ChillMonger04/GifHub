// This is a context to avoid the props drill of data
import { createContext, useContext } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { useState, useEffect } from "react";

const GifContext = createContext();

const GifProvider = ({ children }) => {
  const [gifs, setGifs] = useState([]);
  const [filter, setFilter] = useState("gifs");
  const [favorites, setFavorites] = useState([]);

  // For fetching the data,  we'll give it the api key
  // Read how to fetch from (https://codesandbox.io/s/20kmp3zp9r?fontsize=14)
  // GiphyFetch is the method to fetch the data from giphy api
  const giphy = new GiphyFetch(import.meta.env.VITE_GIPHY_API_KEY);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favoriteGIFs")) || [];
    setFavorites(favorites);
  }, []);

  const addToFavorites = (id) => {
    console.log(id);
    if (favorites.includes(id)) {
      // If the item is already in favorites, remove it
      const updatedFavorites = favorites.filter((itemId) => itemId !== id);
      localStorage.setItem("favoriteGIFs", JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
    } else {
      // If the item is not in favorites, add it
      const updatedFavorites = [...favorites];
      updatedFavorites.push(id);
      localStorage.setItem("favoriteGIFs", JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
    }
  };

  // We can use this value all over our app
  return (
    <GifContext.Provider
      value={{
        giphy,
        gifs,
        setGifs,
        filter,
        setFilter,
        addToFavorites,
        favorites,
      }}
    >
      {children}
    </GifContext.Provider>
  );
};

export const GifState = () => {
  return useContext(GifContext);
};

export default GifProvider;
