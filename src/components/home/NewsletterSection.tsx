import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock submission
    setTimeout(() => {
      toast.success("Đăng ký thành công!", {
        description: "Bạn sẽ nhận được thông tin ưu đãi mới nhất từ VietCinema.",
      });
      setEmail("");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <div className="relative overflow-hidden rounded-2xl border-2 border-primary bg-gradient-to-r from-primary/10 via-background to-primary/5 p-8 md:p-12">
          {/* Glow Effect */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 space-y-3 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                ĐĂNG KÝ THÀNH VIÊN
              </h3>
              <p className="text-muted-foreground">
                Nhận ngay ưu đãi <span className="text-primary font-semibold">giảm 15%</span> cho vé đầu tiên và tích điểm đổi quà.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="w-full md:w-auto flex gap-3">
              <div className="relative flex-1 md:w-80">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Email của bạn..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 bg-background/50 border-border"
                  required
                />
              </div>
              <Button type="submit" variant="hero" size="lg" disabled={isLoading}>
                {isLoading ? "Đang gửi..." : "Đăng ký ngay"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
