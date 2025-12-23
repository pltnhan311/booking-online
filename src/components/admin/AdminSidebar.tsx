import { NavLink as RouterNavLink, useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Film,
  Calendar,
  Users,
  BarChart3,
  Settings,
  ChevronLeft,
  Menu,
  Home,
  Building2,
  Monitor,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Phim", url: "/admin/movies", icon: Film },
  { title: "Lịch chiếu", url: "/admin/showtimes", icon: Calendar },
  { title: "Rạp chiếu", url: "/admin/theaters", icon: Building2 },
  { title: "Phòng chiếu", url: "/admin/rooms", icon: Monitor },
  { title: "Người dùng", url: "/admin/users", icon: Users, roles: ["superadmin"] },
  { title: "Báo cáo", url: "/admin/reports", icon: BarChart3 },
  { title: "Cài đặt", url: "/admin/settings", icon: Settings },
];

export function AdminSidebar({ collapsed, onToggle }: AdminSidebarProps) {
  const location = useLocation();
  const { user, hasRole } = useAuth();

  const filteredNavItems = navItems.filter(
    (item) => !item.roles || hasRole(item.roles as ("admin" | "superadmin")[])
  );

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
        {!collapsed && (
          <span className="text-lg font-bold text-primary">VietCinema</span>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {collapsed ? <Menu className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 p-2 mt-4">
        {filteredNavItems.map((item) => {
          const isActive = location.pathname === item.url ||
            (item.url !== "/admin" && location.pathname.startsWith(item.url));

          return (
            <RouterNavLink
              key={item.title}
              to={item.url}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.title}</span>}
            </RouterNavLink>
          );
        })}
      </nav>

      {/* Home Link */}
      <div className="px-2 mt-4">
        <Link
          to="/"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
            "text-sidebar-foreground hover:bg-sidebar-accent border border-dashed border-sidebar-border"
          )}
        >
          <Home className="h-5 w-5 shrink-0" />
          {!collapsed && <span>Về trang chủ</span>}
        </Link>
      </div>

      {/* User info */}
      {!collapsed && user && (
        <div className="absolute bottom-4 left-4 right-4 p-3 bg-sidebar-accent rounded-lg">
          <p className="text-sm font-medium text-sidebar-foreground truncate">
            {user.name}
          </p>
          <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
        </div>
      )}
    </aside>
  );
}
