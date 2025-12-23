import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ThemeName = 'purple' | 'charcoal' | 'ocean' | 'forest' | 'sunset';
export type ThemeMode = 'light' | 'dark';

interface ThemeConfig {
    name: ThemeName;
    label: string;
    description: string;
    primaryColor: string;
    previewColors: {
        light: { bg: string; primary: string; accent: string };
        dark: { bg: string; primary: string; accent: string };
    };
}

export const themes: ThemeConfig[] = [
    {
        name: 'purple',
        label: 'Tím Lavender',
        description: 'Thanh lịch và tinh tế',
        primaryColor: '#8B5CF6',
        previewColors: {
            light: { bg: '#FAFAFA', primary: '#8B5CF6', accent: '#14B8A6' },
            dark: { bg: '#0F0D15', primary: '#A78BFA', accent: '#2DD4BF' },
        },
    },
    {
        name: 'charcoal',
        label: 'Vàng Kim Cương',
        description: 'Sang trọng cổ điển',
        primaryColor: '#D4AF37',
        previewColors: {
            light: { bg: '#FAF9F6', primary: '#D4AF37', accent: '#B87333' },
            dark: { bg: '#1A1A1A', primary: '#D4AF37', accent: '#B87333' },
        },
    },
    {
        name: 'ocean',
        label: 'Đại Dương',
        description: 'Mát mẻ và thư giãn',
        primaryColor: '#0EA5E9',
        previewColors: {
            light: { bg: '#F0F9FF', primary: '#0EA5E9', accent: '#06B6D4' },
            dark: { bg: '#0C1929', primary: '#38BDF8', accent: '#22D3EE' },
        },
    },
    {
        name: 'forest',
        label: 'Rừng Xanh',
        description: 'Tự nhiên và bình yên',
        primaryColor: '#10B981',
        previewColors: {
            light: { bg: '#F0FDF4', primary: '#10B981', accent: '#84CC16' },
            dark: { bg: '#0D1F17', primary: '#34D399', accent: '#A3E635' },
        },
    },
    {
        name: 'sunset',
        label: 'Hoàng Hôn',
        description: 'Ấm áp và năng động',
        primaryColor: '#F97316',
        previewColors: {
            light: { bg: '#FFFBEB', primary: '#F97316', accent: '#F59E0B' },
            dark: { bg: '#1C1410', primary: '#FB923C', accent: '#FBBF24' },
        },
    },
];

interface ThemeContextType {
    theme: ThemeName;
    mode: ThemeMode;
    setTheme: (theme: ThemeName) => void;
    setMode: (mode: ThemeMode) => void;
    toggleMode: () => void;
    currentTheme: ThemeConfig;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'vietcinema-theme';
const MODE_STORAGE_KEY = 'vietcinema-mode';

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useState<ThemeName>(() => {
        if (typeof window !== 'undefined') {
            return (localStorage.getItem(THEME_STORAGE_KEY) as ThemeName) || 'purple';
        }
        return 'purple';
    });

    const [mode, setModeState] = useState<ThemeMode>(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem(MODE_STORAGE_KEY) as ThemeMode;
            if (stored) return stored;
            // Check system preference
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                return 'dark';
            }
        }
        return 'light';
    });

    const setTheme = (newTheme: ThemeName) => {
        setThemeState(newTheme);
        localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    };

    const setMode = (newMode: ThemeMode) => {
        setModeState(newMode);
        localStorage.setItem(MODE_STORAGE_KEY, newMode);
    };

    const toggleMode = () => {
        const newMode = mode === 'light' ? 'dark' : 'light';
        setMode(newMode);
    };

    const currentTheme = themes.find((t) => t.name === theme) || themes[0];

    // Apply theme to document
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.setAttribute('data-mode', mode);

        // Also add/remove dark class for compatibility
        if (mode === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme, mode]);

    return (
        <ThemeContext.Provider value={{ theme, mode, setTheme, setMode, toggleMode, currentTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
