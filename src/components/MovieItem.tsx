"use client";

import React from "react";
import Image from "next/image";

import Link from "next/link";
import { MovieType } from "@/types/movieTypes";

interface MovieItemProps {
  movie: MovieType;
}

const MovieItem: React.FC<MovieItemProps> = ({ movie }) => {
  const { id, poster_path, original_title, backdrop_path } = movie || {};
  const ImgUrl = `https://image.tmdb.org/t/p/original/${
    poster_path || backdrop_path
  }`;
  return (
    <Link
      href={`/movie/${id}`}
      className="text-center bg-blue-500  border border-gray-300 rounded-lg">
      <Image
        blurDataURL="blur"
        className="rounded-t-lg w-full"
        src={ImgUrl}
        width={300}
        height={300}
        alt="ress"
      />
      <h2 className="text-base md:text-xl text-white font-semibold p-4">
        {original_title}
      </h2>
    </Link>
  );
};

export default MovieItem;
