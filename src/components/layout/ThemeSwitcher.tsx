import { Moon, Sun, Palette, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme, themes, ThemeName } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

export function ThemeSwitcher() {
    const { theme, mode, setTheme, toggleMode } = useTheme();

    return (
        <div className="flex items-center gap-1">
            {/* Mode Toggle */}
            <Button
                variant="ghost"
                size="icon"
                onClick={toggleMode}
                className="text-muted-foreground hover:text-foreground hover:bg-secondary"
                title={mode === 'light' ? 'Chuyển sang chế độ tối' : 'Chuyển sang chế độ sáng'}
            >
                {mode === 'light' ? (
                    <Moon className="h-5 w-5" />
                ) : (
                    <Sun className="h-5 w-5" />
                )}
            </Button>

            {/* Theme Selector */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-foreground hover:bg-secondary"
                        title="Chọn giao diện"
                    >
                        <Palette className="h-5 w-5" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Chọn giao diện</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {themes.map((t) => (
                        <DropdownMenuItem
                            key={t.name}
                            onClick={() => setTheme(t.name as ThemeName)}
                            className="flex items-center gap-3 cursor-pointer"
                        >
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-5 h-5 rounded-full border-2 border-border"
                                    style={{ backgroundColor: t.primaryColor }}
                                />
                                <div>
                                    <p className="font-medium text-sm">{t.label}</p>
                                    <p className="text-xs text-muted-foreground">{t.description}</p>
                                </div>
                            </div>
                            {theme === t.name && (
                                <Check className="h-4 w-4 ml-auto text-primary" />
                            )}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
