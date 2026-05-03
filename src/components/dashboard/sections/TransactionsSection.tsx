"use client";
import { useState, useEffect } from "react";
import { getTransactions } from "@/src/lib/apiClient";
import type { PaginatedTransactions, TransactionFilters } from "@/src/types";
import { PageLoader, PageError } from "@/src/components/ui/LoadingStates";
import { formatCurrency } from "@/src/lib/utils";
import { ArrowUpRight, ArrowDownLeft, Search } from "lucide-react";

const CATEGORIES = [
  "Food",
  "Utilities",
  "Income",
  "Dining",
  "Transport",
  "Entertainment",
  "Shopping",
  "Health",
  "Other",
];

export default function TransactionsSection() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [transactions, setTransactions] =
    useState<PaginatedTransactions | null>(null);
  const [filters, setFilters] = useState<Partial<TransactionFilters>>({
    page: 1,
    limit: 10,
    type: "all",
    category: "all",
    dateRange: "all",
    search: "",
  });

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getTransactions(filters);
      setTransactions(res.data);
    } catch (err: any) {
      setError(err.message || "Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [filters]);

  // If initial load fails
  if (loading && !transactions) return <PageLoader />;
  if (error && !transactions)
    return <PageError message={error} onRetry={loadData} />;

  const handleFilterChange = (
    field: keyof TransactionFilters,
    value: string | number
  ) => {
    setFilters((prev) => ({ ...prev, [field]: value, page: 1 }));
  };

  const clearFilters = () => {
    setFilters({
      page: 1,
      limit: 10,
      type: "all",
      category: "all",
      dateRange: "all",
      search: "",
    });
  };

  const totalPages = transactions?.meta.totalPages || 1;
  const currentPage = filters.page || 1;
  const totalItems = transactions?.meta.total || 0;

  const startItem = (currentPage - 1) * (filters.limit || 10) + 1;
  const endItem = Math.min(
    currentPage * (filters.limit || 10),
    totalItems
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Transactions</h1>
          <p className="text-sm text-slate-400 mt-1">
            Review and search your past transactions.
          </p>
        </div>
        {transactions?.meta.total !== undefined && (
          <div className="bg-white/5 rounded-full px-3 py-1 text-xs font-mono text-slate-400 w-fit">
            {transactions.meta.total} transactions
          </div>
        )}
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-3 items-center">
        {/* Search */}
        <div className="flex-1 min-w-[200px] relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-500" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50"
          />
        </div>

        {/* Type Filter */}
        <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl">
          {["all", "income", "expense"].map((type) => {
            const isActive = filters.type === type;
            return (
              <button
                key={type}
                onClick={() => handleFilterChange("type", type)}
                className={`px-4 py-1.5 rounded-lg text-sm capitalize transition-colors ${isActive
                  ? "bg-primary text-navy font-bold shadow-sm"
                  : "text-slate-400 hover:bg-white/10"
                  }`}
              >
                {type}
              </button>
            );
          })}
        </div>

        {/* Category Filter */}
        <select
          value={filters.category}
          onChange={(e) => handleFilterChange("category", e.target.value)}
          className="bg-navy-light border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-primary/50"
        >
          <option value="all">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Date Range Filter */}
        <select
          value={filters.dateRange}
          onChange={(e) => handleFilterChange("dateRange", e.target.value)}
          className="bg-navy-light border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-primary/50"
        >
          <option value="all">All Time</option>
          <option value="7days">Last 7 Days</option>
          <option value="30days">Last 30 Days</option>
          <option value="90days">Last 90 Days</option>
          <option value="year">This Year</option>
        </select>
      </div>

      {loading && transactions && (
        <div className="flex justify-center my-4">
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent"></div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="rounded-2xl bg-navy-light border border-white/5 overflow-hidden">
        {transactions?.data.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center p-12 text-center text-slate-400 min-h-[400px]">
            <Search className="w-16 h-16 text-slate-700 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">
              No transactions found
            </h3>
            <p className="text-sm mb-6">Try adjusting your filters</p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm transition-colors border border-white/10"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            {/* Desktop Table (hidden on mobile) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5">
                    <th className="text-[10px] uppercase tracking-widest text-slate-500 font-bold px-4 py-3">
                      Description
                    </th>
                    <th className="text-[10px] uppercase tracking-widest text-slate-500 font-bold px-4 py-3">
                      Category
                    </th>
                    <th className="text-[10px] uppercase tracking-widest text-slate-500 font-bold px-4 py-3">
                      Account
                    </th>
                    <th className="text-[10px] uppercase tracking-widest text-slate-500 font-bold px-4 py-3">
                      Date
                    </th>
                    <th className="text-[10px] uppercase tracking-widest text-slate-500 font-bold px-4 py-3 text-right">
                      Amount
                    </th>
                    <th className="text-[10px] uppercase tracking-widest text-slate-500 font-bold px-4 py-3">
                      Type
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactions?.data.map((tx) => {
                    const isIncome = tx.type === "income";
                    const formattedDate = new Date(tx.date).toLocaleDateString(
                      "en-US",
                      { month: "short", day: "numeric", year: "numeric" }
                    );
                    return (
                      <tr
                        key={tx.id}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                      >
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isIncome
                                ? "bg-primary/10 text-primary"
                                : "bg-orange-500/10 text-orange-400"
                                }`}
                            >
                              {isIncome ? (
                                <ArrowDownLeft className="w-4 h-4" />
                              ) : (
                                <ArrowUpRight className="w-4 h-4" />
                              )}
                            </div>
                            <span className="text-sm font-semibold text-white truncate max-w-[200px]">
                              {tx.description}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className="bg-white/5 rounded-full px-2.5 py-0.5 text-[10px] font-mono text-slate-400 border border-white/5">
                            {tx.category}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-[10px] font-mono text-slate-500 uppercase">
                            ****{tx.accountId.slice(-4)}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-slate-400 whitespace-nowrap">
                          {formattedDate}
                        </td>
                        <td className="px-4 py-4 text-right">
                          <span
                            className={`font-mono text-sm ${isIncome ? "text-primary" : "text-slate-200"
                              }`}
                          >
                            {isIncome ? "+" : "-"}
                            {formatCurrency(parseFloat(tx.amount))}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`text-[10px] font-bold uppercase rounded-full px-2 py-0.5 tracking-wider ${isIncome
                              ? "bg-primary/10 text-primary"
                              : "bg-orange-500/10 text-orange-400"
                              }`}
                          >
                            {tx.type}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards (hidden on desktop) */}
            <div className="md:hidden flex flex-col divide-y divide-white/5">
              {transactions?.data.map((tx) => {
                const isIncome = tx.type === "income";
                const formattedDate = new Date(tx.date).toLocaleDateString(
                  "en-US",
                  { month: "short", day: "numeric" }
                );
                return (
                  <div key={tx.id} className="p-4 hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
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
                        <p className="text-[10px] font-mono text-slate-500 mt-0.5">
                          {tx.category} • {formattedDate}
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
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Pagination Bar */}
      {transactions && transactions.data.length > 0 && (
        <div className="flex items-center justify-between mt-6 flex-wrap gap-4">
          <div className="text-xs text-slate-500 font-mono">
            Showing {startItem}–{endItem} of {totalItems}
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => handleFilterChange("page", currentPage - 1)}
              className="px-3 py-1.5 rounded-lg text-sm text-slate-400 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              Prev
            </button>
            <div className="flex items-center gap-1">
              {/* Simple page numbers */}
              {Array.from({ length: totalPages }).map((_, i) => {
                const pageNum = i + 1;
                // Only show a few pages around current to avoid long list
                if (
                  pageNum === 1 ||
                  pageNum === totalPages ||
                  Math.abs(currentPage - pageNum) <= 1
                ) {
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handleFilterChange("page", pageNum)}
                      className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-mono transition-colors ${currentPage === pageNum
                        ? "bg-primary text-navy font-bold"
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                        }`}
                    >
                      {pageNum}
                    </button>
                  );
                } else if (
                  pageNum === currentPage - 2 ||
                  pageNum === currentPage + 2
                ) {
                  return (
                    <span key={pageNum} className="text-slate-600 px-1">
                      ...
                    </span>
                  );
                }
                return null;
              })}
            </div>
            <button
              disabled={currentPage === totalPages}
              onClick={() => handleFilterChange("page", currentPage + 1)}
              className="px-3 py-1.5 rounded-lg text-sm text-slate-400 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
