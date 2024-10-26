"use client";

import React, { useState } from "react";
import { CgMenuLeft } from "react-icons/cg";
import NavbarItem from "./NavbarItem";
import Link from "next/link";

const Header: React.FC = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  return (
    <header className="bg-blue-500 py-6">
      <div className="container">
        <div className="flex justify-between items-start md:items-center   flex-col md:flex-row  relative">
          <Link
            href={"/"}
            className="text-white text-xl md:text-3xl font-bold cursor-pointer">
            Movie Search App
          </Link>
          <ul
            className={` ${
              openMenu
                ? "h-full py-4 pl-6 pr-4"
                : "h-0 p-0 overflow-hidden md:overflow-visible"
            } fixed w-full  top-[76px] transition-all duration-300 z-[2] left-0 bg-blue-400 md:w-auto gap-3 md:gap-0 md:bg-transparent md:static flex flex-col md:flex-row  md:py-0  md:items-center`}>
            <NavbarItem title="Home" link="/" />
            <NavbarItem title="About" link="/about" />
          </ul>
          <span
            onClick={() => setOpenMenu(!openMenu)}
            className="text-white text-3xl block md:hidden absolute top-0 right-0 cursor-pointer">
            <CgMenuLeft />
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
