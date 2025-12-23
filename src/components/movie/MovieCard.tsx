import { Link, useNavigate } from "react-router-dom";
import { Star, Clock } from "lucide-react";
import { Movie } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MovieCardProps {
  movie: Movie;
  className?: string;
  featured?: boolean;
}

export function MovieCard({ movie, className, featured = false }: MovieCardProps) {
  const navigate = useNavigate();

  const handleBookingClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/booking/${movie.id}`);
  };

  return (
    <Link
      to={`/movie/${movie.id}`}
      className={cn(
        "group relative block cursor-pointer rounded-2xl focus-ring bg-card transition-all duration-250 ease-out card-hover-enhanced",
        featured && "border-gradient-top",
        className
      )}
    >
      {/* Poster Container */}
      <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-muted m-2">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Badges */}
        {movie.badges && movie.badges.length > 0 && (
          <div className="absolute top-2 left-2 flex flex-wrap gap-1">
            {movie.badges.map((badge) => (
              <Badge
                key={badge}
                variant={badge === "HOT" ? "hot" : "secondary"}
                className="text-[10px] px-2 py-0.5"
              >
                {badge}
              </Badge>
            ))}
          </div>
        )}

        {/* Age Rating */}
        <div className="absolute top-2 right-2">
          <Badge
            variant={
              movie.ageRating.includes("18") ? "destructive" :
                movie.ageRating.includes("16") ? "warning" :
                  "success"
            }
            className="text-[10px] px-2 py-0.5 font-bold"
          >
            {movie.ageRating}
          </Badge>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <Button
            className="w-full"
            size="sm"
            onClick={handleBookingClick}
          >
            Đặt vé
          </Button>
        </div>
      </div>

      {/* Info */}
      <div className="p-3 pt-2 space-y-2">
        <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
          {movie.title}
        </h3>

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{movie.duration} phút</span>
          </div>
          <span className="text-border">•</span>
          <span className="line-clamp-1">{movie.genre.slice(0, 2).join(", ")}</span>
        </div>

        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-cinema-gold fill-cinema-gold" />
          <span className="font-semibold text-foreground">{movie.rating}</span>
          <span className="text-xs text-muted-foreground">/10</span>
        </div>
      </div>
    </Link>
  );
}
