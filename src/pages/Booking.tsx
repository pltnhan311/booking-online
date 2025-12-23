import { useState, useMemo } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, Clock, Check } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  getMovieById,
  theaters,
  showtimes as allShowtimes,
  seatConfig,
  formatPrice,
  formatTime,
  Theater,
  Showtime
} from "@/data/mockData";
import { cn } from "@/lib/utils";

type BookingStep = 1 | 2 | 3;

const generateSoldSeats = (showtimeId: string): string[] => {
  const seed = showtimeId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const soldSeats: string[] = [];
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

  for (let i = 0; i < 15; i++) {
    const rowIndex = (seed + i * 7) % rows.length;
    const seatNum = ((seed + i * 11) % 12) + 1;
    const seatId = `${rows[rowIndex]}${seatNum}`;
    if (!soldSeats.includes(seatId)) {
      soldSeats.push(seatId);
    }
  }
  return soldSeats;
};

export default function Booking() {
  const { movieId } = useParams<{ movieId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [step, setStep] = useState<BookingStep>(1);
  const [selectedTheater, setSelectedTheater] = useState<Theater | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedShowtime, setSelectedShowtime] = useState<Showtime | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [soldSeats, setSoldSeats] = useState<string[]>([]);

  const movie = getMovieById(movieId || "");

  const dates = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i);
      return {
        value: date.toISOString().split("T")[0],
        label: i === 0 ? "Hôm nay" : date.toLocaleDateString("vi-VN", { weekday: "short", day: "2-digit", month: "2-digit" }),
        dayLabel: date.toLocaleDateString("vi-VN", { weekday: "long" }),
        dateLabel: date.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" }),
      };
    });
  }, []);

  const availableShowtimes = useMemo(() => {
    if (!selectedTheater || !selectedDate) return [];
    return allShowtimes.filter(
      (s) =>
        s.movieId === movieId &&
        s.theaterId === selectedTheater.id &&
        s.dateTime.startsWith(selectedDate)
    );
  }, [movieId, selectedTheater, selectedDate]);

  const handleSelectTheater = (theater: Theater) => {
    setSelectedTheater(theater);
    setSelectedDate(dates[0].value);
    setSelectedShowtime(null);
    setSelectedSeats([]);
    setStep(2);
  };

  const handleSelectShowtime = (showtime: Showtime) => {
    setSelectedShowtime(showtime);
    setSoldSeats(generateSoldSeats(showtime.id));
    setSelectedSeats([]);
    setStep(3);
  };

  const handleSeatClick = (seatId: string) => {
    if (soldSeats.includes(seatId)) return;

    setSelectedSeats((prev) => {
      if (prev.includes(seatId)) {
        return prev.filter((s) => s !== seatId);
      }
      if (prev.length >= 8) return prev;
      return [...prev, seatId];
    });
  };

  const totalPrice = useMemo(() => {
    if (!selectedShowtime) return 0;
    return selectedSeats.reduce((total, seatId) => {
      const row = seatId[0];
      const isVip = seatConfig.vipRows.includes(row);
      return total + (isVip ? selectedShowtime.priceVip : selectedShowtime.price);
    }, 0);
  }, [selectedSeats, selectedShowtime]);

  const handleProceedToPayment = () => {
    sessionStorage.setItem(
      "pendingBooking",
      JSON.stringify({
        movieId,
        theaterId: selectedTheater?.id,
        showtimeId: selectedShowtime?.id,
        seats: selectedSeats,
        totalPrice,
      })
    );
    navigate("/payment");
  };

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
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b border-border bg-card shadow-subtle">
          <div className="container py-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => (step > 1 ? setStep((step - 1) as BookingStep) : navigate(-1))}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex-1">
                <h1 className="font-semibold text-foreground">{movie.title}</h1>
                <p className="text-sm text-muted-foreground">Đặt vé xem phim</p>
              </div>

              {/* Step Indicator */}
              <div className="hidden md:flex items-center gap-3">
                {[1, 2, 3].map((s, index) => (
                  <div key={s} className="flex items-center">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-250",
                        s === step && "bg-primary text-primary-foreground shadow-md",
                        s < step && "bg-card border-2 border-primary text-primary",
                        s > step && "bg-card border-2 border-border text-muted-foreground"
                      )}
                    >
                      {s < step ? <Check className="w-5 h-5" /> : s}
                    </div>
                    {index < 2 && (
                      <div
                        className={cn(
                          "w-12 h-0.5 mx-2",
                          s < step ? "bg-primary" : "bg-border"
                        )}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="container py-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
              {/* Step 1: Theater Selection */}
              {step === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <h2 className="text-xl font-display font-semibold text-foreground mb-2">Chọn rạp chiếu</h2>
                    <p className="text-muted-foreground text-sm">Bước 1/3</p>
                  </div>

                  <div className="grid gap-4">
                    {theaters.map((theater) => (
                      <button
                        key={theater.id}
                        onClick={() => handleSelectTheater(theater)}
                        className={cn(
                          "w-full p-5 rounded-2xl border-2 text-left transition-all duration-250 bg-card shadow-subtle hover:shadow-medium",
                          selectedTheater?.id === theater.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary"
                        )}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-foreground">{theater.name}</h3>
                            <div className="flex items-center gap-2 mt-1.5 text-sm text-muted-foreground">
                              <MapPin className="w-4 h-4 text-primary" />
                              <span>{theater.location.address}, {theater.location.district}</span>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-3">
                              {theater.screens.map((screen) => (
                                <Badge key={screen.id} variant="secondary" className="text-xs">
                                  {screen.type}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground font-medium">{theater.distance}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Date & Showtime Selection */}
              {step === 2 && selectedTheater && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <h2 className="text-xl font-display font-semibold text-foreground mb-2">Chọn suất chiếu</h2>
                    <p className="text-muted-foreground text-sm">Bước 2/3 • {selectedTheater.name}</p>
                  </div>

                  {/* Date Selector */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2 uppercase tracking-wide">
                      <Calendar className="w-4 h-4 text-primary" />
                      Chọn ngày
                    </h3>
                    <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
                      {dates.map((date) => (
                        <button
                          key={date.value}
                          onClick={() => {
                            setSelectedDate(date.value);
                            setSelectedShowtime(null);
                          }}
                          className={cn(
                            "shrink-0 px-4 py-3 rounded-xl border-2 text-center min-w-[90px] transition-all duration-250 bg-card",
                            selectedDate === date.value
                              ? "border-primary bg-primary/5 text-primary"
                              : "border-border hover:border-primary/50"
                          )}
                        >
                          <p className="text-xs text-muted-foreground">{date.dayLabel}</p>
                          <p className="font-semibold text-foreground">{date.dateLabel}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Showtimes */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2 uppercase tracking-wide">
                      <Clock className="w-4 h-4 text-primary" />
                      Suất chiếu
                    </h3>
                    {availableShowtimes.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {availableShowtimes.map((showtime) => {
                          const screen = selectedTheater.screens.find((s) => s.id === showtime.screenId);
                          return (
                            <button
                              key={showtime.id}
                              onClick={() => handleSelectShowtime(showtime)}
                              className={cn(
                                "p-4 rounded-xl border-2 text-center transition-all duration-250 bg-card",
                                selectedShowtime?.id === showtime.id
                                  ? "border-primary bg-primary/5"
                                  : "border-border hover:border-primary/50"
                              )}
                            >
                              <p className="text-xl font-bold text-foreground">{formatTime(showtime.dateTime)}</p>
                              <p className="text-xs text-muted-foreground mt-1">{screen?.name}</p>
                              <Badge variant="secondary" className="text-xs mt-2">
                                {screen?.type}
                              </Badge>
                              <p className="text-sm text-primary font-semibold mt-2">{formatPrice(showtime.price)}</p>
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="bg-card rounded-2xl p-8 text-center shadow-subtle">
                        <p className="text-muted-foreground">
                          Không có suất chiếu nào trong ngày này
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Seat Selection */}
              {step === 3 && selectedShowtime && selectedTheater && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <h2 className="text-xl font-display font-semibold text-foreground mb-2">Chọn ghế ngồi</h2>
                    <p className="text-muted-foreground text-sm">
                      Bước 3/3 • {formatTime(selectedShowtime.dateTime)} • {selectedTheater.name}
                    </p>
                  </div>

                  {/* Screen Indicator */}
                  <div className="text-center py-4">
                    <div className="w-3/4 mx-auto h-3 bg-gradient-to-r from-primary via-accent to-primary rounded-full mb-2 shadow-sm opacity-70" />
                    <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Màn hình</p>
                  </div>

                  {/* Seat Map */}
                  <div className="bg-card rounded-2xl p-6 shadow-subtle overflow-x-auto">
                    <div className="flex flex-col items-center gap-2 min-w-fit mx-auto">
                      {seatConfig.rows.map((row) => (
                        <div key={row} className="flex items-center gap-1.5">
                          <span className="w-6 text-center text-xs font-semibold text-muted-foreground">{row}</span>
                          <div className="flex gap-1.5">
                            {Array.from({ length: seatConfig.seatsPerRow }, (_, i) => {
                              const seatNum = i + 1;
                              const seatId = `${row}${seatNum}`;
                              const isSold = soldSeats.includes(seatId);
                              const isSelected = selectedSeats.includes(seatId);
                              const isVip = seatConfig.vipRows.includes(row);
                              const isAisle = seatConfig.aisles.includes(seatNum);

                              return (
                                <div key={seatId} className={cn("flex", isAisle && "mr-6")}>
                                  <button
                                    onClick={() => handleSeatClick(seatId)}
                                    disabled={isSold}
                                    className={cn(
                                      "seat",
                                      isSold && "seat-sold",
                                      isSelected && "seat-selected",
                                      !isSold && !isSelected && "seat-available",
                                      isVip && !isSold && !isSelected && "seat-vip"
                                    )}
                                  >
                                    {seatNum}
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                          <span className="w-6 text-center text-xs font-semibold text-muted-foreground">{row}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="flex flex-wrap justify-center gap-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="seat seat-available w-6 h-6" />
                      <span className="text-xs text-muted-foreground">Trống</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="seat seat-selected w-6 h-6" />
                      <span className="text-xs text-muted-foreground">Đang chọn</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="seat seat-sold w-6 h-6" />
                      <span className="text-xs text-muted-foreground">Đã bán</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="seat seat-vip w-6 h-6" />
                      <span className="text-xs text-muted-foreground">VIP ({formatPrice(selectedShowtime.priceVip)})</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar - Booking Summary */}
            <div className="lg:w-80 shrink-0">
              <div className="sticky top-24 bg-card rounded-2xl border border-border shadow-medium p-5 space-y-4">
                {/* Movie Info */}
                <div className="flex gap-3">
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-16 h-24 object-cover rounded-xl shadow-subtle"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground text-sm line-clamp-2">{movie.title}</h3>
                    <Badge
                      variant={
                        movie.ageRating.includes("18") ? "destructive" :
                          movie.ageRating.includes("16") ? "warning" :
                            "success"
                      }
                      className="mt-2 text-xs font-bold"
                    >
                      {movie.ageRating}
                    </Badge>
                  </div>
                </div>

                {/* Selected Info */}
                <div className="space-y-3 pt-3 border-t border-border">
                  {selectedTheater && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Rạp</span>
                      <span className="text-foreground font-medium">{selectedTheater.name}</span>
                    </div>
                  )}
                  {selectedShowtime && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Suất chiếu</span>
                        <span className="text-foreground font-medium">
                          {formatTime(selectedShowtime.dateTime)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Ngày</span>
                        <span className="text-foreground font-medium">
                          {new Date(selectedShowtime.dateTime).toLocaleDateString("vi-VN")}
                        </span>
                      </div>
                    </>
                  )}
                  {selectedSeats.length > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Ghế</span>
                      <span className="text-foreground font-medium">
                        {selectedSeats.sort().join(", ")}
                      </span>
                    </div>
                  )}
                </div>

                {/* Total */}
                {totalPrice > 0 && (
                  <div className="pt-3 border-t border-border">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Tổng cộng</span>
                      <span className="text-xl font-bold text-primary">{formatPrice(totalPrice)}</span>
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <Button
                  className="w-full"
                  size="lg"
                  disabled={step < 3 || selectedSeats.length === 0}
                  onClick={handleProceedToPayment}
                >
                  {step < 3 ? "Vui lòng hoàn tất các bước" : "Thanh toán"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
