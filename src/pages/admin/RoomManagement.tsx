import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Monitor, Plus, Pencil, Trash2, ArrowLeft, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Theater, Screen, theaters as initialTheaters } from "@/data/mockData";

const STORAGE_KEY = "vietcinema_theaters";

const screenTypes = ["2D", "3D", "IMAX", "4DX"] as const;

export default function RoomManagement() {
    const [searchParams] = useSearchParams();
    const selectedTheaterId = searchParams.get("theater");

    const [theaterList, setTheaterList] = useState<Theater[]>([]);
    const [selectedTheater, setSelectedTheater] = useState<string>("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingScreen, setEditingScreen] = useState<Screen | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        totalSeats: "",
        type: "2D" as Screen["type"],
    });

    // Load theaters from localStorage
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            setTheaterList(JSON.parse(stored));
        } else {
            setTheaterList(initialTheaters);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(initialTheaters));
        }
    }, []);

    // Set selected theater from URL param
    useEffect(() => {
        if (selectedTheaterId && theaterList.length > 0) {
            setSelectedTheater(selectedTheaterId);
        } else if (theaterList.length > 0 && !selectedTheater) {
            setSelectedTheater(theaterList[0].id);
        }
    }, [selectedTheaterId, theaterList]);

    const currentTheater = theaterList.find((t) => t.id === selectedTheater);

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

    const handleOpenDialog = (screen?: Screen) => {
        if (screen) {
            setEditingScreen(screen);
            setFormData({
                name: screen.name,
                totalSeats: screen.totalSeats.toString(),
                type: screen.type,
            });
        } else {
            setEditingScreen(null);
            setFormData({ name: "", totalSeats: "", type: "2D" });
        }
        setIsDialogOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name.trim() || !formData.totalSeats) {
            toast.error("Vui lòng nhập đầy đủ thông tin");
            return;
        }

        const totalSeats = parseInt(formData.totalSeats);
        if (isNaN(totalSeats) || totalSeats <= 0) {
            toast.error("Số ghế phải là số dương");
            return;
        }

        const updated = theaterList.map((theater) => {
            if (theater.id !== selectedTheater) return theater;

            if (editingScreen) {
                // Update existing screen
                return {
                    ...theater,
                    screens: theater.screens.map((s) =>
                        s.id === editingScreen.id
                            ? { ...s, name: formData.name, totalSeats, type: formData.type }
                            : s
                    ),
                };
            } else {
                // Add new screen
                const newScreen: Screen = {
                    id: `scr_${Date.now()}`,
                    name: formData.name,
                    totalSeats,
                    type: formData.type,
                };
                return {
                    ...theater,
                    screens: [...theater.screens, newScreen],
                };
            }
        });

        saveToStorage(updated);
        toast.success(editingScreen ? "Đã cập nhật phòng chiếu" : "Đã thêm phòng chiếu mới");
        setIsDialogOpen(false);
    };

    const handleDelete = (screenId: string) => {
        const updated = theaterList.map((theater) => {
            if (theater.id !== selectedTheater) return theater;
            return {
                ...theater,
                screens: theater.screens.filter((s) => s.id !== screenId),
            };
        });
        saveToStorage(updated);
        toast.success("Đã xóa phòng chiếu");
    };

    const getTypeColor = (type: Screen["type"]) => {
        switch (type) {
            case "IMAX":
                return "bg-blue-600";
            case "4DX":
                return "bg-purple-600";
            case "3D":
                return "bg-green-600";
            default:
                return "bg-gray-600";
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link to="/admin/theaters">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">Quản lý phòng chiếu</h1>
                        <p className="text-muted-foreground">Quản lý các phòng chiếu trong rạp</p>
                    </div>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => handleOpenDialog()} disabled={!selectedTheater}>
                            <Plus className="w-4 h-4 mr-2" />
                            Thêm phòng
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <form onSubmit={handleSubmit}>
                            <DialogHeader>
                                <DialogTitle>
                                    {editingScreen ? "Chỉnh sửa phòng chiếu" : "Thêm phòng chiếu mới"}
                                </DialogTitle>
                                <DialogDescription>
                                    Nhập thông tin phòng chiếu
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Tên phòng *</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="Phòng 1"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="totalSeats">Số ghế *</Label>
                                        <Input
                                            id="totalSeats"
                                            name="totalSeats"
                                            type="number"
                                            placeholder="120"
                                            value={formData.totalSeats}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Loại phòng</Label>
                                        <Select
                                            value={formData.type}
                                            onValueChange={(value: Screen["type"]) =>
                                                setFormData((prev) => ({ ...prev, type: value }))
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {screenTypes.map((type) => (
                                                    <SelectItem key={type} value={type}>
                                                        {type}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">
                                    {editingScreen ? "Cập nhật" : "Thêm phòng"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Theater Selector */}
            <div className="flex items-center gap-4">
                <Label>Chọn rạp:</Label>
                <Select value={selectedTheater} onValueChange={setSelectedTheater}>
                    <SelectTrigger className="w-[300px]">
                        <SelectValue placeholder="Chọn rạp..." />
                    </SelectTrigger>
                    <SelectContent>
                        {theaterList.map((theater) => (
                            <SelectItem key={theater.id} value={theater.id}>
                                {theater.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Screen List */}
            {currentTheater ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {currentTheater.screens.map((screen) => (
                        <div
                            key={screen.id}
                            className="p-4 bg-card rounded-lg border border-border space-y-3"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <Monitor className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground">{screen.name}</h3>
                                        <Badge className={getTypeColor(screen.type)}>{screen.type}</Badge>
                                    </div>
                                </div>
                                <div className="flex gap-1">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleOpenDialog(screen)}
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
                                                <AlertDialogTitle>Xóa phòng chiếu?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Bạn có chắc chắn muốn xóa "{screen.name}"? Hành động này
                                                    không thể hoàn tác.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Hủy</AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={() => handleDelete(screen.id)}
                                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                >
                                                    Xóa
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Users className="w-4 h-4" />
                                <span>{screen.totalSeats} ghế</span>
                            </div>
                        </div>
                    ))}

                    {currentTheater.screens.length === 0 && (
                        <div className="col-span-full text-center py-12 text-muted-foreground">
                            Rạp này chưa có phòng chiếu nào. Hãy thêm phòng đầu tiên!
                        </div>
                    )}
                </div>
            ) : (
                <div className="text-center py-12 text-muted-foreground">
                    Vui lòng chọn một rạp để quản lý phòng chiếu
                </div>
            )}
        </div>
    );
}
