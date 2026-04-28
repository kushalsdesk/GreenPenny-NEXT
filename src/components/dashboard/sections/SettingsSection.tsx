"use client";
import { useState, useEffect } from 'react';
import { getUser } from '../../../lib/apiClient';
import type { User } from '../../../types';
import { PageLoader, PageError } from '../../ui/LoadingStates';

export default function SettingsSection() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getUser();
      setUser(res.data);
    } catch (err: any) {
      setError(err.message || 'Failed to load user profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <PageLoader />;
  if (error) return <PageError message={error} onRetry={loadData} />;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-sm text-slate-400 mt-1">Manage your account and preferences.</p>
      </div>

      <div className="rounded-2xl bg-navy-light border border-white/5 flex flex-col p-8 items-center justify-center min-h-[500px]">
          {/* Settings placeholder */}
          <div className="text-center">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Settings Configuration</h3>
              <p className="text-sm text-slate-500 max-w-sm mt-2">Profile edit, preferences, notifications, and security will be placed here.</p>
          </div>
      </div>
    </div>
  );
}
