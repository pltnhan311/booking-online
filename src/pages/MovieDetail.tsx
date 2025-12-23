import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Star, Clock, Calendar, Play, Ticket } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getMovieById, formatDate } from "@/data/mockData";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showTrailer, setShowTrailer] = useState(false);

  const movie = getMovieById(id || "");

  if (!movie) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Không tìm thấy phim</h1>
          <Button onClick={() => navigate("/")} variant="outline">
            Về trang chủ
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Background */}
      <div className="relative min-h-[60vh] md:min-h-[70vh]">
        <div className="absolute inset-0">
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
          <div className="absolute inset-0 hero-gradient-light" />
        </div>

        {/* Back Button */}
        <div className="container relative z-10 pt-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại
          </Button>
        </div>

        {/* Content */}
        <div className="container relative z-10 pt-8 pb-12">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Poster */}
            <div className="shrink-0 mx-auto md:mx-0">
              <div className="relative w-64 md:w-80 aspect-[2/3] rounded-2xl overflow-hidden shadow-elevated bg-card p-2">
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-full h-full object-cover rounded-xl"
                />
                {/* Play Trailer Overlay */}
                <Dialog open={showTrailer} onOpenChange={setShowTrailer}>
                  <DialogTrigger asChild>
                    <button className="absolute inset-2 flex items-center justify-center bg-foreground/30 rounded-xl opacity-0 hover:opacity-100 transition-opacity group">
                      <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                        <Play className="w-8 h-8 text-primary-foreground fill-primary-foreground ml-1" />
                      </div>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl p-0 overflow-hidden shadow-elevated">
                    <div className="aspect-video">
                      <iframe
                        src={movie.trailerUrl}
                        title={`${movie.title} Trailer`}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 space-y-6">
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {movie.badges?.map((badge) => (
                  <Badge
                    key={badge}
                    variant={badge === "HOT" ? "hot" : "secondary"}
                  >
                    {badge}
                  </Badge>
                ))}
                <Badge
                  variant={
                    movie.ageRating.includes("18") ? "destructive" :
                      movie.ageRating.includes("16") ? "warning" :
                        "success"
                  }
                  className="font-bold"
                >
                  {movie.ageRating}
                </Badge>
              </div>

              {/* Title */}
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-2">
                  {movie.title}
                </h1>
                <p className="text-lg text-muted-foreground">{movie.titleEn}</p>
              </div>

              {/* Rating & Meta */}
              <div className="flex flex-wrap items-center gap-4 md:gap-6">
                <div className="flex items-center gap-2">
                  <Star className="w-6 h-6 text-cinema-gold fill-cinema-gold" />
                  <span className="text-2xl font-bold text-foreground">{movie.rating}</span>
                  <span className="text-muted-foreground">/10</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-5 h-5" />
                  <span>{movie.duration} phút</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-5 h-5" />
                  <span>{formatDate(movie.releaseDate)}</span>
                </div>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2">
                {movie.genre.map((g) => (
                  <Badge key={g} variant="outline">
                    {g}
                  </Badge>
                ))}
              </div>

              {/* Description */}
              <div className="bg-card rounded-2xl p-5 shadow-subtle">
                <p className="text-muted-foreground leading-relaxed">{movie.description}</p>
              </div>

              {/* Cast & Crew */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-card rounded-2xl p-5 shadow-subtle">
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Đạo diễn</h3>
                  <p className="text-foreground font-medium">{movie.director}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Diễn viên</h3>
                  <p className="text-foreground">{movie.cast.join(", ")}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Ngôn ngữ</h3>
                  <p className="text-foreground">{movie.language}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to={`/booking/${movie.id}`}>
                  <Button variant="hero" size="xl" className="gap-2">
                    <Ticket className="w-5 h-5" />
                    Đặt vé ngay
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="xl"
                  className="gap-2"
                  onClick={() => setShowTrailer(true)}
                >
                  <Play className="w-5 h-5" />
                  Xem Trailer
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
