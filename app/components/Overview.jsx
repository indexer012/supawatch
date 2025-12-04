"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { StarIcon, PlayIcon } from "@heroicons/react/24/solid";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

export default function Hero() {
  const [movies, setMovies] = useState([]);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        const data = await response.json();
        const popularMovies = data.results.slice(0, 5);
        setMovies(popularMovies);
        setCurrentMovie(popularMovies[0]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    if (movies.length > 0) {
      const interval = setInterval(() => {
        setCurrentMovie((prevMovie) => {
          const currentIndex = movies.findIndex(
            (movie) => movie.id === prevMovie.id
          );
          const nextIndex = (currentIndex + 1) % movies.length;
          return movies[nextIndex];
        });
      }, 8000);

      return () => clearInterval(interval);
    }
  }, [movies]);

  if (loading || !currentMovie) {
    return (
      <div className="relative w-full lg:h-screen h-[70vh] flex items-center justify-center bg-[#010101]">
        <div className="animate-pulse text-neutral-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative w-full lg:h-screen h-[70vh] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={`https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`}
          alt={currentMovie.title}
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#010101] via-[#010101]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#010101] via-[#010101]/40 to-transparent" />
      </div>

      <div className="relative h-full flex items-end lg:items-center lg:px-10 px-6 pb-20 lg:pb-0">
        <div className="max-w-2xl space-y-6">
          <h1 className="lg:text-7xl text-5xl font-black tracking-tight text-white text-dm">
            {currentMovie.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-neutral-300">
            <div className="flex items-center gap-1">
              <StarIcon className="w-5 h-5 text-yellow-500" />
              <span className="font-semibold">
                {currentMovie.vote_average.toFixed(1)}
              </span>
            </div>
            <span>•</span>
            <span>{new Date(currentMovie.release_date).getFullYear()}</span>
          </div>

          <p className="text-neutral-300 lg:text-lg text-base line-clamp-3 leading-relaxed">
            {currentMovie.overview}
          </p>

          <div className="flex items-center gap-4 pt-2">
            <Link
              href={`/movie/${currentMovie.id}`}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-br from-yellow-400 to-yellow-700 hover:from-yellow-500 hover:to-yellow-800 text-black font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-yellow-500/50"
            >
              <PlayIcon className="w-5 h-5" />
              Watch Now
            </Link>

            <Link
              href={`/movie/${currentMovie.id}`}
              className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full transition-all duration-300"
            >
              <InformationCircleIcon className="w-5 h-5" />
              More Details
            </Link>
          </div>

          <div className="flex items-center gap-3 pt-4">
            {movies.map((movie, index) => (
              <button
                key={movie.id}
                onClick={() => setCurrentMovie(movie)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  currentMovie.id === movie.id
                    ? "w-12 bg-yellow-500"
                    : "w-8 bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`View ${movie.title}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
