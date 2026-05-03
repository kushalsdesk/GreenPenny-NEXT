"use client";
import { useState, useEffect } from "react";
import { getInsights, getAccounts } from "@/src/lib/apiClient";
import type { InsightsDashboard, Account } from "@/src/types";
import { PageLoader, PageError } from "@/src/components/ui/LoadingStates";
import { formatCurrency } from "@/src/lib/utils";
import {
  HeartPulse,
  ArrowDownLeft,
  ArrowUpRight,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const COLORS: Record<string, string> = {
  Food: "#10B981",
  Utilities: "#3B82F6",
  Dining: "#F59E0B",
  Transport: "#8B5CF6",
  Health: "#EF4444",
  Shopping: "#F97316",
  Entertainment: "#EC4899",
  Income: "#10B981",
  Other: "#6B7280",
};

export default function InsightsSection() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [insights, setInsights] = useState<InsightsDashboard | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState<
    string | undefined
  >(undefined);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [accRes, insRes] = await Promise.all([
        accounts.length === 0 ? getAccounts() : Promise.resolve({ data: accounts }),
        getInsights(selectedAccountId),
      ]);
      if (accounts.length === 0) setAccounts(accRes.data);
      setInsights(insRes.data);
    } catch (err: any) {
      setError(err.message || "Failed to load insights");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAccountId]);

  if (loading && !insights) return <PageLoader />;
  if (error && !insights)
    return <PageError message={error} onRetry={loadData} />;
  if (!insights) return null;

  // Health score colors
  let healthColor = "text-primary";
  let healthStroke = "#10B981";
  if (insights.health.score < 40) {
    healthColor = "text-red-500";
    healthStroke = "#EF4444";
  } else if (insights.health.score < 60) {
    healthColor = "text-amber-500";
    healthStroke = "#F59E0B";
  }

  // Ring calc
  const circumference = 2 * Math.PI * 28;
  const offset = circumference - (insights.health.score / 100) * circumference;

  // Sorting breakdown
  const sortedBreakdown = [...insights.spendingBreakdown].sort(
    (a, b) => b.totalSpent - a.totalSpent
  );
  const totalSpentAll = sortedBreakdown.reduce(
    (sum, item) => sum + item.totalSpent,
    0
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Row */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Insights</h1>
          <p className="text-sm text-slate-400 mt-1">
            Understand your spending habits.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedAccountId(undefined)}
            className={`px-4 py-1.5 rounded-xl text-sm transition-colors border ${selectedAccountId === undefined
              ? "bg-primary/15 border-primary/40 text-primary font-bold"
              : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
              }`}
          >
            All Accounts
          </button>
          {accounts.map((acc) => (
            <button
              key={acc.id}
              onClick={() => setSelectedAccountId(acc.id)}
              className={`px-4 py-1.5 rounded-xl text-sm transition-colors border ${selectedAccountId === acc.id
                ? "bg-primary/15 border-primary/40 text-primary font-bold"
                : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                }`}
            >
              {acc.nickname || acc.bankName}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div className="flex justify-center -my-2">
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary border-t-transparent"></div>
        </div>
      )}

      {/* Row 1 — Four KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Health Score */}
        <div className="bg-navy-light rounded-2xl border border-white/5 p-6 flex items-center justify-between">
          <div>
            <p className="text-5xl font-mono text-white mb-2 leading-none">
              {insights.health.score}
            </p>
            <div className="flex items-center gap-1.5">
              <HeartPulse className={`w-4 h-4 ${healthColor}`} />
              <span
                className={`text-sm font-bold uppercase tracking-wider ${healthColor}`}
              >
                {insights.health.status}
              </span>
            </div>
          </div>
          <div className="w-16 h-16 relative">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="6"
                fill="none"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke={healthStroke}
                strokeWidth="6"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
          </div>
        </div>

        {/* Monthly Income */}
        <div className="bg-navy-light rounded-2xl border border-white/5 p-6 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <ArrowDownLeft className="w-4 h-4 text-primary" />
            </div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500">
              Income This Month
            </p>
          </div>
          <p className="text-2xl font-mono text-white">
            {formatCurrency(insights.currentMonth.income)}
          </p>
        </div>

        {/* Monthly Expenses */}
        <div className="bg-navy-light rounded-2xl border border-white/5 p-6 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4 text-orange-400" />
            </div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500">
              Expenses
            </p>
          </div>
          <p className="text-2xl font-mono text-white">
            {formatCurrency(insights.currentMonth.expenses)}
          </p>
        </div>

        {/* Savings Rate */}
        <div className="bg-navy-light rounded-2xl border border-white/5 p-6 flex flex-col justify-center">
          <p
            className={`text-5xl font-mono mb-2 leading-none font-bold ${insights.currentMonth.savingsRate < 20
              ? "text-red-500"
              : insights.currentMonth.savingsRate <= 50
                ? "text-amber-500"
                : "text-primary"
              }`}
          >
            {insights.currentMonth.savingsRate}%
          </p>
          <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500">
            Of Income Saved
          </p>
        </div>
      </div>

      {/* Row 2 — Two-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left — Spending Breakdown */}
        <div className="lg:col-span-7 rounded-2xl bg-navy-light border border-white/5 p-6 flex flex-col min-h-[350px]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs uppercase tracking-widest font-bold text-slate-400">
              Spending by Category
            </h3>
            <span className="text-xs text-slate-500">April</span>
          </div>

          <div className="flex-1 flex flex-col md:flex-row items-center gap-8">
            {/* Chart */}
            <div className="relative w-48 h-48 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
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
                    formatter={(value: number) => `$${value.toLocaleString()}`}
                  />
                  <Pie
                    data={sortedBreakdown}
                    dataKey="totalSpent"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    stroke="none"
                    paddingAngle={2}
                  >
                    {sortedBreakdown.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[entry.category] || COLORS.Other}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xl font-mono text-white">
                  {formatCurrency(totalSpentAll).split(".")[0]}
                </span>
                <span className="text-[10px] uppercase text-slate-500 tracking-wider">
                  Total Spent
                </span>
              </div>
            </div>

            {/* Legend */}
            <div className="flex-1 w-full space-y-4">
              {sortedBreakdown.slice(0, 5).map((item) => (
                <div key={item.category} className="flex flex-col gap-1">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{
                          backgroundColor: COLORS[item.category] || COLORS.Other,
                        }}
                      ></div>
                      <span className="text-white font-semibold">
                        {item.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 font-mono">
                      <span className="text-slate-400 text-xs">
                        {item.percentage}%
                      </span>
                      <span className="text-white">
                        {formatCurrency(item.totalSpent)}
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${item.percentage}%`,
                        backgroundColor: COLORS[item.category] || COLORS.Other,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — Monthly Summary Card & Trend */}
        <div className="lg:col-span-5 rounded-2xl bg-navy-light border border-white/5 p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-6">
              Summary
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-white">
                    Income
                  </span>
                </div>
                <span className="font-mono text-white">
                  {formatCurrency(insights.currentMonth.income)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                    <TrendingDown className="w-4 h-4 text-orange-400" />
                  </div>
                  <span className="text-sm font-semibold text-white">
                    Expenses
                  </span>
                </div>
                <span className="font-mono text-white">
                  {formatCurrency(insights.currentMonth.expenses)}
                </span>
              </div>

              <div className="border-t border-white/5 my-4 pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-semibold text-white uppercase tracking-widest">
                    Net Savings
                  </span>
                  <span
                    className={`font-mono font-bold text-lg ${insights.currentMonth.netSavings >= 0
                      ? "text-primary"
                      : "text-red-400"
                      }`}
                  >
                    {insights.currentMonth.netSavings >= 0 ? "+" : "-"}
                    {formatCurrency(Math.abs(insights.currentMonth.netSavings))}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${insights.currentMonth.savingsRate}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 h-[120px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={insights.trend}>
                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.05)" }}
                  contentStyle={{
                    backgroundColor: "#0A0E17",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    color: "white",
                  }}
                  itemStyle={{ fontFamily: "monospace", fontSize: "14px" }}
                  formatter={(val: number) => `$${val.toLocaleString()}`}
                  labelStyle={{ display: "none" }}
                />
                <Bar dataKey="netSavings" radius={[4, 4, 4, 4]}>
                  {insights.trend.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.netSavings >= 0 ? "#10B981" : "#EF4444"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 3 — Trend Chart (full width) */}
      <div className="rounded-2xl bg-navy-light border border-white/5 p-6 flex flex-col min-h-[400px]">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xs uppercase tracking-widest font-bold text-slate-400">
            6 Month Cash Flow
          </h3>
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex gap-1 text-[10px] uppercase tracking-widest font-bold">
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
            <div className="flex gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <div className="flex items-center gap-1.5 text-white">
                <span className="w-2 h-2 rounded-full bg-primary"></span> Income
              </div>
              <div className="flex items-center gap-1.5 text-white">
                <span className="w-2 h-2 rounded-full bg-orange-400"></span>{" "}
                Expenses
              </div>
              <div className="flex items-center gap-1.5 text-white">
                <span className="w-2 h-2 rounded-full bg-gold border border-gold/50 border-dashed"></span>{" "}
                Savings
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full min-h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={insights.trend}>
              <defs>
                <linearGradient id="incomeGradMain" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expenseGradMain" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f97316" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.04)"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tick={{ fill: "#64748b", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                dy={10}
              />
              <YAxis
                tickFormatter={(val) => `$${val}`}
                tick={{ fill: "#64748b", fontSize: 11, fontFamily: "monospace" }}
                axisLine={false}
                tickLine={false}
                dx={-10}
              />
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
                  name === "income"
                    ? "Income"
                    : name === "expenses"
                      ? "Expenses"
                      : "Net Savings",
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
                fill="url(#incomeGradMain)"
                activeDot={{
                  r: 6,
                  fill: "#10B981",
                  stroke: "#0A0E17",
                  strokeWidth: 2,
                }}
              />
              <Area
                type="monotone"
                dataKey="expenses"
                stroke="#f97316"
                strokeWidth={2}
                fill="url(#expenseGradMain)"
                activeDot={{
                  r: 6,
                  fill: "#f97316",
                  stroke: "#0A0E17",
                  strokeWidth: 2,
                }}
              />
              <Line
                type="monotone"
                dataKey="netSavings"
                stroke="#F59E0B"
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={false}
                activeDot={{
                  r: 6,
                  fill: "#F59E0B",
                  stroke: "#0A0E17",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
