// src/types/index.ts

export interface ApiResponse<T> {
  data: T;
  timestamp: string;
}

export interface ApiError {
  statusCode: number;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
  timestamp: string;
  path: string;
}

// ─── Enums ───────────────────────────────────────────────────────────────────

export type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY';
export type DateFormat = 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD';
export type FirstDayOfWeek = 'Sunday' | 'Monday';
export type Theme = 'light' | 'dark';
export type AccountType = 'Checking' | 'Savings' | 'Investment';
export type TransactionType = 'income' | 'expense';
export type TransactionCategory =
  | 'Food'
  | 'Utilities'
  | 'Income'
  | 'Dining'
  | 'Transport'
  | 'Entertainment'
  | 'Shopping'
  | 'Health'
  | 'Other';

// ─── User ────────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  currency: Currency;
  dateFormat: DateFormat;
  firstDayOfWeek: FirstDayOfWeek;
  theme: Theme;
  emailNotifications: boolean;
  weeklyInsights: boolean;
  pushNotifications: boolean;
  monthlyReports: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─── Account ─────────────────────────────────────────────────────────────────

export interface Account {
  id: string;
  userId: string;
  bankName: string;
  accountType: AccountType;
  accountNumberMasked: string;
  balance: string; // decimal string from Postgres — use parseFloat() to display
  nickname: string | null;
  createdAt: string;
  updatedAt: string;
}

// ─── Transaction ─────────────────────────────────────────────────────────────

export interface Transaction {
  id: string;
  accountId: string;
  description: string;
  category: TransactionCategory;
  type: TransactionType;
  amount: string; // decimal string from Postgres — use parseFloat() to display
  date: string;   // YYYY-MM-DD
  createdAt: string;
  updatedAt: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedTransactions {
  data: Transaction[];
  meta: PaginationMeta;
}

// ─── Transaction Filters ─────────────────────────────────────────────────────

export type DateRangeFilter = 'all' | '7days' | '30days' | '90days' | 'year';
export type TransactionTypeFilter = 'all' | 'income' | 'expense';
export type CategoryFilter = TransactionCategory | 'all';

export interface TransactionFilters {
  accountId?: string;
  dateRange: DateRangeFilter;
  type: TransactionTypeFilter;
  category: CategoryFilter;
  search: string;
  page: number;
  limit: number;
}

// ─── Insights ────────────────────────────────────────────────────────────────

export type HealthStatus = 'Poor' | 'Fair' | 'Good' | 'Excellent';

export interface HealthScore {
  score: number;
  status: HealthStatus;
}

export interface MonthSummary {
  income: number;
  expenses: number;
  netSavings: number;
  savingsRate: number;
}

export interface CategoryBreakdown {
  category: TransactionCategory;
  totalSpent: number;
  percentage: number;
  transactionCount: number;
}

export interface TrendPoint {
  month: string;
  year: number;
  monthNum: number;
  income: number;
  expenses: number;
  netSavings: number;
}

export interface InsightsDashboard {
  health: HealthScore;
  currentMonth: MonthSummary;
  spendingBreakdown: CategoryBreakdown[];
  trend: TrendPoint[];
}

// ─── DTOs ────────────────────────────────────────────────────────────────────

export interface UpdateProfileDto {
  name?: string;
  currency?: Currency;
  dateFormat?: DateFormat;
  firstDayOfWeek?: FirstDayOfWeek;
  theme?: Theme;
  emailNotifications?: boolean;
  weeklyInsights?: boolean;
  pushNotifications?: boolean;
  monthlyReports?: boolean;
}

export interface CreateAccountDto {
  bankName: string;
  accountType: AccountType;
  accountNumber: string;
  balance: number;
  nickname?: string;
}

export interface UpdateAccountDto {
  nickname?: string;
  balance?: number;
}

export interface CreateTransactionDto {
  accountId: string;
  description: string;
  category: TransactionCategory;
  type: TransactionType;
  amount: number;
  date: string;
}

export interface UpdateTransactionDto {
  description?: string;
  category?: TransactionCategory;
  amount?: number;
  date?: string;
}
