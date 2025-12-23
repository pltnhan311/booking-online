import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Building2, Plus, Pencil, Trash2, MapPin, Monitor, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
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
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Theater, theaters as initialTheaters } from "@/data/mockData";

const STORAGE_KEY = "vietcinema_theaters";

export default function TheaterManagement() {
    const [theaterList, setTheaterList] = useState<Theater[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingTheater, setEditingTheater] = useState<Theater | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        city: "",
        district: "",
    });

    // Load theaters from localStorage or use initial data
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            setTheaterList(JSON.parse(stored));
        } else {
            setTheaterList(initialTheaters);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(initialTheaters));
        }
    }, []);

    const saveToStorage = (theaters: Theater[]) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(theaters));
        setTheaterList(theaters);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleOpenDialog = (theater?: Theater) => {
        if (theater) {
            setEditingTheater(theater);
            setFormData({
                name: theater.name,
                address: theater.location.address,
                city: theater.location.city,
                district: theater.location.district,
            });
        } else {
            setEditingTheater(null);
            setFormData({ name: "", address: "", city: "", district: "" });
        }
        setIsDialogOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name.trim() || !formData.address.trim()) {
            toast.error("Vui lòng nhập tên và địa chỉ rạp");
            return;
        }

        if (editingTheater) {
            // Update existing theater
            const updated = theaterList.map((t) =>
                t.id === editingTheater.id
                    ? {
                        ...t,
                        name: formData.name,
                        location: {
                            address: formData.address,
                            city: formData.city,
                            district: formData.district,
                        },
                    }
                    : t
            );
            saveToStorage(updated);
            toast.success("Đã cập nhật rạp chiếu");
        } else {
            // Add new theater
            const newTheater: Theater = {
                id: `tht_${Date.now()}`,
                name: formData.name,
                location: {
                    address: formData.address,
                    city: formData.city,
                    district: formData.district,
                },
                screens: [],
            };
            saveToStorage([...theaterList, newTheater]);
            toast.success("Đã thêm rạp chiếu mới");
        }
        setIsDialogOpen(false);
    };

    const handleDelete = (theaterId: string) => {
        const updated = theaterList.filter((t) => t.id !== theaterId);
        saveToStorage(updated);
        toast.success("Đã xóa rạp chiếu");
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Quản lý rạp chiếu</h1>
                    <p className="text-muted-foreground">Quản lý hệ thống rạp chiếu phim</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => handleOpenDialog()}>
                            <Plus className="w-4 h-4 mr-2" />
                            Thêm rạp
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <form onSubmit={handleSubmit}>
                            <DialogHeader>
                                <DialogTitle>
                                    {editingTheater ? "Chỉnh sửa rạp" : "Thêm rạp mới"}
                                </DialogTitle>
                                <DialogDescription>
                                    Nhập thông tin rạp chiếu phim
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Tên rạp *</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="VietCinema ..."
                                        value={formData.name}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="address">Địa chỉ *</Label>
                                    <Input
                                        id="address"
                                        name="address"
                                        placeholder="Số nhà, đường..."
                                        value={formData.address}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="district">Quận/Huyện</Label>
                                        <Input
                                            id="district"
                                            name="district"
                                            placeholder="Quận 1"
                                            value={formData.district}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="city">Thành phố</Label>
                                        <Input
                                            id="city"
                                            name="city"
                                            placeholder="TP. Hồ Chí Minh"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">
                                    {editingTheater ? "Cập nhật" : "Thêm rạp"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Theater List */}
            <div className="grid gap-4">
                {theaterList.map((theater) => (
                    <div
                        key={theater.id}
                        className="flex items-center justify-between p-4 bg-card rounded-lg border border-border"
                    >
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Building2 className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">{theater.name}</h3>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                                    <MapPin className="w-3 h-3" />
                                    <span>
                                        {theater.location.address}, {theater.location.district},{" "}
                                        {theater.location.city}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                                    <Monitor className="w-3 h-3" />
                                    <span>{theater.screens.length} phòng chiếu</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Link to={`/admin/rooms?theater=${theater.id}`}>
                                <Button variant="outline" size="sm">
                                    Phòng chiếu
                                    <ArrowRight className="w-4 h-4 ml-1" />
                                </Button>
                            </Link>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleOpenDialog(theater)}
                            >
                                <Pencil className="w-4 h-4" />
                            </Button>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="icon" className="text-destructive">
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Xóa rạp chiếu?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Bạn có chắc chắn muốn xóa rạp "{theater.name}"? Hành động này
                                            không thể hoàn tác.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={() => handleDelete(theater.id)}
                                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                        >
                                            Xóa
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </div>
                ))}

                {theaterList.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                        Chưa có rạp chiếu nào. Hãy thêm rạp đầu tiên!
                    </div>
                )}
            </div>
        </div>
    );
}
