import { useState } from "react";
import { Save, Bell, Shield, Palette, Globe, Sun, Moon, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useTheme, themes, ThemeName, ThemeMode } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

export default function AdminSettings() {
  const { theme, mode, setTheme, setMode } = useTheme();

  const [settings, setSettings] = useState({
    siteName: "VietCinema",
    siteEmail: "contact@vietcinema.vn",
    currency: "VND",
    timezone: "Asia/Ho_Chi_Minh",
    emailNotifications: true,
    smsNotifications: false,
    maintenanceMode: false,
    allowRegistration: true,
    maxSeatsPerBooking: 8,
    bookingHoldTime: 5,
  });

  const handleSave = () => {
    toast.success("Đã lưu cài đặt thành công");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Cài đặt hệ thống</h1>
        <p className="text-muted-foreground mt-1">
          Quản lý cấu hình chung của VietCinema
        </p>
      </div>

      {/* Appearance Settings */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Palette className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Giao diện</h2>
        </div>

        <div className="space-y-6">
          {/* Mode Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Chế độ hiển thị</Label>
            <div className="flex gap-3">
              <button
                onClick={() => setMode('light')}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all",
                  mode === 'light'
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                )}
              >
                <Sun className="h-5 w-5" />
                <span className="font-medium">Sáng</span>
                {mode === 'light' && <Check className="h-4 w-4 text-primary ml-auto" />}
              </button>
              <button
                onClick={() => setMode('dark')}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all",
                  mode === 'dark'
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                )}
              >
                <Moon className="h-5 w-5" />
                <span className="font-medium">Tối</span>
                {mode === 'dark' && <Check className="h-4 w-4 text-primary ml-auto" />}
              </button>
            </div>
          </div>

          <Separator />

          {/* Theme Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Chọn giao diện màu</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {themes.map((t) => {
                const colors = mode === 'light' ? t.previewColors.light : t.previewColors.dark;
                const isSelected = theme === t.name;

                return (
                  <button
                    key={t.name}
                    onClick={() => setTheme(t.name as ThemeName)}
                    className={cn(
                      "relative p-4 rounded-xl border-2 transition-all text-left group",
                      isSelected
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    {/* Preview Colors */}
                    <div
                      className="h-20 rounded-lg mb-3 relative overflow-hidden shadow-inner"
                      style={{ backgroundColor: colors.bg }}
                    >
                      <div
                        className="absolute bottom-2 left-2 right-2 h-8 rounded-md"
                        style={{ backgroundColor: colors.primary }}
                      />
                      <div
                        className="absolute top-2 right-2 w-6 h-6 rounded-full"
                        style={{ backgroundColor: colors.accent }}
                      />
                    </div>

                    {/* Theme Info */}
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full border border-border"
                        style={{ backgroundColor: t.primaryColor }}
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm text-foreground">{t.label}</p>
                        <p className="text-xs text-muted-foreground">{t.description}</p>
                      </div>
                      {isSelected && (
                        <Check className="h-5 w-5 text-primary" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* General Settings */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Globe className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Cài đặt chung</h2>
        </div>

        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tên website</Label>
              <Input
                value={settings.siteName}
                onChange={(e) =>
                  setSettings({ ...settings, siteName: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Email liên hệ</Label>
              <Input
                type="email"
                value={settings.siteEmail}
                onChange={(e) =>
                  setSettings({ ...settings, siteEmail: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Đơn vị tiền tệ</Label>
              <Select
                value={settings.currency}
                onValueChange={(v) => setSettings({ ...settings, currency: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="VND">VND - Việt Nam Đồng</SelectItem>
                  <SelectItem value="USD">USD - US Dollar</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Múi giờ</Label>
              <Select
                value={settings.timezone}
                onValueChange={(v) => setSettings({ ...settings, timezone: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Asia/Ho_Chi_Minh">
                    Asia/Ho_Chi_Minh (GMT+7)
                  </SelectItem>
                  <SelectItem value="Asia/Bangkok">Asia/Bangkok (GMT+7)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Settings */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Palette className="h-5 w-5 text-cinema-warning" />
          <h2 className="text-lg font-semibold text-foreground">Cài đặt đặt vé</h2>
        </div>

        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Số ghế tối đa mỗi lần đặt</Label>
              <Input
                type="number"
                min={1}
                max={20}
                value={settings.maxSeatsPerBooking}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    maxSeatsPerBooking: parseInt(e.target.value),
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Thời gian giữ ghế (phút)</Label>
              <Input
                type="number"
                min={1}
                max={30}
                value={settings.bookingHoldTime}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    bookingHoldTime: parseInt(e.target.value),
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Bell className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Thông báo</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Thông báo Email</p>
              <p className="text-sm text-muted-foreground">
                Gửi email xác nhận đặt vé cho khách hàng
              </p>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={(v) =>
                setSettings({ ...settings, emailNotifications: v })
              }
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Thông báo SMS</p>
              <p className="text-sm text-muted-foreground">
                Gửi SMS nhắc nhở trước suất chiếu
              </p>
            </div>
            <Switch
              checked={settings.smsNotifications}
              onCheckedChange={(v) =>
                setSettings({ ...settings, smsNotifications: v })
              }
            />
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Shield className="h-5 w-5 text-cinema-success" />
          <h2 className="text-lg font-semibold text-foreground">Bảo mật</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Chế độ bảo trì</p>
              <p className="text-sm text-muted-foreground">
                Tạm ngừng website để bảo trì hệ thống
              </p>
            </div>
            <Switch
              checked={settings.maintenanceMode}
              onCheckedChange={(v) =>
                setSettings({ ...settings, maintenanceMode: v })
              }
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Cho phép đăng ký</p>
              <p className="text-sm text-muted-foreground">
                Cho phép người dùng mới đăng ký tài khoản
              </p>
            </div>
            <Switch
              checked={settings.allowRegistration}
              onCheckedChange={(v) =>
                setSettings({ ...settings, allowRegistration: v })
              }
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg">
          <Save className="h-4 w-4 mr-2" />
          Lưu cài đặt
        </Button>
      </div>
    </div>
  );
}
