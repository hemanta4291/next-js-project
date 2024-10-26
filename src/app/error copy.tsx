"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

const Error: React.FC<ErrorProps> = ({ error, reset }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container flex flex-col justify-center items-center h-[calc(100vh-300px)] text-2xl font-semibold">
      <h2>Something went wrong fetching posts segment!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
};

export default Error;
