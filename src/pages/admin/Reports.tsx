import { useState } from "react";
import { Calendar, TrendingUp, Film, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Mock data for reports
const monthlyRevenue = [
  { month: "T1", revenue: 450000000, tickets: 3200 },
  { month: "T2", revenue: 520000000, tickets: 3800 },
  { month: "T3", revenue: 680000000, tickets: 4500 },
  { month: "T4", revenue: 590000000, tickets: 4100 },
  { month: "T5", revenue: 720000000, tickets: 5200 },
  { month: "T6", revenue: 850000000, tickets: 6100 },
];

const genreDistribution = [
  { name: "Hành động", value: 35, color: "hsl(76, 90%, 50%)" },
  { name: "Hài", value: 25, color: "hsl(45, 100%, 50%)" },
  { name: "Kinh dị", value: 15, color: "hsl(0, 72%, 51%)" },
  { name: "Tình cảm", value: 15, color: "hsl(280, 70%, 50%)" },
  { name: "Khác", value: 10, color: "hsl(0, 0%, 50%)" },
];

const theaterPerformance = [
  { name: "Vincom Center", revenue: 280000000, tickets: 2100 },
  { name: "Landmark 81", revenue: 320000000, tickets: 2400 },
  { name: "Aeon Tân Phú", revenue: 180000000, tickets: 1350 },
  { name: "Times City HN", revenue: 250000000, tickets: 1900 },
  { name: "Royal City", revenue: 150000000, tickets: 1100 },
];

const dailyTickets = [
  { day: "CN", morning: 120, afternoon: 280, evening: 420 },
  { day: "T2", morning: 80, afternoon: 150, evening: 220 },
  { day: "T3", morning: 90, afternoon: 160, evening: 240 },
  { day: "T4", morning: 85, afternoon: 170, evening: 260 },
  { day: "T5", morning: 100, afternoon: 200, evening: 320 },
  { day: "T6", morning: 150, afternoon: 280, evening: 450 },
  { day: "T7", morning: 180, afternoon: 350, evening: 520 },
];

export default function Reports() {
  const [timeRange, setTimeRange] = useState("6months");

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div>
          <h1 className="text-3xl font-bold">Báo cáo & Thống kê</h1>
          <p className="text-muted-foreground mt-1">
            Phân tích doanh thu và hiệu suất hoạt động
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">7 ngày qua</SelectItem>
              <SelectItem value="30days">30 ngày qua</SelectItem>
              <SelectItem value="6months">6 tháng qua</SelectItem>
              <SelectItem value="1year">1 năm qua</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="bg-card border border-border rounded-xl p-5">
          <p className="text-sm text-muted-foreground">Tổng doanh thu</p>
          <p className="text-2xl font-bold mt-1 text-primary">
            {formatCurrency(3810000000)}
          </p>
          <p className="text-xs text-cinema-success mt-2">+18% so với kỳ trước</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <p className="text-sm text-muted-foreground">Tổng vé bán</p>
          <p className="text-2xl font-bold mt-1">26,900</p>
          <p className="text-xs text-cinema-success mt-2">+12% so với kỳ trước</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <p className="text-sm text-muted-foreground">Giá vé trung bình</p>
          <p className="text-2xl font-bold mt-1">141,600 VNĐ</p>
          <p className="text-xs text-muted-foreground mt-2">Ổn định</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <p className="text-sm text-muted-foreground">Tỷ lệ lấp đầy</p>
          <p className="text-2xl font-bold mt-1">72%</p>
          <p className="text-xs text-cinema-success mt-2">+5% so với kỳ trước</p>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Trend */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Xu hướng doanh thu</h3>
              <p className="text-sm text-muted-foreground">
                Doanh thu và số vé theo tháng
              </p>
            </div>
            <TrendingUp className="h-5 w-5 text-cinema-success" />
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyRevenue}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(76, 90%, 50%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(76, 90%, 50%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 20%)" />
                <XAxis dataKey="month" stroke="hsl(0, 0%, 65%)" />
                <YAxis
                  stroke="hsl(0, 0%, 65%)"
                  tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0, 0%, 12%)",
                    border: "1px solid hsl(0, 0%, 20%)",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number, name: string) => [
                    name === "revenue" ? formatCurrency(value) : value + " vé",
                    name === "revenue" ? "Doanh thu" : "Số vé",
                  ]}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  name="Doanh thu"
                  stroke="hsl(76, 90%, 50%)"
                  fillOpacity={1}
                  fill="url(#colorRev)"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="tickets"
                  name="Số vé"
                  stroke="hsl(45, 100%, 50%)"
                  strokeWidth={2}
                  dot={{ fill: "hsl(45, 100%, 50%)" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Genre Distribution */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Phân bố thể loại</h3>
              <p className="text-sm text-muted-foreground">Tỷ lệ vé theo thể loại phim</p>
            </div>
            <Film className="h-5 w-5 text-primary" />
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genreDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                >
                  {genreDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0, 0%, 12%)",
                    border: "1px solid hsl(0, 0%, 20%)",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => [`${value}%`, "Tỷ lệ"]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Theater Performance */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Hiệu suất theo rạp</h3>
              <p className="text-sm text-muted-foreground">So sánh doanh thu các rạp</p>
            </div>
            <MapPin className="h-5 w-5 text-cinema-warning" />
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={theaterPerformance} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 20%)" />
                <XAxis
                  type="number"
                  stroke="hsl(0, 0%, 65%)"
                  tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`}
                />
                <YAxis
                  dataKey="name"
                  type="category"
                  stroke="hsl(0, 0%, 65%)"
                  width={110}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0, 0%, 12%)",
                    border: "1px solid hsl(0, 0%, 20%)",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => [formatCurrency(value), "Doanh thu"]}
                />
                <Bar dataKey="revenue" fill="hsl(76, 90%, 50%)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Daily Distribution */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Phân bố theo khung giờ</h3>
              <p className="text-sm text-muted-foreground">Số vé theo ngày và khung giờ</p>
            </div>
            <Calendar className="h-5 w-5 text-primary" />
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyTickets}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 20%)" />
                <XAxis dataKey="day" stroke="hsl(0, 0%, 65%)" />
                <YAxis stroke="hsl(0, 0%, 65%)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0, 0%, 12%)",
                    border: "1px solid hsl(0, 0%, 20%)",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="morning" name="Sáng" fill="hsl(200, 70%, 50%)" stackId="a" />
                <Bar
                  dataKey="afternoon"
                  name="Chiều"
                  fill="hsl(45, 100%, 50%)"
                  stackId="a"
                />
                <Bar
                  dataKey="evening"
                  name="Tối"
                  fill="hsl(76, 90%, 50%)"
                  stackId="a"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
