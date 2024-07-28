const ShimmerGIFPage = () => {
  return (
    <div className="grid grid-cols-4 my-10 gap-4">
      {/* Sidebar placeholder: This section simulates the sidebar with placeholder elements. */}
      <div className="hidden sm:block col-span-1">
        <div className="flex flex-col gap-4">
          <div className="flex gap-1">
            {/* Profile picture placeholder */}
            <div className="w-14 h-14 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="px-2">
              {/* Name and status placeholder */}
              <div className="h-4 bg-gray-200 rounded-full w-32 mb-2 animate-pulse"></div>

              <div className="h-4 bg-gray-200 rounded-full w-24 animate-pulse"></div>
            </div>
          </div>
          <div className="py-4">
            {/* Sidebar menu placeholder */}
            <div className="h-4 bg-gray-200 rounded-full w-48 mb-2 animate-pulse"></div>

            <div className="h-4 bg-gray-200 rounded-full w-32 animate-pulse"></div>
          </div>

          <div className="py-4">
            {/* Additional sidebar placeholder */}
            <div className="h-4 bg-gray-200 rounded-full w-32 mb-2 animate-pulse"></div>

            <div className="flex items-center gap-2">
              <div className="h-4 bg-gray-200 rounded-full w-48 animate-pulse"></div>
            </div>
          </div>
          <div className="w-full border-t border-gray-300 my-4"></div>
          {/* Divider spanning the entire width */}
        </div>
      </div>

      {/* Main content placeholder: This section simulates the main content area with placeholder elements. */}
      <div className="col-span-4 sm:col-span-3">
        <div className="flex gap-6">
          <div className="w-full sm:w-3/4">
            {/* Title placeholder */}
            <div className="h-4 bg-gray-200 rounded-full w-64 mb-4 animate-pulse"></div>

            {/* GIF placeholder with increased height */}
            <div className="w-full h-80 bg-gray-200 rounded-lg animate-pulse mb-4"></div>
            {/* Lighter color and increased height */}
            <div className="sm:hidden flex items-center gap-1 mb-4">
              {/* Mobile view profile and actions placeholders */}
              <div className="w-14 h-14 bg-gray-200 rounded-full animate-pulse"></div>

              <div className="px-2">
                <div className="h-4 bg-gray-200 rounded-full w-32 mb-2 animate-pulse"></div>

                <div className="h-4 bg-gray-200 rounded-full w-24 animate-pulse"></div>
              </div>
              <button className="ml-auto bg-gray-200 h-10 w-10 rounded-full animate-pulse"></button>
            </div>
          </div>
          <div className="hidden sm:flex flex-col gap-5 mt-6">
            {/* Sidebar action buttons placeholder */}
            <button className="flex gap-5 items-center font-bold text-lg bg-gray-200 h-12 w-full rounded-lg animate-pulse mb-4"></button>

            <button className="flex gap-6 items-center font-bold text-lg bg-gray-200 h-12 w-full rounded-lg animate-pulse mb-4"></button>

            <button className="flex gap-5 items-center font-bold text-lg bg-gray-200 h-12 w-full rounded-lg animate-pulse"></button>
          </div>
        </div>
        <div>
          {/* Section title placeholder */}
          <span className="font-extrabold h-6 bg-gray-200 rounded-full w-48 mb-4 animate-pulse"></span>

          {/* Grid of GIFs or content items placeholder */}
          <div className="columns-2 md:columns-3 gap-2">
            <div className="w-full h-48 bg-gray-200 rounded-lg animate-pulse mb-4"></div>

            <div className="w-full h-48 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShimmerGIFPage;
