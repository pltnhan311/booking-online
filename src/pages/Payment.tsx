import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, Smartphone, Building2, Shield } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { getMovieById, getTheaterById, getShowtimeById, formatPrice, formatTime } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface PendingBooking {
  movieId: string;
  theaterId: string;
  showtimeId: string;
  seats: string[];
  totalPrice: number;
}

const paymentMethods = [
  { id: "momo", name: "Ví MoMo", icon: Smartphone, color: "bg-pink-600" },
  { id: "vnpay", name: "VNPay", icon: CreditCard, color: "bg-blue-600" },
  { id: "card", name: "Thẻ ngân hàng", icon: Building2, color: "bg-emerald-600" },
];

export default function Payment() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [booking, setBooking] = useState<PendingBooking | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("momo");
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const pendingBooking = sessionStorage.getItem("pendingBooking");
    if (pendingBooking) {
      setBooking(JSON.parse(pendingBooking));
    } else {
      navigate("/");
    }
  }, [navigate]);

  if (!booking) return null;

  const movie = getMovieById(booking.movieId);
  const theater = getTheaterById(booking.theaterId);
  const showtime = getShowtimeById(booking.showtimeId);

  if (!movie || !theater || !showtime) {
    navigate("/");
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Vui lòng nhập họ tên");
      return false;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Vui lòng nhập email hợp lệ");
      return false;
    }
    if (!formData.phone.trim() || !/^0\d{9,10}$/.test(formData.phone)) {
      toast.error("Vui lòng nhập số điện thoại hợp lệ (10-11 số)");
      return false;
    }
    if (!agreed) {
      toast.error("Vui lòng đồng ý với điều khoản sử dụng");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate booking ID
    const bookingId = `VCN${Date.now().toString(36).toUpperCase()}`;

    // Store confirmed booking with all required fields
    const confirmedBooking = {
      id: bookingId,
      userId: user?.id || '',
      oderId: bookingId,
      movieId: booking.movieId,
      theaterId: booking.theaterId,
      showtimeId: booking.showtimeId,
      seats: booking.seats,
      totalPrice: booking.totalPrice,
      customerName: formData.name,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      paymentMethod,
      status: "confirmed" as const,
      createdAt: new Date().toISOString(),
    };

    // Save to localStorage
    const existingBookings = JSON.parse(localStorage.getItem("vietcinema_bookings") || "[]");
    localStorage.setItem("vietcinema_bookings", JSON.stringify([...existingBookings, confirmedBooking]));

    // Clear pending booking
    sessionStorage.removeItem("pendingBooking");

    setIsLoading(false);

    // Redirect to success page with booking ID
    navigate(`/payment/success?id=${bookingId}`);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b border-border bg-secondary/30">
          <div className="container py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="font-semibold text-foreground">Thanh toán</h1>
                <p className="text-sm text-muted-foreground">Hoàn tất đặt vé của bạn</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-6">
          <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8">
            {/* Main Form */}
            <div className="flex-1 space-y-6">
              {/* Customer Info */}
              <div className="bg-card rounded-xl border border-border p-6 space-y-4">
                <h2 className="font-semibold text-foreground">Thông tin khách hàng</h2>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Họ và tên *</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Nguyễn Văn A"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-background/50"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="email@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-background/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Số điện thoại *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="0901234567"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="bg-background/50"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-card rounded-xl border border-border p-6 space-y-4">
                <h2 className="font-semibold text-foreground">Phương thức thanh toán</h2>

                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="grid gap-3">
                    {paymentMethods.map((method) => (
                      <label
                        key={method.id}
                        className={cn(
                          "flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all",
                          paymentMethod === method.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <RadioGroupItem value={method.id} id={method.id} />
                        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", method.color)}>
                          <method.icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-medium text-foreground">{method.name}</span>
                      </label>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3">
                <Checkbox
                  id="terms"
                  checked={agreed}
                  onCheckedChange={(checked) => setAgreed(checked as boolean)}
                />
                <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                  Tôi đồng ý với{" "}
                  <a href="/terms" className="text-primary hover:underline">
                    Điều khoản sử dụng
                  </a>{" "}
                  và{" "}
                  <a href="/privacy" className="text-primary hover:underline">
                    Chính sách bảo mật
                  </a>{" "}
                  của VietCinema
                </label>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:w-96 shrink-0">
              <div className="sticky top-24 bg-card rounded-xl border border-border p-6 space-y-4">
                <h2 className="font-semibold text-foreground">Chi tiết đơn hàng</h2>

                {/* Movie Info */}
                <div className="flex gap-4">
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-20 h-28 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground line-clamp-2">{movie.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{movie.ageRating}</p>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3 pt-3 border-t border-border text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rạp</span>
                    <span className="text-foreground">{theater.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Suất chiếu</span>
                    <span className="text-foreground">{formatTime(showtime.dateTime)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ngày</span>
                    <span className="text-foreground">
                      {new Date(showtime.dateTime).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ghế</span>
                    <span className="text-foreground font-medium">
                      {booking.seats.sort().join(", ")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Số lượng</span>
                    <span className="text-foreground">{booking.seats.length} vé</span>
                  </div>
                </div>

                {/* Total */}
                <div className="pt-3 border-t border-border">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-foreground">Tổng cộng</span>
                    <span className="text-2xl font-bold text-primary">{formatPrice(booking.totalPrice)}</span>
                  </div>
                </div>

                {/* Security Note */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 rounded-lg p-3">
                  <Shield className="w-4 h-4 text-cinema-success" />
                  <span>Thanh toán được bảo mật bởi SSL 256-bit</span>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Đang xử lý..." : `Thanh toán ${formatPrice(booking.totalPrice)}`}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
