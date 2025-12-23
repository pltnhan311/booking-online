import { useState } from "react";
import { Search, Shield, ShieldCheck, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockUsers, User } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Navigate } from "react-router-dom";

export default function UserManagement() {
  const { user: currentUser, hasRole } = useAuth();
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState("");

  // Only superadmin can access this page
  if (!hasRole(["superadmin"])) {
    return <Navigate to="/admin" replace />;
  }

  const handleRoleChange = (userId: string, newRole: User["role"]) => {
    // Prevent changing own role
    if (userId === currentUser?.id) {
      toast.error("Không thể thay đổi vai trò của chính mình");
      return;
    }

    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
    toast.success("Đã cập nhật vai trò người dùng");
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRoleIcon = (role: User["role"]) => {
    switch (role) {
      case "superadmin":
        return <ShieldCheck className="h-4 w-4 text-cinema-gold" />;
      case "admin":
        return <Shield className="h-4 w-4 text-primary" />;
      default:
        return <UserIcon className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getRoleBadgeClass = (role: User["role"]) => {
    switch (role) {
      case "superadmin":
        return "bg-cinema-gold/20 text-cinema-gold";
      case "admin":
        return "bg-primary/20 text-primary";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Quản lý người dùng</h1>
        <p className="text-muted-foreground mt-1">
          Xem và phân quyền người dùng (chỉ Superadmin)
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Tìm kiếm theo tên hoặc email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-2">
            <UserIcon className="h-5 w-5 text-muted-foreground" />
            <span className="text-muted-foreground">Người dùng</span>
          </div>
          <p className="text-2xl font-bold mt-2">
            {users.filter((u) => u.role === "user").length}
          </p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="text-muted-foreground">Admin</span>
          </div>
          <p className="text-2xl font-bold mt-2">
            {users.filter((u) => u.role === "admin").length}
          </p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-cinema-gold" />
            <span className="text-muted-foreground">Superadmin</span>
          </div>
          <p className="text-2xl font-bold mt-2">
            {users.filter((u) => u.role === "superadmin").length}
          </p>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left py-4 px-4 font-medium text-muted-foreground">
                  Người dùng
                </th>
                <th className="text-left py-4 px-4 font-medium text-muted-foreground">
                  Email
                </th>
                <th className="text-left py-4 px-4 font-medium text-muted-foreground">
                  Số điện thoại
                </th>
                <th className="text-left py-4 px-4 font-medium text-muted-foreground">
                  Vai trò
                </th>
                <th className="text-right py-4 px-4 font-medium text-muted-foreground">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-t border-border/50 hover:bg-muted/30"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                        {getRoleIcon(user.role)}
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">ID: {user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-muted-foreground">{user.email}</td>
                  <td className="py-4 px-4">{user.phone || "—"}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getRoleBadgeClass(
                        user.role
                      )}`}
                    >
                      {user.role === "superadmin"
                        ? "Super Admin"
                        : user.role === "admin"
                        ? "Admin"
                        : "Người dùng"}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex justify-end">
                      <Select
                        value={user.role}
                        onValueChange={(v) =>
                          handleRoleChange(user.id, v as User["role"])
                        }
                        disabled={user.id === currentUser?.id}
                      >
                        <SelectTrigger className="w-[140px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">Người dùng</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="superadmin">Super Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
