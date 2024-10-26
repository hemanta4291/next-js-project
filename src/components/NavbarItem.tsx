import Link from "next/link";
import React from "react";

interface NavbarItemProps {
  title: string;
  link: string;
}

const NavbarItem: React.FC<NavbarItemProps> = ({
  title = "Add title",
  link = "/",
}) => {
  return (
    <li>
      <Link className="p-5 text-white text-base font-medium" href={link}>
        {title}
      </Link>
    </li>
  );
};

export default NavbarItem;
