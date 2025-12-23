import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { QuickBookingBar } from "@/components/home/QuickBookingBar";
import { MovieGrid } from "@/components/movie/MovieGrid";
import { HowToBookSection } from "@/components/home/HowToBookSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { movies } from "@/data/mockData";
import { Button } from "@/components/ui/button";

export default function Home() {
  const featuredMovie = movies.find((m) => m.isFeatured) || movies[0];
  const nowShowingMovies = movies.filter((m) => m.status === "now_showing");
  const comingSoonMovies = movies.filter((m) => m.status === "coming_soon");

  return (
    <Layout>
      {/* Hero */}
      <HeroSection movie={featuredMovie} />

      {/* Quick Booking Bar */}
      <QuickBookingBar />

      {/* Now Showing Section */}
      <section id="now-showing" className="py-12 md:py-20">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-primary rounded-full" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                PHIM ĐANG CHIẾU
              </h2>
            </div>
            <Link to="/movies" className="hidden md:flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
              Xem tất cả
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <MovieGrid movies={nowShowingMovies.slice(0, 8)} />

          <div className="md:hidden flex justify-center mt-8">
            <Link to="/movies">
              <Button variant="outline" className="gap-2">
                Xem tất cả
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How to Book */}
      <HowToBookSection />

      {/* Coming Soon Section */}
      {comingSoonMovies.length > 0 && (
        <section className="py-12 md:py-20">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-1 h-8 bg-cinema-gold rounded-full" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  PHIM SẮP CHIẾU
                </h2>
              </div>
              <Link to="/coming-soon" className="hidden md:flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                Xem tất cả
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <MovieGrid movies={comingSoonMovies.slice(0, 4)} />
          </div>
        </section>
      )}

      {/* Newsletter */}
      <NewsletterSection />
    </Layout>
  );
}
