import { useState } from "react";
import { Plus, Edit, Trash2, Search, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { movies as initialMovies, Movie } from "@/data/mockData";
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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function MovieManagement() {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [deletingMovie, setDeletingMovie] = useState<Movie | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    titleEn: "",
    posterUrl: "",
    trailerUrl: "",
    genre: "",
    duration: "",
    releaseDate: "",
    director: "",
    cast: "",
    rating: "",
    ageRating: "P",
    language: "Tiếng Việt",
    description: "",
    status: "now_showing" as "now_showing" | "coming_soon",
  });

  const resetForm = () => {
    setFormData({
      title: "",
      titleEn: "",
      posterUrl: "",
      trailerUrl: "",
      genre: "",
      duration: "",
      releaseDate: "",
      director: "",
      cast: "",
      rating: "",
      ageRating: "P",
      language: "Tiếng Việt",
      description: "",
      status: "now_showing",
    });
  };

  const openEditDialog = (movie: Movie) => {
    setFormData({
      title: movie.title,
      titleEn: movie.titleEn,
      posterUrl: movie.posterUrl,
      trailerUrl: movie.trailerUrl,
      genre: movie.genre.join(", "),
      duration: movie.duration.toString(),
      releaseDate: movie.releaseDate,
      director: movie.director,
      cast: movie.cast.join(", "),
      rating: movie.rating.toString(),
      ageRating: movie.ageRating,
      language: movie.language,
      description: movie.description,
      status: movie.status,
    });
    setEditingMovie(movie);
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.titleEn) {
      toast.error("Vui lòng nhập tên phim");
      return;
    }

    const movieData: Movie = {
      id: editingMovie?.id || `mov_${Date.now()}`,
      title: formData.title,
      titleEn: formData.titleEn,
      posterUrl: formData.posterUrl || "https://via.placeholder.com/300x450",
      trailerUrl: formData.trailerUrl,
      genre: formData.genre.split(",").map((g) => g.trim()),
      duration: parseInt(formData.duration) || 120,
      releaseDate: formData.releaseDate,
      director: formData.director,
      cast: formData.cast.split(",").map((c) => c.trim()),
      rating: parseFloat(formData.rating) || 0,
      ageRating: formData.ageRating,
      language: formData.language,
      description: formData.description,
      status: formData.status,
    };

    if (editingMovie) {
      setMovies((prev) =>
        prev.map((m) => (m.id === editingMovie.id ? movieData : m))
      );
      toast.success("Đã cập nhật phim thành công");
      setEditingMovie(null);
    } else {
      setMovies((prev) => [movieData, ...prev]);
      toast.success("Đã thêm phim mới thành công");
      setIsAddOpen(false);
    }
    resetForm();
  };

  const handleDelete = () => {
    if (deletingMovie) {
      setMovies((prev) => prev.filter((m) => m.id !== deletingMovie.id));
      toast.success("Đã xóa phim thành công");
      setDeletingMovie(null);
    }
  };

  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.titleEn.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const MovieForm = () => (
    <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Tên phim (Việt) *</Label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Nhập tên phim tiếng Việt"
          />
        </div>
        <div className="space-y-2">
          <Label>Tên phim (Anh) *</Label>
          <Input
            value={formData.titleEn}
            onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
            placeholder="Nhập tên phim tiếng Anh"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>URL Poster</Label>
          <Input
            value={formData.posterUrl}
            onChange={(e) => setFormData({ ...formData, posterUrl: e.target.value })}
            placeholder="https://..."
          />
        </div>
        <div className="space-y-2">
          <Label>URL Trailer (YouTube Embed)</Label>
          <Input
            value={formData.trailerUrl}
            onChange={(e) => setFormData({ ...formData, trailerUrl: e.target.value })}
            placeholder="https://www.youtube.com/embed/..."
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Thể loại</Label>
          <Input
            value={formData.genre}
            onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
            placeholder="Hành động, Phiêu lưu"
          />
        </div>
        <div className="space-y-2">
          <Label>Thời lượng (phút)</Label>
          <Input
            type="number"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            placeholder="120"
          />
        </div>
        <div className="space-y-2">
          <Label>Ngày khởi chiếu</Label>
          <Input
            type="date"
            value={formData.releaseDate}
            onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Đạo diễn</Label>
          <Input
            value={formData.director}
            onChange={(e) => setFormData({ ...formData, director: e.target.value })}
            placeholder="Tên đạo diễn"
          />
        </div>
        <div className="space-y-2">
          <Label>Diễn viên</Label>
          <Input
            value={formData.cast}
            onChange={(e) => setFormData({ ...formData, cast: e.target.value })}
            placeholder="Diễn viên 1, Diễn viên 2"
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label>Điểm đánh giá</Label>
          <Input
            type="number"
            step="0.1"
            max="10"
            value={formData.rating}
            onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
            placeholder="8.5"
          />
        </div>
        <div className="space-y-2">
          <Label>Giới hạn tuổi</Label>
          <Select
            value={formData.ageRating}
            onValueChange={(v) => setFormData({ ...formData, ageRating: v })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="P">P - Mọi lứa tuổi</SelectItem>
              <SelectItem value="C13">C13 - Từ 13 tuổi</SelectItem>
              <SelectItem value="C16">C16 - Từ 16 tuổi</SelectItem>
              <SelectItem value="C18">C18 - Từ 18 tuổi</SelectItem>
              <SelectItem value="T16">T16</SelectItem>
              <SelectItem value="T18">T18</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Ngôn ngữ</Label>
          <Select
            value={formData.language}
            onValueChange={(v) => setFormData({ ...formData, language: v })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Tiếng Việt">Tiếng Việt</SelectItem>
              <SelectItem value="Lồng tiếng Việt">Lồng tiếng Việt</SelectItem>
              <SelectItem value="Tiếng Anh - Phụ đề Việt">Tiếng Anh - Phụ đề</SelectItem>
              <SelectItem value="Tiếng Hàn - Phụ đề Việt">Tiếng Hàn - Phụ đề</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Trạng thái</Label>
          <Select
            value={formData.status}
            onValueChange={(v) =>
              setFormData({ ...formData, status: v as "now_showing" | "coming_soon" })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="now_showing">Đang chiếu</SelectItem>
              <SelectItem value="coming_soon">Sắp chiếu</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Mô tả phim</Label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Nhập mô tả nội dung phim..."
          rows={4}
        />
      </div>

      <Button onClick={handleSubmit} className="w-full mt-4">
        {editingMovie ? "Cập nhật phim" : "Thêm phim mới"}
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div>
          <h1 className="text-3xl font-bold">Quản lý phim</h1>
          <p className="text-muted-foreground mt-1">
            Thêm, sửa, xóa phim trong hệ thống
          </p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" /> Thêm phim mới
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Thêm phim mới</DialogTitle>
            </DialogHeader>
            <MovieForm />
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Tìm kiếm phim..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Movies Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left py-4 px-4 font-medium text-muted-foreground">
                  Phim
                </th>
                <th className="text-left py-4 px-4 font-medium text-muted-foreground">
                  Thể loại
                </th>
                <th className="text-left py-4 px-4 font-medium text-muted-foreground">
                  Thời lượng
                </th>
                <th className="text-left py-4 px-4 font-medium text-muted-foreground">
                  Trạng thái
                </th>
                <th className="text-left py-4 px-4 font-medium text-muted-foreground">
                  Đánh giá
                </th>
                <th className="text-right py-4 px-4 font-medium text-muted-foreground">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredMovies.map((movie) => (
                <tr key={movie.id} className="border-t border-border/50 hover:bg-muted/30">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={movie.posterUrl}
                        alt={movie.title}
                        className="w-12 h-16 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium">{movie.title}</p>
                        <p className="text-xs text-muted-foreground">{movie.titleEn}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-muted-foreground">
                    {movie.genre.slice(0, 2).join(", ")}
                  </td>
                  <td className="py-4 px-4">{movie.duration} phút</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        movie.status === "now_showing"
                          ? "bg-cinema-success/20 text-cinema-success"
                          : "bg-cinema-warning/20 text-cinema-warning"
                      }`}
                    >
                      {movie.status === "now_showing" ? "Đang chiếu" : "Sắp chiếu"}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1">
                      <span className="text-cinema-gold">★</span>
                      <span>{movie.rating}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex justify-end gap-2">
                      <Dialog
                        open={editingMovie?.id === movie.id}
                        onOpenChange={(open) => !open && setEditingMovie(null)}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditDialog(movie)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Chỉnh sửa phim</DialogTitle>
                          </DialogHeader>
                          <MovieForm />
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeletingMovie(movie)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete confirmation */}
      <AlertDialog open={!!deletingMovie} onOpenChange={() => setDeletingMovie(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa phim</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa phim "{deletingMovie?.title}"? Hành động này
              không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive">
              Xóa phim
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
