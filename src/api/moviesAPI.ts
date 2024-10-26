import { MovieType } from "@/types/movieTypes";

type pageParamType = {
    pageParam:number
}

export const fetchMovies = async ({pageParam}:pageParamType):Promise<MovieType[]> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${pageParam}`,
      {
        next:{
          revalidate:60
        }
      }
    );
  
    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }
  
    const data = await response.json();
    return data.results;
  };

  export const searchMovies = async (query: string, page: number) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${query}&page=${page}`
    );
    
    if (!response.ok) {
      throw new Error("Failed to fetch search results");
    }
    
    const data = await response.json();
    return data.results;
  };


  export const fetchMovie = async (movieId: number) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
      {
        next:{
          revalidate:10
        }
      }
      
      
    );
    
    if (!response.ok) {
      throw new Error("Failed to fetch Movie Details results");
    }
    
    
    const data = await response.json();
    return data;
  };
  export const fetchMovieCredits = async (movieId: number) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/movie/${movieId}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
    );
    
    if (!response.ok) {
      throw new Error("Failed to fetch creadits results");
    }
    
    
    const data = await response.json();
    return data;
  };

  export const fetchMovierecommendations = async (movieId: number) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/movie/${movieId}/recommendations?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
      {
        next:{
          revalidate:60
        }
      }
      
    );
    
    if (!response.ok) {
      throw new Error("Failed to fetch Recommendations results");
    }
    
    
    const data = await response.json();
    return data.results;
  };
  