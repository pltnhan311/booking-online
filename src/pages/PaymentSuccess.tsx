import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle2, Ticket, Home, Download } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { getMovieById, getTheaterById, getShowtimeById, formatPrice, formatTime, Booking } from "@/data/mockData";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get("id");
  const [booking, setBooking] = useState<Booking | null>(null);

  useEffect(() => {
    if (!bookingId) {
      navigate("/");
      return;
    }

    // Get booking from localStorage
    const storedBookings = JSON.parse(localStorage.getItem("vietcinema_bookings") || "[]");
    const found = storedBookings.find((b: Booking) => b.id === bookingId);
    
    if (found) {
      setBooking(found);
    } else {
      navigate("/");
    }
  }, [bookingId, navigate]);

  if (!booking) {
    return null;
  }

  const movie = getMovieById(booking.movieId);
  const theater = getTheaterById(booking.theaterId);
  const showtime = getShowtimeById(booking.showtimeId);

  if (!movie || !theater || !showtime) {
    return null;
  }

  const qrData = JSON.stringify({
    bookingId: booking.id,
    movie: movie.title,
    theater: theater.name,
    showtime: showtime.dateTime,
    seats: booking.seats,
    total: booking.totalPrice,
  });

  return (
    <Layout>
      <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full space-y-8 text-center">
          {/* Success Icon */}
          <div className="relative">
            <div className="w-24 h-24 mx-auto bg-cinema-success/20 rounded-full flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-12 h-12 text-cinema-success" />
            </div>
            <div className="absolute inset-0 w-24 h-24 mx-auto bg-cinema-success/10 rounded-full animate-ping" />
          </div>

          {/* Success Message */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Đặt vé thành công!</h1>
            <p className="text-muted-foreground">
              Cảm ơn bạn đã đặt vé tại VietCinema
            </p>
          </div>

          {/* Booking Card */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            {/* Header */}
            <div className="bg-primary/10 p-4 border-b border-border">
              <p className="text-sm text-muted-foreground">Mã đặt vé</p>
              <p className="text-2xl font-bold font-mono text-primary">{booking.id}</p>
            </div>

            {/* QR Code */}
            <div className="p-6 flex justify-center bg-white">
              <QRCodeSVG
                value={qrData}
                size={180}
                level="H"
                includeMargin
                bgColor="#ffffff"
                fgColor="#000000"
              />
            </div>

            {/* Booking Details */}
            <div className="p-4 space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-16 h-24 object-cover rounded-lg"
                />
                <div className="flex-1 text-left">
                  <h3 className="font-semibold text-foreground line-clamp-2">{movie.title}</h3>
                  <p className="text-muted-foreground text-xs mt-1">{movie.ageRating} • {movie.duration} phút</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border">
                <div className="text-left">
                  <p className="text-muted-foreground text-xs">Rạp</p>
                  <p className="text-foreground font-medium">{theater.name}</p>
                </div>
                <div className="text-left">
                  <p className="text-muted-foreground text-xs">Suất chiếu</p>
                  <p className="text-foreground font-medium">
                    {formatTime(showtime.dateTime)}
                  </p>
                </div>
                <div className="text-left">
                  <p className="text-muted-foreground text-xs">Ngày</p>
                  <p className="text-foreground font-medium">
                    {new Date(showtime.dateTime).toLocaleDateString("vi-VN")}
                  </p>
                </div>
                <div className="text-left">
                  <p className="text-muted-foreground text-xs">Ghế</p>
                  <p className="text-foreground font-medium">
                    {booking.seats.sort().join(", ")}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-border flex justify-between items-center">
                <span className="text-muted-foreground">Tổng tiền</span>
                <span className="text-xl font-bold text-primary">{formatPrice(booking.totalPrice)}</span>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <p className="text-sm text-muted-foreground">
            Vui lòng đưa mã QR này cho nhân viên tại quầy để nhận vé
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              className="flex-1 gap-2"
              onClick={() => navigate("/my-tickets")}
            >
              <Ticket className="w-4 h-4" />
              Xem vé của tôi
            </Button>
            <Button
              variant="hero"
              className="flex-1 gap-2"
              onClick={() => navigate("/")}
            >
              <Home className="w-4 h-4" />
              Về trang chủ
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
