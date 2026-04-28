"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ReceiptText, PieChart, Settings, LogOut } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuthStore } from '../../stores/authStore';

const navigation = [
  { name: 'Dashboard', to: '/dashboard', icon: LayoutDashboard, exact: true },
  { name: 'Transactions', to: '/dashboard/transactions', icon: ReceiptText },
  { name: 'Insights', to: '/dashboard/insights', icon: PieChart },
  { name: 'Settings', to: '/dashboard/settings', icon: Settings },
];

export default function Sidebar() {
  const logout = useAuthStore((state) => state.logout);
  const pathname = usePathname();

  return (
    <div className="hidden md:flex flex-col w-64 border-r border-white/10 p-6 h-full">
      <div className="flex items-center gap-3 mb-12">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <div className="w-4 h-4 bg-navy rounded-sm"></div>
        </div>
        <span className="font-bold text-xl tracking-tight text-white">GreenPenny</span>
      </div>

      <nav className="flex-1 space-y-2">
        {navigation.map((item) => {
          const isActive = item.exact ? pathname === item.to : pathname?.startsWith(item.to);
          return (
            <Link
              key={item.name}
              href={item.to}
              className={cn(
                'flex items-center gap-3 px-4 py-3 transition-colors duration-200',
                isActive
                  ? 'bg-white/5 border-l-2 border-primary text-white rounded-r-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5 rounded-md'
              )}
            >
              <item.icon
                className="w-5 h-5 flex-shrink-0"
                aria-hidden="true"
              />
              <span className={cn(isActive ? 'font-medium' : '')}>{item.name}</span>
            </Link>
          );
        })}
        {/* Logout mapped directly below nav items for spacing or we can keep it at bottom */}
      </nav>

      <div className="mt-auto space-y-4">
        {/* Log out button styling adapted to match inactive nav link */}
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-colors rounded-md"
        >
          <LogOut className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
          <span>Logout</span>
        </button>

        <div className="p-4 bg-gradient-to-br from-navy-light to-navy border border-white/5 rounded-xl">
          <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-2">Pro Feature</p>
          <p className="text-sm text-slate-300 leading-relaxed mb-4">Unlock AI-powered investment insights today.</p>
          <button className="w-full py-2 bg-primary text-navy font-bold text-xs rounded-lg uppercase tracking-wide">Upgrade</button>
        </div>
      </div>
    </div>
  );
}
