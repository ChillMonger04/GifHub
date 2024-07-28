import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GifState } from "../context/gif-context";
import Gif from "../components/Gif";
import { HiOutlineExternalLink } from "react-icons/hi";
import {
  HiMiniChevronDown,
  HiMiniChevronUp,
  HiMiniHeart,
} from "react-icons/hi2";
import { FaPaperPlane } from "react-icons/fa6";
import { IoCodeSharp } from "react-icons/io5";
import FollowOn from "../components/FollowOn";
import ShimmerGIFPage from "../components/ShimmerGIFPage";

// Pre-declaring the content of the element to be displayed in the
const contentType = ["gif", "sticker", "text"];

const SingleGIF = () => {
  // Importing the data key
  const { giphy, favorites, addToFavorites } = GifState();

  // Extracting the url IDs we passed during dynamic routing
  const { type, slug } = useParams();

  // State variable to store the GIF
  const [gif, setGif] = useState({});

  // State Variable for the read more section
  const [readMore, setReadMore] = useState(false);

  // State variable for our related GIF section
  const [relatedGifs, setRelatedGifs] = useState([]);

  // State variable for the shareGIF function
  const [share, setShare] = useState(false);

  // State variable for the embedded function
  const [embedCopied, setEmbedCopied] = useState(false);

  // State variable for the shimmer function
  const [loading, setLoading] = useState(true);

  // Wrote the code of api fetch in useEffect only this time
  useEffect(() => {
    if (!contentType.includes(type)) {
      throw new Error("Invalid content type");
    }

    const fetchGif = async () => {
      // Start loading for displaying the Shimmer function
      setLoading(true);

      // Splitting the slug as we only want the last bit of it
      const gifID = slug.split("-").pop();

      // Fetching the main GIF
      const { data } = await giphy.gif(gifID);

      // Fetching related GIFs
      const relData = await giphy.related(gifID, {
        limit: 25,
      });

      setGif(data);
      setRelatedGifs(relData.data); // Ensure we're setting the correct data property

      // End loading to remove the shimmer function
      setLoading(false);
    };

    fetchGif();
  }, [type, slug, giphy]);

  console.log(relatedGifs);

  const shareGif = () => {
    // Using navigator to copy the current URL into the clipboard
    navigator.clipboard.writeText(window.location.href);
    console.log("Link copied");

    // Changing the text using timeout functionality
    setShare(true);
    setTimeout(() => setShare(false), 2000);
  };

  const EmbedGif = () => {
    // Generating the embed code
    const embedCode = `<iframe src="${gif.embed_url}" width="300" height="300" frameborder="0" allowfullscreen></iframe>`;

    // Copy the embed code to the clipboard
    navigator.clipboard.writeText(embedCode);

    setEmbedCopied(true);
    // Reset the feedback message after 2 seconds
    setTimeout(() => setEmbedCopied(false), 2000);
  };

  if (loading) {
    // Render shimmer component while loading
    return <ShimmerGIFPage />;
  }

  return (
    <div className="grid grid-cols-4 my-10 gap-4">
      <div className="hidden sm:block">
        {/* Creating the sidebar */}
        {/* Check if there is a user for this gif */}
        {gif?.user && (
          <>
            <div className="flex gap-1">
              {/* User image */}
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className="h-14"
              />

              {/* User Name and id */}
              <div className="px-2">
                <div className="font-bold">{gif?.user?.display_name}</div>
                <div className="faded-text">@{gif?.user?.username}</div>
              </div>
            </div>

            {/* Check if there is a description related to the gif */}
            {gif?.user?.description && (
              // whitespace-pre-line properly renders the text, like if there is a /n or /t then it does the required adjustments
              <p className="py-4 whitespace-pre-line text-sm text-gray-400">
                {/* If readMore is true then we display the whole text, otherwise we only display the first 100 letters*/}
                {readMore
                  ? gif?.user?.description
                  : gif?.user?.description.slice(0, 100) + "..."}

                {/* Creating a button to change the state value */}
                <div
                  className="flex items-center faded-text cursor-pointer"
                  onClick={() => setReadMore(!readMore)}
                >
                  {/* Displaying the text associated with the button depending on the state value */}
                  {readMore ? (
                    <>
                      Read less <HiMiniChevronUp size={20} />
                    </>
                  ) : (
                    <>
                      Read more <HiMiniChevronDown size={20} />
                    </>
                  )}
                </div>
              </p>
            )}
          </>
        )}
        <FollowOn />

        <div className="divider" />

        {/* Displaying the source of the div */}
        {gif?.source && (
          <div>
            <span
              className="faded-text" //custom - faded-text
            >
              Source
            </span>
            <div className="flex items-center text-sm font-bold gap-1">
              <HiOutlineExternalLink size={25} />
              <a href={gif.source} target="_blank" className="truncate">
                {gif.source}
              </a>
            </div>
          </div>
        )}
      </div>

      {/*Creating and Rendering the main GIF*/}
      <div className="col-span-4 sm:col-span-3">
        <div className="flex gap-6">
          <div className="w-full sm:w-3/4">
            <div className="faded-text truncate mb-2">{gif.title}</div>
            <Gif gif={gif} hover={false} />

            {/* -- Mobile UI -- */}
            {/* To display the details related to gif below the gif, when on mobile view */}
            <div className="flex sm:hidden gap-1">
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className="h-14"
              />
              <div className="px-2">
                <div className="font-bold">{gif?.user?.display_name}</div>
                <div className="faded-text">@{gif?.user?.username}</div>
              </div>

              <button className="ml-auto" onClick={shareGif}>
                <FaPaperPlane size={25} />
              </button>
            </div>
          </div>

          {/* Creating the right side bar with options */}
          <div className="hidden sm:flex flex-col gap-5 mt-6">
            <button
              onClick={() => addToFavorites(gif.id)}
              className="flex gap-5 items-center font-bold text-lg"
            >
              <HiMiniHeart
                size={30}
                className={`${
                  favorites.includes(gif.id) ? "text-red-500" : ""
                }`} // Checking if the gif is included in favorites
              />
              Favorite
            </button>

            <button
              onClick={shareGif} // Assignment
              className="flex gap-6 items-center font-bold text-lg transition-all duration-300"
            >
              {share ? (
                <FaPaperPlane size={25} color="#4A9B6A" />
              ) : (
                <FaPaperPlane size={25} />
              )}
              {share ? "Link Copied" : "Share"}
            </button>

            <button
              onClick={EmbedGif} // Assignment
              className="flex gap-5 items-center font-bold text-lg"
            >
              <IoCodeSharp size={30} />
              {embedCopied ? "Embedded Code Copied" : "Embed"}
            </button>
          </div>
        </div>

        {/* Rendering and displaying the related gifs*/}
        <div>
          <span className="font-extrabold">Related GIFs</span>
          <div className="columns-2 md:columns-3 gap-2">
            {relatedGifs && relatedGifs.length > 0 ? (
              relatedGifs.map((gif) => <Gif gif={gif} key={gif.id} />)
            ) : (
              <p className="mt-2">No related GIFs found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleGIF;
