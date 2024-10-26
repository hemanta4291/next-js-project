"use client";
import React, { useEffect } from "react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { MovieType } from "@/types/movieTypes";
import { fetchMovies, searchMovies } from "@/api/moviesAPI";
import MovieItem from "../components/MovieItem";
import { useSearch } from "@/context/SearchContext";
import Skeleton from "@/components/Skeleton";
import NotFound from "./not-found";

const Movies: React.FC = () => {
  const { searchText } = useSearch();
  const client = useQueryClient();

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<MovieType[]>({
    queryKey: ["movie", searchText],
    queryFn: ({ pageParam = 1 }) =>
      searchText
        ? searchMovies(searchText, pageParam as number)
        : fetchMovies({ pageParam: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 20) {
        return undefined;
      } else {
        return allPages.length + 1;
      }
    },
  });

  useEffect(() => {
    client.setQueryDefaults(["movie", searchText], {
      staleTime: 1000 * 60,
    });
  }, [client, searchText]);

  if (isLoading) {
    return (
      <div className="container pt-12 pb-40">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <Skeleton length={20} skHeight="430px" skWidth={"100%"} />
        </div>
      </div>
    );
  }

  if (isError) {
    return <div>{error.message}.........</div>;
  }

  const updateData: MovieType[] = data?.pages?.flatMap((page) => page) || [];

  if (updateData.length === 0) {
    return <NotFound title="Movie Could Not Be Found" />;
  }

  return (
    <section className="pt-12 pb-40">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {updateData?.map((movie) => (
            <MovieItem key={movie.id} movie={movie} />
          ))}
        </div>
        <div className="text-center my-6">
          {hasNextPage && (
            <button
              onClick={() => fetchNextPage()}
              className="text-white bg-blue-500 border-0 rounded-lg p-4 ">
              {isFetchingNextPage ? "Loading........." : "load more"}
            </button>
          )}
          {!hasNextPage &&
            updateData?.length !== 0 &&
            "No More Films Available"}
        </div>
      </div>
    </section>
  );
};

export default Movies;
