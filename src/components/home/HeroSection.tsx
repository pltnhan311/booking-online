import { Link } from "react-router-dom";
import { Play, Ticket, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Movie } from "@/data/mockData";

interface HeroSectionProps {
  movie: Movie;
}

export function HeroSection({ movie }: HeroSectionProps) {
  return (
    <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover object-top"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 hero-gradient-light" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
      </div>

      {/* Content */}
      <div className="container relative z-10 py-20 md:py-24">
        <div className="max-w-2xl space-y-6">
          {/* Badge */}
          <Badge variant="hot" className="animate-fade-in">
            🔥 PHIM BOM TẤN
          </Badge>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight animate-slide-up">
            {movie.title.split(":")[0]}
            {movie.title.includes(":") && (
              <>
                :
                <span className="text-gradient-primary block">
                  {movie.title.split(":")[1]}
                </span>
              </>
            )}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground animate-slide-up delay-100">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-cinema-gold fill-cinema-gold" />
              <span className="font-semibold text-foreground">{movie.rating}</span>
              <span>/10</span>
            </div>
            <span className="text-border">•</span>
            <span>{movie.genre.join(", ")}</span>
            <span className="text-border">•</span>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{movie.duration} phút</span>
            </div>
            <span className="text-border">•</span>
            <Badge variant="outline" className="text-xs">
              {movie.ageRating}
            </Badge>
          </div>

          {/* Info Card */}
          <div className="bg-card rounded-3xl p-6 shadow-elevated border-gradient-top max-w-lg animate-slide-up delay-200">
            <p className="text-muted-foreground leading-relaxed line-clamp-3">
              {movie.description}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 pt-2 animate-slide-up delay-300">
            <Link to={`/booking/${movie.id}`}>
              <Button variant="hero" size="lg" className="gap-2">
                <Ticket className="w-5 h-5" />
                Đặt vé ngay
              </Button>
            </Link>
            <Link to={`/movie/${movie.id}`}>
              <Button variant="outline" size="lg" className="gap-2">
                <Play className="w-5 h-5" />
                Xem Trailer
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
