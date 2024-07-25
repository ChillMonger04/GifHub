import { useState } from "react";
import { HiMiniXMark, HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const GIFSearch = () => {
  // State variable for the search bar
  const [query, setQuery] = useState("");

  // To go to a certain page
  const navigate = useNavigate();

  // With this function we check if the search text is empty or not
  const searchGIFs = async () => {
    if (query.trim() === "") {
      return;
    }

    // Whenever we click on the search it navigate to that page
    navigate(`/search/${query}`);
  };

  // Function to search for gifs using the enter keypress
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchGIFs();
    }
  };

  return (
    <div className="flex relative">
      <input
        type="text"
        value={query} // Binding the value
        onChange={(e) => setQuery(e.target.value)} // When the user manually types, we update the state
        onKeyDown={handleKeyDown} // When the user presses enter, we trigger the searchGIFs function
        placeholder="Search all the GIFs and Stickers"
        className="w-full pl-4 pr-14 py-5 text-xl text-black rounded-tl rounded-bl border border-gray-300 outline-none"
      />

      {/* This is the button to clear the text inside the search-bar */}
      {/* This will only be visible if we have entered some text */}
      {query && (
        <button
          onClick={() => setQuery("")}
          className="absolute bg-gray-300 opacity-90 rounded-full right-20 mr-2 top-6"
        >
          <HiMiniXMark size={22} />
        </button>
      )}

      {/* This is the search button and navigates us to the searched item */}
      <button
        onClick={searchGIFs}
        className="bg-gradient-to-tr from-pink-600 to-pink-400 text-white px-4 py-2 rounded-tr rounded-br"
      >
        <HiOutlineMagnifyingGlass size={35} className="-scale-x-100" />
      </button>
    </div>
  );
};

export default GIFSearch;
