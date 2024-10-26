import {
  fetchMovie,
  fetchMovieCredits,
  fetchMovierecommendations,
  fetchMovies,
} from "@/api/moviesAPI";
import MovieItem from "@/components/MovieItem";
import {
  CastMemberType,
  MovieDetailsType,
  MovieType,
} from "@/types/movieTypes";
import Image from "next/image";

type paramsType = {
  id: string;
};
interface MovieDetailPropsType {
  params: paramsType;
}

interface fetchCastMemberType {
  id: number;
  cast: CastMemberType[];
}

export async function generateMetadata({ params }: MovieDetailPropsType) {
  const { id } = params;
  const movie = await fetchMovie(Number(id));

  return {
    title: movie.title,
  };
}

const MovieDetail: React.FC<MovieDetailPropsType> = async ({ params }) => {
  const movieId = parseInt(params.id, 10);

  const movie: MovieDetailsType = await fetchMovie(movieId);
  const movieCreadits: fetchCastMemberType = await fetchMovieCredits(movieId);
  const movieRecommendations: MovieType[] = await fetchMovierecommendations(
    movieId
  );

  const { cast = [] } = movieCreadits;

  const { overview, genres, release_date, poster_path, title, backdrop_path } =
    movie || {};
  const ImgUrl = `https://image.tmdb.org/t/p/original/${
    poster_path || backdrop_path
  }`;

  const castNames = cast.map((member) => member.name).join(", ");

  return (
    <>
      <section className="pb-20 lg:pb-40">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Image
              className="w-full"
              src={ImgUrl}
              width={600}
              height={300}
              alt={title}
            />
            <div className="p-4">
              <h1 className="text-4xl font-semibold">{title}</h1>
              <div className="text-xl py-5">
                <h3 className="text-xl pb-2 font-semibold">Discription:</h3>
                <p className="text-gray-600 text-base">{overview}</p>
              </div>
              <div className="text-xl py-5">
                <h3 className="text-xl pb-2 font-semibold">genres:</h3>
                <div className="flex items-center gap-2">
                  {genres.length > 0 &&
                    genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="text-gray-200 inline-block bg-gray-900 py-1 px-2  rounded text-base ">
                        {genre.name}
                      </span>
                    ))}
                </div>
              </div>
              <div className="text-xl py-5 flex gap-3 items-center">
                <span className="font-semibold">Release date:</span>
                <span>{release_date}</span>
              </div>
              <div className="text-xl py-5">
                <h3 className="text-xl pb-2 font-semibold">Cast:</h3>
                <span>{castNames}</span>
              </div>

              {/* <button className="bg-blue-500 text-white py-2 px-4 rounded-md border-0">
                Add to Favorites
              </button> */}
            </div>
          </div>
        </div>
      </section>
      <section className="pb-28">
        <div className="container">
          <h2 className="text-4xl font-semibold pb-12">
            Related movie recommendations{" "}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {movieRecommendations?.map((movie) => (
              <MovieItem key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default MovieDetail;

const pageParam = { pageParam: 1 };
export async function generateStaticParams() {
  const movies = await fetchMovies(pageParam);

  return movies.map((movie) => ({
    id: movie.id.toString(),
  }));
}
