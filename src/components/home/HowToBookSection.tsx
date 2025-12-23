import { Link } from "react-router-dom";
import { Film, Armchair, CreditCard, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: Film,
    title: "1. Chọn phim & Rạp",
    description: "Tìm bộ phim yêu thích và rạp chiếu gần bạn nhất.",
  },
  {
    icon: Armchair,
    title: "2. Chọn ghế ngồi",
    description: "Lựa chọn vị trí ngồi lý tưởng trong phòng chiếu hiện đại.",
  },
  {
    icon: CreditCard,
    title: "3. Thanh toán & Nhận vé",
    description: "Thanh toán an toàn qua ví điện tử/thẻ và nhận vé QR code ngay lập tức.",
  },
];

export function HowToBookSection() {
  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                ĐẶT VÉ NHANH CHÓNG
                <span className="text-gradient-lime block">CHỈ VỚI 3 BƯỚC</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Trải nghiệm điện ảnh tuyệt vời chưa bao giờ dễ dàng đến thế. Đặt vé ngay trên website VietCinema.
              </p>
            </div>

            {/* Steps */}
            <div className="space-y-6 pt-4">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className="flex items-start gap-4 fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{step.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link to="/#now-showing">
              <Button variant="outline" size="lg" className="gap-2 mt-6">
                Bắt đầu đặt vé
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Right - Visual */}
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent rounded-full blur-3xl" />
            <div className="relative grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 overflow-hidden">
                  <img
                    src="https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg"
                    alt="Movie poster"
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-cinema-gold/20 to-cinema-gold/5 border border-cinema-gold/20 overflow-hidden">
                  <img
                    src="https://image.tmdb.org/t/p/w500/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg"
                    alt="Movie poster"
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
