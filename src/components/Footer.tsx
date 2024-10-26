import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 p-4 mt-auto">
      <p className="text-center text-white text-sm">
        &copy; {new Date().getFullYear()} Movie Search App. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
