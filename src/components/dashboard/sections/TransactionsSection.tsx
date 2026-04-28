"use client";
import { useState, useEffect } from 'react';
import { getTransactions } from '../../../lib/apiClient';
import type { PaginatedTransactions, TransactionFilters } from '../../../types';
import { PageLoader, PageError } from '../../ui/LoadingStates';

export default function TransactionsSection() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<PaginatedTransactions | null>(null);
  const [filters, setFilters] = useState<Partial<TransactionFilters>>({ page: 1, limit: 20 });

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getTransactions(filters);
      setTransactions(res.data);
    } catch (err: any) {
      setError(err.message || 'Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [filters]);

  if (loading && !transactions) return <PageLoader />;
  if (error && !transactions) return <PageError message={error} onRetry={loadData} />;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-white">Transactions</h1>
        <p className="text-sm text-slate-400 mt-1">Review and search your past transactions.</p>
      </div>

      <div className="rounded-2xl bg-navy-light border border-white/5 flex flex-col p-8 items-center justify-center min-h-[500px]">
          {/* Table placeholder */}
          <div className="text-center">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Transaction Table</h3>
              <p className="text-sm text-slate-500 max-w-sm mt-2">Filterable and paginated table will be implemented in the next iteration based on component target.</p>
          </div>
      </div>
    </div>
  );
}
