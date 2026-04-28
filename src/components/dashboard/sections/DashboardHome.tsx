"use client";
import { useState, useEffect } from 'react';
import { getAccounts, getTransactions } from '../../../lib/apiClient';
import type { Account, PaginatedTransactions } from '../../../types';
import { PageLoader, PageError } from '../../ui/LoadingStates';
import { formatCurrency } from '../../../lib/utils';
import { ArrowUpRight, ArrowDownRight, CreditCard, Landmark, Wallet } from 'lucide-react';

export default function DashboardHome() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<PaginatedTransactions | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [accRes, txRes] = await Promise.all([
        getAccounts(),
        getTransactions({ limit: 5 })
      ]);
      setAccounts(accRes.data);
      setTransactions(txRes.data);
    } catch (err: any) {
      setError(err.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <PageLoader />;
  if (error) return <PageError message={error} onRetry={loadData} />;

  // Derived values
  const totalBalance = accounts.reduce((acc, curr) => acc + parseFloat(curr.balance), 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-white">Overview</h1>
        <p className="text-xs text-slate-400 mt-1">Here's what's happening with your money today.</p>
      </div>

      {/* Account Cards - Max 3 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Balance Card styled as the primary card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 to-transparent p-6 border border-primary/20 group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity text-primary">
            <Wallet className="w-16 h-16" />
          </div>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-4">Total Balance</p>
          <p className="text-3xl font-mono text-white mb-4">{formatCurrency(totalBalance)}</p>
          <div className="flex items-center gap-1 text-xs text-primary font-mono">
            <ArrowUpRight className="h-4 w-4" />
            <span>+2.4% from last month</span>
          </div>
        </div>

        {/* Individual Accounts mapping (up to 2 more) */}
        {accounts.slice(0, 2).map((account) => (
          <div key={account.id} className="relative overflow-hidden rounded-2xl bg-navy-light p-6 border border-white/5 group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              {account.accountType === 'Checking' ? (
                <Landmark className="w-16 h-16" />
              ) : (
                <CreditCard className="w-16 h-16" />
              )}
            </div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-4">{account.nickname || account.bankName}</p>
            <p className="text-3xl font-mono text-white">{formatCurrency(account.balance)}</p>
            <p className="mt-4 text-xs text-primary font-mono">{account.accountNumberMasked}</p>
          </div>
        ))}
        {/* We would render add bank if accounts.length < 3 in a real fluid app, but since we map 2 above, we can just show it */}
        {accounts.length <= 2 && (
          <div className="bg-white/5 border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-white/10 transition-colors group min-h-[160px]">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase">Add Bank</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
        {/* Chart Area */}
        <div className="lg:col-span-8 rounded-2xl bg-navy-light border border-white/5 p-6 flex flex-col min-h-[300px]">
             <div className="flex items-center justify-between mb-8">
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Performance Trend</h3>
                <div className="flex gap-4 text-[10px] uppercase font-bold">
                  <div className="flex items-center gap-1.5 text-white"><span className="w-2 h-2 rounded-full bg-primary"></span> Income</div>
                  <div className="flex items-center gap-1.5 text-white/50"><span className="w-2 h-2 rounded-full bg-white/20"></span> Expenses</div>
                </div>
             </div>
             {/* Chart placeholder */}
             <div className="flex-1 w-full flex items-center justify-center text-slate-500 bg-white/5 rounded-xl border border-dashed border-white/10">
                 [Area Chart Area - To be implemented next iteration]
             </div>
        </div>

        {/* Recent Transactions */}
        <div className="lg:col-span-4 rounded-2xl bg-navy-light border border-white/5 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
             <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Recent Transactions</h3>
             <a href="/dashboard/transactions" className="text-[10px] font-bold uppercase tracking-widest text-primary border-b border-primary/30 hover:border-primary transition-colors">View All</a>
          </div>
          
          <div className="space-y-2 flex-full">
            {transactions?.data.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-3 hover:bg-white/5 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-white/5">
                <div className="flex items-center gap-4">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    tx.type === 'income' ? 'bg-primary/10 text-primary' : 'bg-orange-500/10 text-orange-500'
                  }`}>
                    {tx.type === 'income' ? <ArrowDownRight className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{tx.description}</p>
                    <p className="text-[10px] text-slate-500 font-mono capitalize">{tx.category} • {new Date(tx.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className={`text-right font-mono text-sm ${tx.type === 'income' ? 'text-primary' : 'text-slate-200'}`}>
                  {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
