"use client";
import { useState, useEffect } from 'react';
import { getInsights } from '../../../lib/apiClient';
import type { InsightsDashboard } from '../../../types';
import { PageLoader, PageError } from '../../ui/LoadingStates';

export default function InsightsSection() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [insights, setInsights] = useState<InsightsDashboard | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getInsights();
      setInsights(res.data);
    } catch (err: any) {
      setError(err.message || 'Failed to load insights');
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
        <h1 className="text-2xl font-bold text-white">Insights</h1>
        <p className="text-sm text-slate-400 mt-1">Understand your financial habits.</p>
      </div>

      <div className="rounded-2xl bg-navy-light border border-white/5 flex flex-col p-8 items-center justify-center min-h-[500px]">
          {/* Insights placeholder */}
          <div className="text-center">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Insights Dashboard</h3>
              <p className="text-sm text-slate-500 max-w-sm mt-2">Charts, health score, and monthly breakdown will be implemented here next.</p>
          </div>
      </div>
    </div>
  );
}
