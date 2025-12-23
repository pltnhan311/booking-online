import { Movie } from "@/data/mockData";
import { MovieCard } from "./MovieCard";
import { cn } from "@/lib/utils";

interface MovieGridProps {
  movies: Movie[];
  className?: string;
}

export function MovieGrid({ movies, className }: MovieGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6",
        className
      )}
    >
      {movies.map((movie, index) => (
        <div
          key={movie.id}
          className="fade-up"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <MovieCard movie={movie} />
        </div>
      ))}
    </div>
  );
}
