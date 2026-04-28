// ─────────────────────────────────────────────────────────────────────────────
// apiClient.ts
//
// This file has two modes controlled by the VITE_USE_MOCK env var:
//
//   VITE_USE_MOCK=true  → reads from mock data (current state)
//   VITE_USE_MOCK=false → hits the real NestJS backend
//
// Components never import from mocks/index.ts directly.
// They always go through this file. When the backend is ready, only
// this file changes — zero component changes needed.
// ─────────────────────────────────────────────────────────────────────────────

import type {
  ApiResponse,
  User,
  Account,
  Transaction,
  PaginatedTransactions,
  InsightsDashboard,
  UpdateProfileDto,
  CreateAccountDto,
  UpdateAccountDto,
  CreateTransactionDto,
  UpdateTransactionDto,
  TransactionFilters,
} from '../types';

import { mockApi, MOCK_TRANSACTIONS } from '../mocks/mockdata';

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK !== 'false'; // Default to true if not set to 'false'
const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080/api';

// ─────────────────────────────────────────────────────────────────────────────
// Core fetch wrapper — only used when USE_MOCK is false
// Injects Authorization header, unwraps errors into thrown ApiError shape
// ─────────────────────────────────────────────────────────────────────────────

async function request<T>(
  path: string,
  options: RequestInit = {},
  token?: string,
): Promise<ApiResponse<T>> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: { ...headers, ...(options.headers as Record<string, string>) },
  });

  if (!res.ok) {
    const error = await res.json();
    throw error;
  }

  return res.json() as Promise<ApiResponse<T>>;
}

// ─────────────────────────────────────────────────────────────────────────────
// Users
// ─────────────────────────────────────────────────────────────────────────────

export async function getUser(token?: string): Promise<ApiResponse<User>> {
  if (USE_MOCK) return mockApi.getUser();
  return request<User>('/users/me', {}, token);
}

export async function updateUser(
  dto: UpdateProfileDto,
  token?: string,
): Promise<ApiResponse<User>> {
  if (USE_MOCK) return mockApi.getUser();
  return request<User>('/users/me', { method: 'PATCH', body: JSON.stringify(dto) }, token);
}

export async function deleteUser(token?: string): Promise<void> {
  if (USE_MOCK) return;
  await request<void>('/users/me', { method: 'DELETE' }, token);
}

// ─────────────────────────────────────────────────────────────────────────────
// Accounts
// ─────────────────────────────────────────────────────────────────────────────

export async function getAccounts(token?: string): Promise<ApiResponse<Account[]>> {
  if (USE_MOCK) return mockApi.getAccounts();
  return request<Account[]>('/accounts', {}, token);
}

export async function getAccount(
  id: string,
  token?: string,
): Promise<ApiResponse<Account>> {
  if (USE_MOCK) return mockApi.getAccount(id);
  return request<Account>(`/accounts/${id}`, {}, token);
}

export async function createAccount(
  dto: CreateAccountDto,
  token?: string,
): Promise<ApiResponse<Account>> {
  if (USE_MOCK) return mockApi.getAccount('acc-uuid-0001');
  return request<Account>('/accounts', { method: 'POST', body: JSON.stringify(dto) }, token);
}

export async function updateAccount(
  id: string,
  dto: UpdateAccountDto,
  token?: string,
): Promise<ApiResponse<Account>> {
  if (USE_MOCK) return mockApi.getAccount(id);
  return request<Account>(`/accounts/${id}`, { method: 'PATCH', body: JSON.stringify(dto) }, token);
}

export async function deleteAccount(
  id: string,
  token?: string,
): Promise<void> {
  if (USE_MOCK) return;
  await request<void>(`/accounts/${id}`, { method: 'DELETE' }, token);
}

// ─────────────────────────────────────────────────────────────────────────────
// Transactions
// ─────────────────────────────────────────────────────────────────────────────

export async function getTransactions(
  filters: Partial<TransactionFilters> = {},
  token?: string,
): Promise<ApiResponse<PaginatedTransactions>> {
  if (USE_MOCK) {
    return mockApi.getTransactions(filters.page, filters.limit, {
      accountId: filters.accountId,
      type: filters.type,
      category: filters.category,
      search: filters.search,
    });
  }

  const params = new URLSearchParams();
  if (filters.accountId) params.set('accountId', filters.accountId);
  if (filters.dateRange) params.set('dateRange', filters.dateRange);
  if (filters.type) params.set('type', filters.type);
  if (filters.category) params.set('category', filters.category);
  if (filters.search) params.set('search', filters.search);
  if (filters.page) params.set('page', String(filters.page));
  if (filters.limit) params.set('limit', String(filters.limit));

  return request<PaginatedTransactions>(`/transactions?${params.toString()}`, {}, token);
}

export async function getTransaction(
  id: string,
  token?: string,
): Promise<ApiResponse<Transaction>> {
  if (USE_MOCK) {
    const tx = MOCK_TRANSACTIONS_MAP[id];
    return { data: tx, timestamp: new Date().toISOString() };
  }
  return request<Transaction>(`/transactions/${id}`, {}, token);
}

export async function createTransaction(
  dto: CreateTransactionDto,
  token?: string,
): Promise<ApiResponse<Transaction>> {
  if (USE_MOCK) {
    const newTx: Transaction = {
      id: `txn-uuid-mock-${Date.now()}`,
      accountId: dto.accountId,
      description: dto.description,
      category: dto.category,
      type: dto.type,
      amount: String(dto.amount),
      date: dto.date,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return { data: newTx, timestamp: new Date().toISOString() };
  }
  return request<Transaction>('/transactions', { method: 'POST', body: JSON.stringify(dto) }, token);
}

export async function updateTransaction(
  id: string,
  dto: UpdateTransactionDto,
  token?: string,
): Promise<ApiResponse<Transaction>> {
  if (USE_MOCK) return getTransaction(id, token);
  return request<Transaction>(`/transactions/${id}`, { method: 'PATCH', body: JSON.stringify(dto) }, token);
}

export async function deleteTransaction(
  id: string,
  token?: string,
): Promise<void> {
  if (USE_MOCK) return;
  await request<void>(`/transactions/${id}`, { method: 'DELETE' }, token);
}

// ─────────────────────────────────────────────────────────────────────────────
// Insights
// ─────────────────────────────────────────────────────────────────────────────

export async function getInsights(
  accountId?: string,
  months?: number,
  token?: string,
): Promise<ApiResponse<InsightsDashboard>> {
  if (USE_MOCK) return mockApi.getInsights(accountId);

  const params = new URLSearchParams();
  if (accountId) params.set('accountId', accountId);
  if (months) params.set('months', String(months));

  return request<InsightsDashboard>(`/insights?${params.toString()}`, {}, token);
}

// ─────────────────────────────────────────────────────────────────────────────
// Internal — mock lookup map (used only by getTransaction in mock mode)
// ─────────────────────────────────────────────────────────────────────────────


const MOCK_TRANSACTIONS_MAP = Object.fromEntries(
  MOCK_TRANSACTIONS.map((t) => [t.id, t]),
);
