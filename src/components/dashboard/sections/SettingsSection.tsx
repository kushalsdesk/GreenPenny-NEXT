"use client";
import { useState, useEffect } from "react";
import { getUser, updateUser } from "@/src/lib/apiClient";
import type { User, UpdateProfileDto } from "@/src/types";
import { PageLoader, PageError } from "@/src/components/ui/LoadingStates";
import { Moon, Sun, CheckCircle2 } from "lucide-react";

export default function SettingsSection() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const [form, setForm] = useState<UpdateProfileDto | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "profile" | "preferences" | "notifications" | "security"
  >("profile");

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getUser();
      setUser(res.data);
      setForm({
        name: res.data.name,
        currency: res.data.currency,
        dateFormat: res.data.dateFormat,
        firstDayOfWeek: res.data.firstDayOfWeek,
        theme: res.data.theme,
        emailNotifications: res.data.emailNotifications,
        weeklyInsights: res.data.weeklyInsights,
        pushNotifications: res.data.pushNotifications,
        monthlyReports: res.data.monthlyReports,
      });
    } catch (err: any) {
      setError(err.message || "Failed to load user profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async () => {
    if (!form) return;
    try {
      setSaving(true);
      const res = await updateUser(form);
      setUser(res.data);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err: any) {
      alert("Failed to save: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      setForm({
        name: user.name,
        currency: user.currency,
        dateFormat: user.dateFormat,
        firstDayOfWeek: user.firstDayOfWeek,
        theme: user.theme,
        emailNotifications: user.emailNotifications,
        weeklyInsights: user.weeklyInsights,
        pushNotifications: user.pushNotifications,
        monthlyReports: user.monthlyReports,
      });
    }
  };

  if (loading) return <PageLoader />;
  if (error) return <PageError message={error} onRetry={loadData} />;
  if (!user || !form) return null;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-sm text-slate-400 mt-1">
          Manage your account and preferences.
        </p>
      </div>

      {/* Tab bar */}
      <div className="flex flex-wrap gap-1 bg-white/5 rounded-xl p-1 w-fit mb-8">
        {(["profile", "preferences", "notifications", "security"] as const).map(
          (tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm rounded-lg capitalize transition-all ${activeTab === tab
                ? "bg-navy-light text-white shadow-sm font-medium"
                : "text-slate-400 hover:text-white"
                }`}
            >
              {tab}
            </button>
          )
        )}
      </div>

      {/* Tab Content Areas */}
      <div className="bg-navy-light border border-white/5 rounded-2xl p-6 md:p-8">
        {activeTab === "profile" && (
          <div className="space-y-6">
            {/* Avatar */}
            <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6 border-b border-white/5 pb-8">
              <div className="w-20 h-20 rounded-full border-2 border-primary/30 bg-primary/20 flex items-center justify-center shrink-0">
                {user.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.avatarUrl}
                    alt="Avatar"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-primary font-bold text-xl uppercase">
                    {user.name.slice(0, 2)}
                  </span>
                )}
              </div>
              <div className="flex flex-col items-center sm:items-start justify-center gap-2 h-20">
                <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-sm rounded-xl transition-colors border border-white/10">
                  Change Photo
                </button>
                <p className="text-xs text-slate-500">
                  JPG, GIF or PNG. Max size 2MB.
                </p>
              </div>
            </div>

            {/* Profile Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-slate-400">
                  Full Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs uppercase tracking-widest font-bold text-slate-400">
                    Email Address
                  </label>
                  <span
                    className="text-[10px] text-slate-500"
                    title="Email is managed by your auth provider"
                  >
                    Managed by Auth
                  </span>
                </div>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white opacity-50 cursor-not-allowed"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-slate-400">
                  Currency
                </label>
                <select
                  value={form.currency}
                  onChange={(e) =>
                    setForm({ ...form, currency: e.target.value as any })
                  }
                  className="w-full bg-navy-light border border-white/10 rounded-xl px-4 py-3 text-slate-200 focus:border-primary/50 focus:outline-none appearance-none"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="JPY">JPY (¥)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-slate-400">
                  Date Format
                </label>
                <select
                  value={form.dateFormat}
                  onChange={(e) =>
                    setForm({ ...form, dateFormat: e.target.value as any })
                  }
                  className="w-full bg-navy-light border border-white/10 rounded-xl px-4 py-3 text-slate-200 focus:border-primary/50 focus:outline-none appearance-none"
                >
                  <option value="MM/DD/YYYY">MM/DD/YYYY (12/31/2026)</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY (31/12/2026)</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD (2026-12-31)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {activeTab === "preferences" && (
          <div className="space-y-10">
            <div className="space-y-4">
              <label className="text-xs uppercase tracking-widest font-bold text-slate-400">
                Theme
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-primary bg-primary/5 rounded-2xl p-4 flex items-center gap-4 cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <Moon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Dark Mode</p>
                    <p className="text-xs text-slate-500">Currently active</p>
                  </div>
                </div>
                <div className="border border-white/5 bg-white/5 rounded-2xl p-4 flex items-center gap-4 opacity-40 cursor-not-allowed">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Sun className="w-5 h-5 text-slate-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Light Mode</p>
                    <p className="text-xs text-slate-500">Coming soon</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-xs uppercase tracking-widest font-bold text-slate-400">
                Week Starts On
              </label>
              <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl w-fit border border-white/10">
                <button
                  onClick={() => setForm({ ...form, firstDayOfWeek: "Sunday" })}
                  className={`px-6 py-2 rounded-lg text-sm transition-colors ${form.firstDayOfWeek === "Sunday"
                    ? "bg-primary text-navy font-bold shadow-sm"
                    : "text-slate-400 hover:text-white"
                    }`}
                >
                  Sunday
                </button>
                <button
                  onClick={() => setForm({ ...form, firstDayOfWeek: "Monday" })}
                  className={`px-6 py-2 rounded-lg text-sm transition-colors ${form.firstDayOfWeek === "Monday"
                    ? "bg-primary text-navy font-bold shadow-sm"
                    : "text-slate-400 hover:text-white"
                    }`}
                >
                  Monday
                </button>
              </div>
            </div>

            <div className="space-y-4 max-w-sm">
              <label className="text-xs uppercase tracking-widest font-bold text-slate-400">
                Display Currency
              </label>
              <select
                value={form.currency}
                onChange={(e) =>
                  setForm({ ...form, currency: e.target.value as any })
                }
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-slate-200 focus:border-primary/50 focus:outline-none appearance-none"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="JPY">JPY (¥)</option>
              </select>
            </div>
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="space-y-2">
            {[
              {
                id: "emailNotifications",
                title: "Email Notifications",
                desc: "Receive updates and alerts via email",
              },
              {
                id: "weeklyInsights",
                title: "Weekly Insights",
                desc: "Get a weekly summary of your finances",
              },
              {
                id: "pushNotifications",
                title: "Push Notifications",
                desc: "Browser push notifications",
              },
              {
                id: "monthlyReports",
                title: "Monthly Reports",
                desc: "Detailed monthly financial report",
              },
            ].map((item) => {
              const chk = !!(form as any)[item.id];
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-4 border-b border-white/5 last:border-0"
                >
                  <div className="pr-4">
                    <p className="font-semibold text-white">{item.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                  </div>
                  {/* CSS Toggle Switch */}
                  <div
                    onClick={() => setForm({ ...form, [item.id]: !chk })}
                    className={`shrink-0 w-11 h-6 rounded-full relative cursor-pointer outline-none transition-colors duration-200 ease-in-out ${chk ? "bg-primary" : "bg-white/20"
                      }`}
                  >
                    <div
                      className={`absolute left-[2px] top-[2px] w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${chk ? "translate-x-5" : "translate-x-0"
                        }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === "security" && (
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">
                Change Password
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="password"
                  placeholder="Current Password"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
                />
                <button
                  type="button"
                  className="w-fit bg-white/10 hover:bg-white/15 text-white px-6 py-2.5 rounded-xl text-sm transition-colors border border-white/5 disabled:opacity-50"
                  disabled
                >
                  Update Password (Coming Soon)
                </button>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/5">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">
                Connected Accounts
              </h3>
              <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-2">
                    {/* Google generic G icon */}
                    <svg viewBox="0 0 24 24" className="w-5 h-5">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Google</p>
                    <p className="text-xs text-slate-500">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span className="text-[10px] text-primary font-bold uppercase tracking-widest">
                    Connected
                  </span>
                </div>
              </div>
              <button
                disabled
                className="text-xs font-bold text-primary opacity-50 cursor-not-allowed"
              >
                + Add Provider
              </button>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/5">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">
                Danger Zone
              </h3>
              <div className="border border-red-500/20 bg-red-500/5 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-semibold text-white">Delete Account</h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm">
                    Permanently delete your account and all financial data. This
                    action cannot be undone.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => alert("Are you sure? This cannot be undone. (Mock)")}
                  className="shrink-0 px-6 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl text-sm transition-colors border border-red-500/20"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Action Bar (Not shown on security tab as it has no form state) */}
        {activeTab !== "security" && (
          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-white/5">
            <button
              onClick={handleCancel}
              disabled={saving}
              className="text-slate-400 hover:text-white px-6 py-2.5 rounded-xl text-sm transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="relative bg-primary text-navy font-bold px-6 py-2.5 rounded-xl text-sm hover:bg-primary-dark transition-colors min-w-[140px] flex items-center justify-center disabled:opacity-80 disabled:cursor-not-allowed"
            >
              {saving ? (
                <div className="w-4 h-4 rounded-full border-2 border-navy border-t-transparent animate-spin"></div>
              ) : saved ? (
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Saved</span>
                </div>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
