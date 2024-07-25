/* eslint-disable react/prop-types */

import { HiMiniArrowTrendingUp } from "react-icons/hi2";
import { GifState } from "../context/gif-context";

// Created custom data to configure the categories button
const filters = [
  {
    title: "GIFs",
    value: "gifs",
    background:
      "bg-gradient-to-tr from-purple-500 via-purple-600 to-purple-500",
  },
  {
    title: "Stickers",
    value: "stickers",
    background: "bg-gradient-to-tr from-teal-500 via-teal-600 to-teal-500",
  },
  {
    title: "Text",
    value: "text",
    background: "bg-gradient-to-tr from-blue-500 via-blue-600 to-blue-500",
  },
];

const FilterGif = ({ alignLeft = false, showTrending = false }) => {
  const { filter, setFilter } = GifState();
  return (
    <div
      className={`flex gap-3 mb-6 mt-5 ${alignLeft ? "" : "justify-end"} ${
        // This is for mobile ui, to make the 3 tabs go below the trending icon on mobile view
        showTrending
          ? "flex-col sm:flex-row sm:items-center justify-between "
          : ""
      }`}
    >

      {/* This is for showing the trending icon on top left */}
      {showTrending && (
        <span className="flex gap-2">
          {showTrending && (
            <HiMiniArrowTrendingUp size={25} className="text-teal-400" />
          )}
          <span className="font-semibold text-gray-400">Trending</span>
        </span>
      )}

      {/* All the filters*/}
      {/* on click the filter in Context gets changed that triggers the useEffect for trendingGIFs on the home page*/}
      <div className="flex min-w-80 rounded-full bg-gray-800">
        {filters.map((f) => {
          return (
            <span
              onClick={() => setFilter(f.value)}
              className={`${
                filter === f.value ? f.background : ""
              } font-semibold py-2 w-1/3 text-center rounded-full cursor-pointer `}
              key={f.title}
            >
              {f.title}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default FilterGif;
