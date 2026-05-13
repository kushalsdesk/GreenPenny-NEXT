"use client";
import { Menu, Bell } from "lucide-react";
import { useAuthStore } from "@/src/stores/authStore";

export default function Navbar() {
  const user = useAuthStore((state) => state.user);

  return (
    <header className="h-20 bg-navy/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-20 flex items-center justify-between px-8">
      <div className="flex items-center md:hidden">
        <button className="p-2 -ml-2 text-slate-400 hover:text-slate-100">
          <span className="sr-only">Open menu</span>
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="ml-3 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <div className="w-4 h-4 rounded-sm bg-navy"></div>
          </div>
          <span className="font-bold text-lg tracking-tight text-white">
            GreenPenny
          </span>
        </div>
      </div>

      <div className="hidden md:block flex-1" />

      <div className="flex items-center gap-6 ml-auto">
        <button className="p-2 text-slate-400 hover:text-primary transition-colors relative hidden sm:block">
          <span className="sr-only">View notifications</span>
          <Bell className="h-5 w-5" aria-hidden="true" />
          <span className="absolute top-2 right-2.5 block h-1.5 w-1.5 rounded-full bg-red-500 ring-2 ring-navy transform translate-x-1/2 -translate-y-1/2" />
        </button>

        {user && (
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10 hidden sm:flex">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              <span className="text-xs font-mono text-primary">
                LIVE CONNECTED
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium text-slate-200">
                  {user.name}
                </p>
                <p className="text-xs text-slate-400">Free Plan</p>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-primary/30 p-0.5">
                <img
                  className="rounded-full w-full h-full object-cover"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt={user.name}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
