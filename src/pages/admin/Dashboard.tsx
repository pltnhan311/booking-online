import { Film, Users, Ticket, DollarSign, TrendingUp, Calendar } from "lucide-react";
import { StatsCard } from "@/components/admin/StatsCard";
import { movies, theaters, showtimes } from "@/data/mockData";
import { useBooking } from "@/contexts/BookingContext";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

// Mock revenue data for last 7 days
const revenueData = [
  { date: "T2", revenue: 45000000, tickets: 320 },
  { date: "T3", revenue: 38000000, tickets: 280 },
  { date: "T4", revenue: 52000000, tickets: 410 },
  { date: "T5", revenue: 61000000, tickets: 485 },
  { date: "T6", revenue: 78000000, tickets: 620 },
  { date: "T7", revenue: 95000000, tickets: 780 },
  { date: "CN", revenue: 89000000, tickets: 720 },
];

// Mock movie performance data
const moviePerformance = [
  { name: "Dune 2", tickets: 1250 },
  { name: "Mai", tickets: 980 },
  { name: "Kung Fu Panda 4", tickets: 875 },
  { name: "Godzilla x Kong", tickets: 720 },
  { name: "Exhuma", tickets: 650 },
];

export default function AdminDashboard() {
  const { bookings } = useBooking();
  const confirmedBookings = bookings.filter((b) => b.status === "confirmed");
  const totalRevenue = confirmedBookings.reduce((sum, b) => sum + b.totalPrice, 0);

  const stats = [
    {
      title: "Tổng phim",
      value: movies.length,
      change: "+2 phim mới",
      changeType: "positive" as const,
      icon: Film,
      iconColor: "text-primary",
    },
    {
      title: "Tổng rạp",
      value: theaters.length,
      icon: Calendar,
      iconColor: "text-cinema-warning",
    },
    {
      title: "Suất chiếu hôm nay",
      value: showtimes.filter(
        (s) => new Date(s.dateTime).toDateString() === new Date().toDateString()
      ).length,
      change: "Đang hoạt động",
      changeType: "positive" as const,
      icon: Ticket,
      iconColor: "text-cinema-success",
    },
    {
      title: "Doanh thu (demo)",
      value: new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        maximumFractionDigits: 0,
      }).format(totalRevenue || 458000000),
      change: "+12% so với tuần trước",
      changeType: "positive" as const,
      icon: DollarSign,
      iconColor: "text-cinema-gold",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Tổng quan hoạt động hệ thống VietCinema
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Chart */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Doanh thu tuần này</h3>
              <p className="text-sm text-muted-foreground">
                Tổng doanh thu 7 ngày gần nhất
              </p>
            </div>
            <TrendingUp className="h-5 w-5 text-cinema-success" />
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(76, 90%, 50%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(76, 90%, 50%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 20%)" />
                <XAxis dataKey="date" stroke="hsl(0, 0%, 65%)" />
                <YAxis
                  stroke="hsl(0, 0%, 65%)"
                  tickFormatter={(value) =>
                    `${(value / 1000000).toFixed(0)}M`
                  }
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0, 0%, 12%)",
                    border: "1px solid hsl(0, 0%, 20%)",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => [
                    new Intl.NumberFormat("vi-VN").format(value) + " VNĐ",
                    "Doanh thu",
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(76, 90%, 50%)"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Movies Chart */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Phim bán chạy nhất</h3>
              <p className="text-sm text-muted-foreground">Top 5 phim theo số vé</p>
            </div>
            <Film className="h-5 w-5 text-primary" />
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={moviePerformance} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 20%)" />
                <XAxis type="number" stroke="hsl(0, 0%, 65%)" />
                <YAxis
                  dataKey="name"
                  type="category"
                  stroke="hsl(0, 0%, 65%)"
                  width={100}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0, 0%, 12%)",
                    border: "1px solid hsl(0, 0%, 20%)",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => [value + " vé", "Số vé"]}
                />
                <Bar dataKey="tickets" fill="hsl(76, 90%, 50%)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Đặt vé gần đây</h3>
        {confirmedBookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Mã đơn
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Khách hàng
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Ghế
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Tổng tiền
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Trạng thái
                  </th>
                </tr>
              </thead>
              <tbody>
                {confirmedBookings.slice(0, 5).map((booking) => (
                  <tr key={booking.id} className="border-b border-border/50">
                    <td className="py-3 px-4 font-mono text-xs">{booking.oderId}</td>
                    <td className="py-3 px-4">{booking.customerName}</td>
                    <td className="py-3 px-4">{booking.seats.join(", ")}</td>
                    <td className="py-3 px-4">
                      {new Intl.NumberFormat("vi-VN").format(booking.totalPrice)} VNĐ
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 rounded-full text-xs bg-cinema-success/20 text-cinema-success">
                        Đã xác nhận
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-8">
            Chưa có đơn đặt vé nào
          </p>
        )}
      </div>
    </div>
  );
}
