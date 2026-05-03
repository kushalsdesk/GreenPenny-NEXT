"use client";
import { useState, useEffect } from "react";
import { getAccounts, getTransactions } from "@/src/lib/apiClient";
import type { Account, PaginatedTransactions } from "@/src/types";
import { PageLoader, PageError } from "@/src/components/ui/LoadingStates";
import { formatCurrency } from "@/src/lib/utils";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Landmark,
  PiggyBank,
  TrendingUp,
  TrendingDown,
  Wallet,
  Plus,
  Percent,
} from "lucide-react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import Link from "next/link";

const hardcodedTrend = [
  { month: "Nov", income: 4100, expenses: 2600 },
  { month: "Dec", income: 5450, expenses: 3100 },
  { month: "Jan", income: 4200, expenses: 2400 },
  { month: "Feb", income: 4200, expenses: 2750 },
  { month: "Mar", income: 5050, expenses: 2900 },
  { month: "Apr", income: 5095, expenses: 987 },
];

export default function DashboardHome() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] =
    useState<PaginatedTransactions | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [accRes, txRes] = await Promise.all([
        getAccounts(),
        getTransactions({ limit: 5 }),
      ]);
      setAccounts(accRes.data);
      setTransactions(txRes.data);
    } catch (err: any) {
      setError(err.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <PageLoader />;
  if (error) return <PageError message={error} onRetry={loadData} />;

  const totalBalance = accounts.reduce(
    (acc, curr) => acc + parseFloat(curr.balance),
    0
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Section A — Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Overview</h1>
        <p className="text-sm text-slate-400 mt-1">
          Here's what's happening with your money today.
        </p>
      </div>

      {/* Section B — Account Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 — Total Balance */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 border border-primary/20">
          <div className="absolute top-0 right-0 p-8 opacity-5 text-current">
            <Wallet className="w-24 h-24" />
          </div>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-4">
            Total Balance
          </p>
          <p className="text-4xl font-mono text-white mb-4">
            {formatCurrency(totalBalance)}
          </p>
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">{accounts.length} Accounts Connected</span>
            <div className="flex items-center gap-1 text-primary">
              <span>+2.4% this month</span>
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Cards 2 & 3 — Individual accounts */}
        {accounts.slice(0, 2).map((account) => (
          <div
            key={account.id}
            className="relative overflow-hidden rounded-2xl bg-navy-light p-6 border border-white/5"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 text-current text-white">
              {account.accountType === "Checking" ? (
                <Landmark className="w-24 h-24" />
              ) : account.accountType === "Savings" ? (
                <PiggyBank className="w-24 h-24" />
              ) : (
                <TrendingUp className="w-24 h-24" />
              )}
            </div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-4">
              {account.nickname || account.bankName}
            </p>
            <p className="text-3xl font-mono text-white">
              {formatCurrency(parseFloat(account.balance))}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs font-mono text-primary">
                {account.accountNumberMasked}
              </span>
              <span className="bg-white/5 rounded-full px-2 py-0.5 text-[10px] uppercase font-bold text-slate-400">
                {account.accountType}
              </span>
            </div>
          </div>
        ))}

        {/* Card 4 — Add Account */}
        <div className="rounded-2xl border border-dashed border-white/10 p-6 flex flex-col items-center justify-center cursor-pointer hover:-translate-y-1 hover:border-white/20 transition-all min-h-[160px]">
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-3">
            <Plus className="w-5 h-5 text-slate-400" />
          </div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Link Account
          </span>
        </div>
      </div>

      {/* Section C — Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left panel — Performance Trend Chart */}
        <div className="lg:col-span-8 rounded-2xl bg-navy-light border border-white/5 p-6 flex flex-col min-h-[360px]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xs uppercase tracking-widest font-bold text-slate-400">
              Performance Trend
            </h3>
            <div className="flex items-center gap-6">
              {/* Period selector */}
              <div className="flex gap-1 text-[10px] uppercase tracking-widest font-bold">
                <button className="px-2 py-1 rounded text-slate-500 hover:text-white transition-colors">
                  3M
                </button>
                <button className="px-2 py-1 rounded text-white bg-white/10 transition-colors">
                  6M
                </button>
                <button className="px-2 py-1 rounded text-slate-500 hover:text-white transition-colors">
                  1Y
                </button>
              </div>
              {/* Legend dots */}
              <div className="flex gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                <div className="flex items-center gap-1.5 text-white">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>{" "}
                  Income
                </div>
                <div className="flex items-center gap-1.5 text-white">
                  <span className="w-2 h-2 rounded-full bg-orange-400"></span>{" "}
                  Expenses
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full min-h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hardcodedTrend}>
                <defs>
                  <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f97316" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#f97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0A0E17",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    color: "white",
                  }}
                  itemStyle={{
                    fontFamily: "monospace",
                    fontSize: "14px",
                  }}
                  formatter={(value: number, name: string) => [
                    `$${value.toLocaleString()}`,
                    name === "income" ? "Income" : "Expenses",
                  ]}
                  labelStyle={{
                    color: "#94a3b8",
                    fontSize: "12px",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: "4px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="income"
                  stroke="#10B981"
                  strokeWidth={2}
                  fill="url(#incomeGrad)"
                  activeDot={{ r: 6, fill: "#10B981", stroke: "#0A0E17", strokeWidth: 2 }}
                />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  stroke="#f97316"
                  strokeWidth={2}
                  fill="url(#expenseGrad)"
                  activeDot={{ r: 6, fill: "#f97316", stroke: "#0A0E17", strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right panel — Recent Transactions */}
        <div className="lg:col-span-4 rounded-2xl bg-navy-light border border-white/5 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs uppercase tracking-widest font-bold text-slate-400">
              Recent Activity
            </h3>
            <Link
              href="/dashboard/transactions"
              className="text-xs font-bold text-primary hover:text-primary-dark transition-colors"
            >
              View All
            </Link>
          </div>

          <div className="flex flex-col gap-2">
            {!transactions?.data || transactions.data.length === 0 ? (
              <div className="flex-1 flex items-center justify-center text-slate-500 py-10 text-sm">
                No recent transactions
              </div>
            ) : (
              transactions.data.map((tx) => {
                const dateNum = new Date(tx.date);
                const isIncome = tx.type === "income";
                return (
                  <div
                    key={tx.id}
                    className="flex items-center gap-4 p-3 hover:bg-white/5 rounded-xl transition-colors"
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isIncome
                        ? "bg-primary/10 text-primary"
                        : "bg-orange-500/10 text-orange-400"
                        }`}
                    >
                      {isIncome ? (
                        <ArrowDownLeft className="w-5 h-5" />
                      ) : (
                        <ArrowUpRight className="w-5 h-5" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">
                        {tx.description}
                      </p>
                      <p className="text-[10px] font-mono text-slate-500 mt-1">
                        {tx.category} •{" "}
                        {dateNum.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div
                      className={`font-mono text-sm shrink-0 ${isIncome ? "text-primary" : "text-slate-300"
                        }`}
                    >
                      {isIncome ? "+" : "-"}
                      {formatCurrency(parseFloat(tx.amount))}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Section D — Quick Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Monthly Income */}
        <div className="bg-navy-light rounded-2xl border border-white/5 p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-1">
              April Income
            </p>
            <p className="text-xl font-mono text-white">
              {formatCurrency(5095.3)}
            </p>
          </div>
        </div>
        {/* Monthly Expenses */}
        <div className="bg-navy-light rounded-2xl border border-white/5 p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0">
            <TrendingDown className="w-5 h-5 text-orange-400" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-1">
              April Expenses
            </p>
            <p className="text-xl font-mono text-white">
              {formatCurrency(987.12)}
            </p>
          </div>
        </div>
        {/* Net Savings */}
        <div className="bg-navy-light rounded-2xl border border-white/5 p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-400/10 flex items-center justify-center shrink-0">
            <PiggyBank className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-1">
              Saved This Month
            </p>
            <p className="text-xl font-mono text-white">
              {formatCurrency(4108.18)}
            </p>
          </div>
        </div>
        {/* Savings Rate */}
        <div className="bg-navy-light rounded-2xl border border-white/5 p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <Percent className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-1">
              Savings Rate
            </p>
            <p className="text-2xl font-mono text-primary font-bold">81%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
