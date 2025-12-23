import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Film, MapPin, Calendar, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { movies, theaters } from "@/data/mockData";

export function QuickBookingBar() {
  const navigate = useNavigate();
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedTheater, setSelectedTheater] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const nowShowingMovies = movies.filter((m) => m.status === "now_showing");
  
  // Generate next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      value: date.toISOString().split("T")[0],
      label: i === 0 ? "Hôm nay" : date.toLocaleDateString("vi-VN", { weekday: "short", day: "2-digit", month: "2-digit" }),
    };
  });

  const handleQuickBook = () => {
    if (selectedMovie) {
      navigate(`/booking/${selectedMovie}${selectedTheater ? `?theater=${selectedTheater}` : ""}`);
    }
  };

  return (
    <div className="bg-secondary/80 backdrop-blur-sm border-y border-border">
      <div className="container py-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
          {/* Movie Select */}
          <div className="flex-1 min-w-0">
            <label className="text-xs text-muted-foreground mb-1 block">CHỌN PHIM</label>
            <Select value={selectedMovie} onValueChange={setSelectedMovie}>
              <SelectTrigger className="bg-background/50 border-border h-11">
                <div className="flex items-center gap-2">
                  <Film className="w-4 h-4 text-primary" />
                  <SelectValue placeholder="Chọn phim..." />
                </div>
              </SelectTrigger>
              <SelectContent>
                {nowShowingMovies.map((movie) => (
                  <SelectItem key={movie.id} value={movie.id}>
                    {movie.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Theater Select */}
          <div className="flex-1 min-w-0">
            <label className="text-xs text-muted-foreground mb-1 block">CHỌN RẠP</label>
            <Select value={selectedTheater} onValueChange={setSelectedTheater}>
              <SelectTrigger className="bg-background/50 border-border h-11">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <SelectValue placeholder="Tất cả các rạp" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {theaters.map((theater) => (
                  <SelectItem key={theater.id} value={theater.id}>
                    {theater.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date Select */}
          <div className="flex-1 min-w-0">
            <label className="text-xs text-muted-foreground mb-1 block">CHỌN NGÀY</label>
            <Select value={selectedDate} onValueChange={setSelectedDate}>
              <SelectTrigger className="bg-background/50 border-border h-11">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <SelectValue placeholder="Hôm nay" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {dates.map((date) => (
                  <SelectItem key={date.value} value={date.value}>
                    {date.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Book Button */}
          <div className="md:pt-5">
            <Button
              variant="hero"
              size="lg"
              className="w-full md:w-auto gap-2"
              onClick={handleQuickBook}
              disabled={!selectedMovie}
            >
              <Zap className="w-4 h-4" />
              Mua vé nhanh
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
