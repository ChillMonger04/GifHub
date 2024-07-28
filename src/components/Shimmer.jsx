const Shimmer = () => {
  // Define the number of columns (based on desired number of placeholders)
  const numberOfColumns = 30;

  return (
    <div className="relative w-full h-full flex flex-wrap gap-4 p-4">
      {/* Shimmer effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 animate-pulse opacity-20" />
      {/* Shimmer columns */}
      {Array.from({ length: numberOfColumns }).map((_, index) => (
        <div
          key={index}
          style={{
            width: "100%",
            height: "240px",
            maxWidth: "200px",
          }}
        />
      ))}
    </div>
  );
};

export default Shimmer;
