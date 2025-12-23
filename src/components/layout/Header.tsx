import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Search, User, Ticket, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Trang chủ" },
  { href: "/#now-showing", label: "Phim đang chiếu" },
  { href: "/my-tickets", label: "Vé của tôi" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, hasRole } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-primary rounded-lg flex items-center justify-center">
              <Ticket className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
            </div>
            <span className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              Viet<span className="text-primary">Cinema</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} to={link.href} className={cn("text-sm font-medium transition-colors hover:text-primary", location.pathname === link.href ? "text-primary" : "text-muted-foreground")}>
                {link.label}
              </Link>
            ))}
            {hasRole(['admin', 'superadmin']) && (
              <Link to="/admin" className="text-sm font-medium text-cinema-gold hover:text-cinema-gold/80 transition-colors">Admin</Link>
            )}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-muted-foreground"><Search className="w-5 h-5" /></Button>
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <User className="w-4 h-4" />
                    {user?.name?.split(' ').pop()}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => navigate("/my-tickets")}><Ticket className="w-4 h-4 mr-2" />Vé của tôi</DropdownMenuItem>
                  {hasRole(['admin', 'superadmin']) && <DropdownMenuItem onClick={() => navigate("/admin")}><Settings className="w-4 h-4 mr-2" />Admin Panel</DropdownMenuItem>}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive"><LogOut className="w-4 h-4 mr-2" />Đăng xuất</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login"><Button variant="outline" className="gap-2"><User className="w-4 h-4" />Đăng nhập</Button></Link>
            )}
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-foreground">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link key={link.href} to={link.href} onClick={() => setIsMenuOpen(false)} className={cn("px-4 py-2 rounded-lg transition-colors", location.pathname === link.href ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted")}>{link.label}</Link>
              ))}
              {isAuthenticated ? (
                <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="px-4 py-2 text-left rounded-lg text-destructive hover:bg-destructive/10">Đăng xuất</button>
              ) : (
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-center">Đăng nhập</Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
