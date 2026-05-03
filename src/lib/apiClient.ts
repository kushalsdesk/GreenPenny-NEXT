// src/lib/apiClient.ts
//
// Two modes controlled by NEXT_PUBLIC_USE_MOCK:
//   NEXT_PUBLIC_USE_MOCK=true  → reads from mock data (default / AI Studio)
//   NEXT_PUBLIC_USE_MOCK=false → hits the real NestJS backend
//
// Token injection: client components call getSessionToken() automatically.
// No component ever passes a token manually.

import { createClient } from '@/src/lib/supabase/client';
import { mockApi } from '@/src/mocks/mockdata';
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
} from '@/src/types';

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK !== 'false';
const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080/api';

// ─── Token helper ─────────────────────────────────────────────────────────────

async function getSessionToken(): Promise<string | undefined> {
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token;
}

// ─── Core fetch wrapper ───────────────────────────────────────────────────────

async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  const token = await getSessionToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers as Record<string, string>),
  };

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw error;
  }

  return res.json() as Promise<ApiResponse<T>>;
}

// ─── Users ────────────────────────────────────────────────────────────────────

export async function getUser(): Promise<ApiResponse<User>> {
  if (USE_MOCK) return mockApi.getUser();
  return request<User>('/users/me');
}

export async function updateUser(dto: UpdateProfileDto): Promise<ApiResponse<User>> {
  if (USE_MOCK) return mockApi.getUser();
  return request<User>('/users/me', { method: 'PATCH', body: JSON.stringify(dto) });
}

export async function deleteUser(): Promise<void> {
  if (USE_MOCK) return;
  await request<void>('/users/me', { method: 'DELETE' });
}

// ─── Accounts ─────────────────────────────────────────────────────────────────

export async function getAccounts(): Promise<ApiResponse<Account[]>> {
  if (USE_MOCK) return mockApi.getAccounts();
  return request<Account[]>('/accounts');
}

export async function getAccount(id: string): Promise<ApiResponse<Account>> {
  if (USE_MOCK) return mockApi.getAccount(id);
  return request<Account>(`/accounts/${id}`);
}

export async function createAccount(dto: CreateAccountDto): Promise<ApiResponse<Account>> {
  if (USE_MOCK) return mockApi.getAccount('acc-uuid-0001');
  return request<Account>('/accounts', { method: 'POST', body: JSON.stringify(dto) });
}

export async function updateAccount(id: string, dto: UpdateAccountDto): Promise<ApiResponse<Account>> {
  if (USE_MOCK) return mockApi.getAccount(id);
  return request<Account>(`/accounts/${id}`, { method: 'PATCH', body: JSON.stringify(dto) });
}

export async function deleteAccount(id: string): Promise<void> {
  if (USE_MOCK) return;
  await request<void>(`/accounts/${id}`, { method: 'DELETE' });
}

// ─── Transactions ─────────────────────────────────────────────────────────────

export async function getTransactions(
  filters: Partial<TransactionFilters> = {},
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

  return request<PaginatedTransactions>(`/transactions?${params.toString()}`);
}

export async function getTransaction(id: string): Promise<ApiResponse<Transaction>> {
  if (USE_MOCK) return mockApi.getTransaction(id);
  return request<Transaction>(`/transactions/${id}`);
}

export async function createTransaction(dto: CreateTransactionDto): Promise<ApiResponse<Transaction>> {
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
  return request<Transaction>('/transactions', { method: 'POST', body: JSON.stringify(dto) });
}

export async function updateTransaction(id: string, dto: UpdateTransactionDto): Promise<ApiResponse<Transaction>> {
  if (USE_MOCK) return mockApi.getTransaction(id);
  return request<Transaction>(`/transactions/${id}`, { method: 'PATCH', body: JSON.stringify(dto) });
}

export async function deleteTransaction(id: string): Promise<void> {
  if (USE_MOCK) return;
  await request<void>(`/transactions/${id}`, { method: 'DELETE' });
}

// ─── Insights ─────────────────────────────────────────────────────────────────

export async function getInsights(
  accountId?: string,
  months?: number,
): Promise<ApiResponse<InsightsDashboard>> {
  if (USE_MOCK) return mockApi.getInsights(accountId);

  const params = new URLSearchParams();
  if (accountId) params.set('accountId', accountId);
  if (months) params.set('months', String(months));

  return request<InsightsDashboard>(`/insights?${params.toString()}`);
}
