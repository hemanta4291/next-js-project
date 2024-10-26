import React from "react";

type NotfounType = {
  title: string;
};

const NotFound = ({
  title = " The requested resource was not found!",
}: NotfounType) => {
  return (
    <div className="container flex justify-center items-center h-[calc(100vh-300px)] text-2xl font-semibold">
      {title}
    </div>
  );
};

export default NotFound;
