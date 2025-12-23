import { useState } from "react";
import { Plus, Edit, Trash2, Search, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  movies,
  theaters,
  showtimes as initialShowtimes,
  Showtime,
  getMovieById,
  getTheaterById,
} from "@/data/mockData";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function ShowtimeManagement() {
  const [showtimes, setShowtimes] = useState<Showtime[]>(initialShowtimes.slice(0, 50));
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingShowtime, setEditingShowtime] = useState<Showtime | null>(null);
  const [deletingShowtime, setDeletingShowtime] = useState<Showtime | null>(null);

  const [formData, setFormData] = useState({
    movieId: "",
    theaterId: "",
    screenId: "",
    date: "",
    time: "",
    price: "",
    priceVip: "",
  });

  const resetForm = () => {
    setFormData({
      movieId: "",
      theaterId: "",
      screenId: "",
      date: "",
      time: "",
      price: "",
      priceVip: "",
    });
  };

  const selectedTheater = theaters.find((t) => t.id === formData.theaterId);

  const openEditDialog = (showtime: Showtime) => {
    const dateTime = new Date(showtime.dateTime);
    setFormData({
      movieId: showtime.movieId,
      theaterId: showtime.theaterId,
      screenId: showtime.screenId,
      date: dateTime.toISOString().split("T")[0],
      time: dateTime.toTimeString().slice(0, 5),
      price: showtime.price.toString(),
      priceVip: showtime.priceVip.toString(),
    });
    setEditingShowtime(showtime);
  };

  const handleSubmit = () => {
    if (!formData.movieId || !formData.theaterId || !formData.screenId) {
      toast.error("Vui lòng chọn đầy đủ thông tin");
      return;
    }

    const showtimeData: Showtime = {
      id: editingShowtime?.id || `sht_${Date.now()}`,
      movieId: formData.movieId,
      theaterId: formData.theaterId,
      screenId: formData.screenId,
      dateTime: `${formData.date}T${formData.time}:00`,
      price: parseInt(formData.price) || 90000,
      priceVip: parseInt(formData.priceVip) || 120000,
      availableSeats: 100,
    };

    if (editingShowtime) {
      setShowtimes((prev) =>
        prev.map((s) => (s.id === editingShowtime.id ? showtimeData : s))
      );
      toast.success("Đã cập nhật suất chiếu");
      setEditingShowtime(null);
    } else {
      setShowtimes((prev) => [showtimeData, ...prev]);
      toast.success("Đã thêm suất chiếu mới");
      setIsAddOpen(false);
    }
    resetForm();
  };

  const handleDelete = () => {
    if (deletingShowtime) {
      setShowtimes((prev) => prev.filter((s) => s.id !== deletingShowtime.id));
      toast.success("Đã xóa suất chiếu");
      setDeletingShowtime(null);
    }
  };

  const filteredShowtimes = showtimes.filter((showtime) => {
    const movie = getMovieById(showtime.movieId);
    const theater = getTheaterById(showtime.theaterId);
    const searchLower = searchQuery.toLowerCase();
    return (
      movie?.title.toLowerCase().includes(searchLower) ||
      theater?.name.toLowerCase().includes(searchLower)
    );
  });

  const ShowtimeForm = () => (
    <div className="grid gap-4 py-4">
      <div className="space-y-2">
        <Label>Phim *</Label>
        <Select
          value={formData.movieId}
          onValueChange={(v) => setFormData({ ...formData, movieId: v })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Chọn phim" />
          </SelectTrigger>
          <SelectContent>
            {movies
              .filter((m) => m.status === "now_showing")
              .map((movie) => (
                <SelectItem key={movie.id} value={movie.id}>
                  {movie.title}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Rạp chiếu *</Label>
          <Select
            value={formData.theaterId}
            onValueChange={(v) =>
              setFormData({ ...formData, theaterId: v, screenId: "" })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Chọn rạp" />
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
        <div className="space-y-2">
          <Label>Phòng chiếu *</Label>
          <Select
            value={formData.screenId}
            onValueChange={(v) => setFormData({ ...formData, screenId: v })}
            disabled={!formData.theaterId}
          >
            <SelectTrigger>
              <SelectValue placeholder="Chọn phòng" />
            </SelectTrigger>
            <SelectContent>
              {selectedTheater?.screens.map((screen) => (
                <SelectItem key={screen.id} value={screen.id}>
                  {screen.name} ({screen.type})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Ngày chiếu *</Label>
          <Input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Giờ chiếu *</Label>
          <Input
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Giá vé thường (VNĐ)</Label>
          <Input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            placeholder="90000"
          />
        </div>
        <div className="space-y-2">
          <Label>Giá vé VIP (VNĐ)</Label>
          <Input
            type="number"
            value={formData.priceVip}
            onChange={(e) => setFormData({ ...formData, priceVip: e.target.value })}
            placeholder="120000"
          />
        </div>
      </div>

      <Button onClick={handleSubmit} className="w-full mt-4">
        {editingShowtime ? "Cập nhật suất chiếu" : "Thêm suất chiếu"}
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div>
          <h1 className="text-3xl font-bold">Quản lý lịch chiếu</h1>
          <p className="text-muted-foreground mt-1">Thêm, sửa, xóa suất chiếu</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" /> Thêm suất chiếu
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Thêm suất chiếu mới</DialogTitle>
            </DialogHeader>
            <ShowtimeForm />
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Tìm theo tên phim hoặc rạp..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Showtimes Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left py-4 px-4 font-medium text-muted-foreground">
                  Phim
                </th>
                <th className="text-left py-4 px-4 font-medium text-muted-foreground">
                  Rạp
                </th>
                <th className="text-left py-4 px-4 font-medium text-muted-foreground">
                  Phòng
                </th>
                <th className="text-left py-4 px-4 font-medium text-muted-foreground">
                  Ngày giờ
                </th>
                <th className="text-left py-4 px-4 font-medium text-muted-foreground">
                  Giá vé
                </th>
                <th className="text-right py-4 px-4 font-medium text-muted-foreground">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredShowtimes.slice(0, 20).map((showtime) => {
                const movie = getMovieById(showtime.movieId);
                const theater = getTheaterById(showtime.theaterId);
                const screen = theater?.screens.find((s) => s.id === showtime.screenId);
                const dateTime = new Date(showtime.dateTime);

                return (
                  <tr
                    key={showtime.id}
                    className="border-t border-border/50 hover:bg-muted/30"
                  >
                    <td className="py-4 px-4">
                      <p className="font-medium">{movie?.title || "N/A"}</p>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">
                      {theater?.name || "N/A"}
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 rounded bg-muted text-xs">
                        {screen?.name} - {screen?.type}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium">
                          {dateTime.toLocaleDateString("vi-VN")}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {dateTime.toLocaleTimeString("vi-VN", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p>{new Intl.NumberFormat("vi-VN").format(showtime.price)} VNĐ</p>
                        <p className="text-xs text-cinema-gold">
                          VIP: {new Intl.NumberFormat("vi-VN").format(showtime.priceVip)} VNĐ
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex justify-end gap-2">
                        <Dialog
                          open={editingShowtime?.id === showtime.id}
                          onOpenChange={(open) => !open && setEditingShowtime(null)}
                        >
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openEditDialog(showtime)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-lg">
                            <DialogHeader>
                              <DialogTitle>Chỉnh sửa suất chiếu</DialogTitle>
                            </DialogHeader>
                            <ShowtimeForm />
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeletingShowtime(showtime)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete confirmation */}
      <AlertDialog open={!!deletingShowtime} onOpenChange={() => setDeletingShowtime(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa suất chiếu</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa suất chiếu này? Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive">
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
