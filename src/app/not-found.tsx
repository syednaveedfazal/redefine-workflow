import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen text-2xl text-gray-500">
      <h1 className="text-4xl text-primary">404 Not Found</h1>
      <p className="mt-4">The page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound;
