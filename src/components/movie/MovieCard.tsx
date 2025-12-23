import { Link, useNavigate } from "react-router-dom";
import { Star, Clock } from "lucide-react";
import { Movie } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MovieCardProps {
  movie: Movie;
  className?: string;
}

export function MovieCard({ movie, className }: MovieCardProps) {
  const navigate = useNavigate();

  const handleBookingClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/booking/${movie.id}`);
  };

  return (
    <Link
      to={`/movie/${movie.id}`}
      className={cn("group relative card-hover block cursor-pointer", className)}
    >
      {/* Poster Container */}
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-muted">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Badges */}
        {movie.badges && movie.badges.length > 0 && (
          <div className="absolute top-2 left-2 flex flex-wrap gap-1">
            {movie.badges.map((badge) => (
              <Badge
                key={badge}
                variant={badge === "HOT" ? "destructive" : "secondary"}
                className={cn(
                  "text-[10px] px-1.5 py-0.5",
                  badge === "HOT" && "bg-cinema-red pulse-badge",
                  badge === "18+" && "bg-destructive"
                )}
              >
                {badge}
              </Badge>
            ))}
          </div>
        )}

        {/* Age Rating */}
        <div className="absolute top-2 right-2">
          <Badge
            variant="outline"
            className={cn(
              "text-[10px] px-1.5 py-0.5 border-none font-bold",
              movie.ageRating === "C18" && "bg-destructive text-foreground",
              movie.ageRating === "C16" && "bg-cinema-warning text-background",
              movie.ageRating === "C13" && "bg-cinema-gold text-background",
              movie.ageRating === "P" && "bg-cinema-success text-background",
              movie.ageRating === "T18" && "bg-destructive text-foreground",
              movie.ageRating === "T16" && "bg-cinema-warning text-background",
              movie.ageRating === "T13" && "bg-cinema-gold text-background"
            )}
          >
            {movie.ageRating}
          </Badge>
        </div>

        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <Button
            variant="default"
            className="w-full"
            size="sm"
            onClick={handleBookingClick}
          >
            Đặt vé
          </Button>
        </div>
      </div>

      {/* Info */}
      <div className="mt-3 space-y-1">
        <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
          {movie.title}
        </h3>

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{movie.duration} phút</span>
          </div>
          <span>•</span>
          <span className="line-clamp-1">{movie.genre.slice(0, 2).join(", ")}</span>
        </div>

        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-cinema-gold fill-cinema-gold" />
          <span className="font-semibold text-foreground">{movie.rating}</span>
        </div>
      </div>
    </Link>
  );
}

