import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="col-span-1 w-full max-md:flex max-md:flex-col max-md:items-center max-md:my-4 animate-pulse">

      <div className="h-6 w-3/4 bg-gray-300 rounded-md mb-4"></div>
      <div className="h-6 w-1/2 bg-gray-300 rounded-md mb-2"></div>

      <div className="h-6 my-4 w-full bg-gray-300 rounded-md mb-2"></div>
      <div className="h-6 my-4 w-5/6 bg-gray-300 rounded-md mb-2"></div>
      <div className="h-6 my-4 w-4/6 bg-gray-300 rounded-md mb-4"></div>
      <div className="flex items-center space-x-2 mb-4">
        <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
        <div className="h-6 w-1/3 bg-gray-300 rounded-md"></div>
      </div>
      <div className="flex justify-between items-center max-md:flex-row-reverse max-md:gap-4 mt-4 w-full">
        <div className="h-6 w-1/4 bg-gray-300 rounded-md"></div>
        <div className="h-10 w-32 bg-gray-300 rounded-lg"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
