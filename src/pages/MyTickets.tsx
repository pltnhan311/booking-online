import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Ticket, Calendar, MapPin, Clock, QrCode, Armchair, Film, X, Loader2 } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { getMovieById, getTheaterById, getShowtimeById, formatPrice, formatTime, Booking } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export default function MyTickets() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("vietcinema_bookings") || "[]");
    // Filter by current user's ID and exclude cancelled bookings
    setBookings(storedBookings.filter((b: Booking) =>
      b.status !== 'cancelled' && b.userId === user?.id
    ));
  }, [user?.id]);

  const now = new Date();

  const upcomingBookings = bookings.filter((b) => {
    const showtime = getShowtimeById(b.showtimeId);
    return showtime && new Date(showtime.dateTime) > now;
  });

  const pastBookings = bookings.filter((b) => {
    const showtime = getShowtimeById(b.showtimeId);
    return showtime && new Date(showtime.dateTime) <= now;
  });

  const handleCancelBooking = async (bookingId: string) => {
    setCancellingId(bookingId);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const storedBookings = JSON.parse(localStorage.getItem("vietcinema_bookings") || "[]");
    const updated = storedBookings.map((b: Booking) =>
      b.id === bookingId ? { ...b, status: 'cancelled' } : b
    );
    localStorage.setItem("vietcinema_bookings", JSON.stringify(updated));

    setBookings(prev => prev.filter(b => b.id !== bookingId));
    setCancellingId(null);
    toast.success("Đã hủy vé thành công");
  };

  const EmptyState = () => (
    <div className="text-center py-16">
      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
        <Ticket className="w-10 h-10 text-muted-foreground" />
      </div>
      <h2 className="text-xl font-semibold text-foreground mb-2">Chưa có vé nào</h2>
      <p className="text-muted-foreground mb-6">
        {isAuthenticated
          ? "Bạn chưa đặt vé xem phim nào. Hãy khám phá các bộ phim đang chiếu!"
          : "Đăng nhập để xem và quản lý vé của bạn"
        }
      </p>
      <Link to={isAuthenticated ? "/" : "/login"}>
        <Button variant="hero" className="gap-2">
          <Film className="w-4 h-4" />
          {isAuthenticated ? "Đặt vé ngay" : "Đăng nhập"}
        </Button>
      </Link>
    </div>
  );

  const TicketCard = ({ booking }: { booking: Booking }) => {
    const movie = getMovieById(booking.movieId);
    const theater = getTheaterById(booking.theaterId);
    const showtime = getShowtimeById(booking.showtimeId);

    if (!movie || !theater || !showtime) return null;

    const isPast = new Date(showtime.dateTime) <= now;

    const qrData = JSON.stringify({
      bookingId: booking.id,
      movie: movie.title,
      theater: theater.name,
      showtime: showtime.dateTime,
      seats: booking.seats,
      total: booking.totalPrice,
    });

    return (
      <div className="bg-card border border-border rounded-xl overflow-hidden transition-all hover:border-primary/50">
        <div className="flex flex-col md:flex-row">
          {/* Poster */}
          <div className="md:w-32 shrink-0">
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-full h-40 md:h-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex-1 p-4 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-foreground">{movie.title}</h3>
                <Badge variant={isPast ? "secondary" : "default"} className="mt-1">
                  {isPast ? "Đã qua" : "Sắp chiếu"}
                </Badge>
              </div>
              <span className="text-xs text-muted-foreground font-mono">#{booking.id}</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span className="truncate">{theater.name}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>{new Date(showtime.dateTime).toLocaleDateString("vi-VN")}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{formatTime(showtime.dateTime)}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Armchair className="w-4 h-4" />
                <span>{booking.seats.sort().join(", ")}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border">
              <span className="font-semibold text-primary">{formatPrice(booking.totalPrice)}</span>

              <div className="flex gap-2">
                {/* Cancel Button - Only for upcoming tickets */}
                {!isPast && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        disabled={cancellingId === booking.id}
                      >
                        {cancellingId === booking.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <X className="w-4 h-4" />
                        )}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Hủy vé xem phim?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Bạn có chắc chắn muốn hủy vé này không? Hành động này không thể hoàn tác.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Không</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleCancelBooking(booking.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Hủy vé
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}

                {/* QR Code Dialog */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <QrCode className="w-4 h-4" />
                      Xem QR
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-sm">
                    <DialogHeader>
                      <DialogTitle>Mã QR vé của bạn</DialogTitle>
                      <DialogDescription>
                        Đưa mã này cho nhân viên để nhận vé
                      </DialogDescription>
                    </DialogHeader>
                    <div className="text-center space-y-4">
                      <div className="bg-white p-4 rounded-lg inline-block mx-auto">
                        <QRCodeSVG
                          value={qrData}
                          size={180}
                          level="H"
                          bgColor="#ffffff"
                          fgColor="#000000"
                        />
                      </div>
                      <div className="space-y-1">
                        <p className="font-mono text-lg font-bold text-foreground">{booking.id}</p>
                      </div>
                      <div className="text-left text-sm space-y-2 p-4 bg-muted/50 rounded-lg">
                        <p><strong>Phim:</strong> {movie.title}</p>
                        <p><strong>Rạp:</strong> {theater.name}</p>
                        <p><strong>Suất:</strong> {formatTime(showtime.dateTime)} - {new Date(showtime.dateTime).toLocaleDateString("vi-VN")}</p>
                        <p><strong>Ghế:</strong> {booking.seats.sort().join(", ")}</p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Vé của tôi</h1>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="upcoming">
                Sắp chiếu ({upcomingBookings.length})
              </TabsTrigger>
              <TabsTrigger value="past">
                Đã qua ({pastBookings.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming">
              {upcomingBookings.length > 0 ? (
                <div className="grid gap-4">
                  {upcomingBookings.map((booking) => (
                    <TicketCard key={booking.id} booking={booking} />
                  ))}
                </div>
              ) : (
                <EmptyState />
              )}
            </TabsContent>

            <TabsContent value="past">
              {pastBookings.length > 0 ? (
                <div className="grid gap-4">
                  {pastBookings.map((booking) => (
                    <TicketCard key={booking.id} booking={booking} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 text-muted-foreground">
                  Chưa có vé nào trong lịch sử
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
