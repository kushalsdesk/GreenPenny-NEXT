// src/mocks/mockdata.ts

import type {
  ApiResponse,
  User,
  Account,
  Transaction,
  PaginatedTransactions,
  InsightsDashboard,
  CategoryBreakdown,
  TrendPoint,
} from '@/src/types';

function mockResponse<T>(data: T): ApiResponse<T> {
  return { data, timestamp: new Date().toISOString() };
}

// ─── Mock User ───────────────────────────────────────────────────────────────

export const MOCK_USER: User = {
  id: '10714413-5eb9-4c4f-bb58-c509ada847be',
  email: 'kushal99mondal@gmail.com',
  name: 'Kushal Mondal',
  avatarUrl: 'https://lh3.googleusercontent.com/a/ACg8ocIX0v-XQsp9dvHap2uiz1Wt6kvS-BJvbvlGGdekEKxT8e3PRlhIyw=s96-c',
  currency: 'USD',
  dateFormat: 'MM/DD/YYYY',
  firstDayOfWeek: 'Sunday',
  theme: 'dark',
  emailNotifications: true,
  weeklyInsights: true,
  pushNotifications: false,
  monthlyReports: true,
  createdAt: '2026-01-13T04:00:44.638785Z',
  updatedAt: '2026-04-26T05:28:15.669287Z',
};

// ─── Mock Accounts ───────────────────────────────────────────────────────────

export const MOCK_ACCOUNTS: Account[] = [
  {
    id: 'acc-uuid-0001',
    userId: '10714413-5eb9-4c4f-bb58-c509ada847be',
    bankName: 'Chase',
    accountType: 'Checking',
    accountNumberMasked: '****1234',
    balance: '12458.50',
    nickname: 'Main Checking',
    createdAt: '2026-01-13T04:00:44.638785Z',
    updatedAt: '2026-04-26T05:28:15.669287Z',
  },
  {
    id: 'acc-uuid-0002',
    userId: '10714413-5eb9-4c4f-bb58-c509ada847be',
    bankName: 'Bank of America',
    accountType: 'Savings',
    accountNumberMasked: '****5678',
    balance: '45230.00',
    nickname: 'Emergency Fund',
    createdAt: '2026-01-13T04:00:44.638785Z',
    updatedAt: '2026-04-26T05:28:15.669287Z',
  },
];

// ─── Mock Transactions ───────────────────────────────────────────────────────

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 'txn-uuid-0001',
    accountId: 'acc-uuid-0001',
    description: 'Salary Deposit',
    category: 'Income',
    type: 'income',
    amount: '4200.00',
    date: '2026-04-15',
    createdAt: '2026-04-15T09:00:00.000Z',
    updatedAt: '2026-04-15T09:00:00.000Z',
  },
  {
    id: 'txn-uuid-0002',
    accountId: 'acc-uuid-0001',
    description: 'Grocery Store',
    category: 'Food',
    type: 'expense',
    amount: '156.50',
    date: '2026-04-14',
    createdAt: '2026-04-14T11:30:00.000Z',
    updatedAt: '2026-04-14T11:30:00.000Z',
  },
  {
    id: 'txn-uuid-0003',
    accountId: 'acc-uuid-0001',
    description: 'Electric Bill',
    category: 'Utilities',
    type: 'expense',
    amount: '89.99',
    date: '2026-04-13',
    createdAt: '2026-04-13T08:00:00.000Z',
    updatedAt: '2026-04-13T08:00:00.000Z',
  },
  {
    id: 'txn-uuid-0004',
    accountId: 'acc-uuid-0002',
    description: 'Interest Payment',
    category: 'Income',
    type: 'income',
    amount: '45.30',
    date: '2026-04-12',
    createdAt: '2026-04-12T00:00:00.000Z',
    updatedAt: '2026-04-12T00:00:00.000Z',
  },
  {
    id: 'txn-uuid-0005',
    accountId: 'acc-uuid-0001',
    description: 'Coffee Shop',
    category: 'Dining',
    type: 'expense',
    amount: '5.75',
    date: '2026-04-11',
    createdAt: '2026-04-11T08:45:00.000Z',
    updatedAt: '2026-04-11T08:45:00.000Z',
  },
  {
    id: 'txn-uuid-0006',
    accountId: 'acc-uuid-0001',
    description: 'Gas Station',
    category: 'Transport',
    type: 'expense',
    amount: '62.40',
    date: '2026-04-10',
    createdAt: '2026-04-10T17:20:00.000Z',
    updatedAt: '2026-04-10T17:20:00.000Z',
  },
  {
    id: 'txn-uuid-0007',
    accountId: 'acc-uuid-0001',
    description: 'Movie Ticket',
    category: 'Entertainment',
    type: 'expense',
    amount: '18.00',
    date: '2026-04-09',
    createdAt: '2026-04-09T19:00:00.000Z',
    updatedAt: '2026-04-09T19:00:00.000Z',
  },
  {
    id: 'txn-uuid-0008',
    accountId: 'acc-uuid-0001',
    description: 'Amazon Purchase',
    category: 'Shopping',
    type: 'expense',
    amount: '79.99',
    date: '2026-04-08',
    createdAt: '2026-04-08T14:00:00.000Z',
    updatedAt: '2026-04-08T14:00:00.000Z',
  },
  {
    id: 'txn-uuid-0009',
    accountId: 'acc-uuid-0002',
    description: 'Doctor Visit',
    category: 'Health',
    type: 'expense',
    amount: '150.00',
    date: '2026-04-07',
    createdAt: '2026-04-07T10:00:00.000Z',
    updatedAt: '2026-04-07T10:00:00.000Z',
  },
  {
    id: 'txn-uuid-0010',
    accountId: 'acc-uuid-0001',
    description: 'Restaurant',
    category: 'Dining',
    type: 'expense',
    amount: '85.50',
    date: '2026-04-06',
    createdAt: '2026-04-06T20:00:00.000Z',
    updatedAt: '2026-04-06T20:00:00.000Z',
  },
  {
    id: 'txn-uuid-0011',
    accountId: 'acc-uuid-0001',
    description: 'Internet Bill',
    category: 'Utilities',
    type: 'expense',
    amount: '79.99',
    date: '2026-04-05',
    createdAt: '2026-04-05T09:00:00.000Z',
    updatedAt: '2026-04-05T09:00:00.000Z',
  },
  {
    id: 'txn-uuid-0012',
    accountId: 'acc-uuid-0001',
    description: 'Freelance Payment',
    category: 'Income',
    type: 'income',
    amount: '850.00',
    date: '2026-04-04',
    createdAt: '2026-04-04T12:00:00.000Z',
    updatedAt: '2026-04-04T12:00:00.000Z',
  },
  {
    id: 'txn-uuid-0013',
    accountId: 'acc-uuid-0001',
    description: 'Grocery Shopping',
    category: 'Food',
    type: 'expense',
    amount: '127.65',
    date: '2026-04-03',
    createdAt: '2026-04-03T16:00:00.000Z',
    updatedAt: '2026-04-03T16:00:00.000Z',
  },
  {
    id: 'txn-uuid-0014',
    accountId: 'acc-uuid-0001',
    description: 'Gym Membership',
    category: 'Health',
    type: 'expense',
    amount: '49.99',
    date: '2026-04-02',
    createdAt: '2026-04-02T07:00:00.000Z',
    updatedAt: '2026-04-02T07:00:00.000Z',
  },
  {
    id: 'txn-uuid-0015',
    accountId: 'acc-uuid-0001',
    description: 'Uber Trip',
    category: 'Transport',
    type: 'expense',
    amount: '24.30',
    date: '2026-04-01',
    createdAt: '2026-04-01T22:00:00.000Z',
    updatedAt: '2026-04-01T22:00:00.000Z',
  },
  {
    id: 'txn-uuid-0016',
    accountId: 'acc-uuid-0002',
    description: 'Department Store',
    category: 'Shopping',
    type: 'expense',
    amount: '245.75',
    date: '2026-03-31',
    createdAt: '2026-03-31T14:00:00.000Z',
    updatedAt: '2026-03-31T14:00:00.000Z',
  },
  {
    id: 'txn-uuid-0017',
    accountId: 'acc-uuid-0001',
    description: 'Salary Deposit',
    category: 'Income',
    type: 'income',
    amount: '4200.00',
    date: '2026-03-30',
    createdAt: '2026-03-30T09:00:00.000Z',
    updatedAt: '2026-03-30T09:00:00.000Z',
  },
  {
    id: 'txn-uuid-0018',
    accountId: 'acc-uuid-0001',
    description: 'Coffee and Breakfast',
    category: 'Dining',
    type: 'expense',
    amount: '12.50',
    date: '2026-03-29',
    createdAt: '2026-03-29T08:30:00.000Z',
    updatedAt: '2026-03-29T08:30:00.000Z',
  },
  {
    id: 'txn-uuid-0019',
    accountId: 'acc-uuid-0001',
    description: 'Water Bill',
    category: 'Utilities',
    type: 'expense',
    amount: '45.00',
    date: '2026-03-28',
    createdAt: '2026-03-28T09:00:00.000Z',
    updatedAt: '2026-03-28T09:00:00.000Z',
  },
  {
    id: 'txn-uuid-0020',
    accountId: 'acc-uuid-0001',
    description: 'Concert Tickets',
    category: 'Entertainment',
    type: 'expense',
    amount: '150.00',
    date: '2026-03-27',
    createdAt: '2026-03-27T18:00:00.000Z',
    updatedAt: '2026-03-27T18:00:00.000Z',
  },
];

// ─── Paginator ───────────────────────────────────────────────────────────────

export function getMockPaginatedTransactions(
  page = 1,
  limit = 10,
  filters?: {
    accountId?: string;
    type?: string;
    category?: string;
    search?: string;
  },
): PaginatedTransactions {
  let filtered = [...MOCK_TRANSACTIONS];

  if (filters?.accountId) {
    filtered = filtered.filter((t) => t.accountId === filters.accountId);
  }
  if (filters?.type && filters.type !== 'all') {
    filtered = filtered.filter((t) => t.type === filters.type);
  }
  if (filters?.category && filters.category !== 'all') {
    filtered = filtered.filter((t) => t.category === filters.category);
  }
  if (filters?.search) {
    filtered = filtered.filter((t) =>
      t.description.toLowerCase().includes(filters.search!.toLowerCase()),
    );
  }

  const total = filtered.length;
  const startIndex = (page - 1) * limit;
  const data = filtered.slice(startIndex, startIndex + limit);

  return {
    data,
    meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
  };
}

// ─── Mock Insights ───────────────────────────────────────────────────────────

const MOCK_SPENDING_BREAKDOWN: CategoryBreakdown[] = [
  { category: 'Food', totalSpent: 284.15, percentage: 32, transactionCount: 2 },
  { category: 'Utilities', totalSpent: 214.98, percentage: 25, transactionCount: 3 },
  { category: 'Dining', totalSpent: 103.75, percentage: 12, transactionCount: 3 },
  { category: 'Transport', totalSpent: 86.70, percentage: 10, transactionCount: 2 },
  { category: 'Health', totalSpent: 199.99, percentage: 11, transactionCount: 2 },
  { category: 'Shopping', totalSpent: 79.99, percentage: 9, transactionCount: 1 },
  { category: 'Entertainment', totalSpent: 18.00, percentage: 2, transactionCount: 1 },
];

const MOCK_TREND: TrendPoint[] = [
  { month: 'Nov', year: 2025, monthNum: 11, income: 4100, expenses: 2600, netSavings: 1500 },
  { month: 'Dec', year: 2025, monthNum: 12, income: 5450, expenses: 3100, netSavings: 2350 },
  { month: 'Jan', year: 2026, monthNum: 1, income: 4200, expenses: 2400, netSavings: 1800 },
  { month: 'Feb', year: 2026, monthNum: 2, income: 4200, expenses: 2750, netSavings: 1450 },
  { month: 'Mar', year: 2026, monthNum: 3, income: 5050, expenses: 2900, netSavings: 2150 },
  { month: 'Apr', year: 2026, monthNum: 4, income: 5095, expenses: 987, netSavings: 4108 },
];

const MOCK_INSIGHTS_DASHBOARD: InsightsDashboard = {
  health: { score: 78, status: 'Good' },
  currentMonth: {
    income: 5095.30,
    expenses: 987.12,
    netSavings: 4108.18,
    savingsRate: 81,
  },
  spendingBreakdown: MOCK_SPENDING_BREAKDOWN,
  trend: MOCK_TREND,
};

const MOCK_INSIGHTS_BY_ACCOUNT: Record<string, InsightsDashboard> = {
  'acc-uuid-0001': {
    health: { score: 72, status: 'Good' },
    currentMonth: {
      income: 5050.00,
      expenses: 837.13,
      netSavings: 4212.87,
      savingsRate: 83,
    },
    spendingBreakdown: MOCK_SPENDING_BREAKDOWN.filter((b) => b.category !== 'Health'),
    trend: MOCK_TREND,
  },
  'acc-uuid-0002': {
    health: { score: 92, status: 'Excellent' },
    currentMonth: {
      income: 45.30,
      expenses: 150.00,
      netSavings: -104.70,
      savingsRate: 0,
    },
    spendingBreakdown: [
      { category: 'Health', totalSpent: 150.00, percentage: 100, transactionCount: 1 },
    ],
    trend: MOCK_TREND.map((t) => ({ ...t, income: 45, expenses: 12, netSavings: 33 })),
  },
};

// ─── Mock API ─────────────────────────────────────────────────────────────────
// Same function signatures as the real apiClient — components never change.

const delay = (ms = 600) => new Promise((r) => setTimeout(r, ms));

export const mockApi = {
  getUser: async () => {
    await delay();
    return mockResponse(MOCK_USER);
  },

  getAccounts: async () => {
    await delay();
    return mockResponse(MOCK_ACCOUNTS);
  },

  getAccount: async (id: string) => {
    await delay(400);
    return mockResponse(MOCK_ACCOUNTS.find((a) => a.id === id)!);
  },

  getTransactions: async (
    page = 1,
    limit = 10,
    filters?: Parameters<typeof getMockPaginatedTransactions>[2],
  ) => {
    await delay();
    return mockResponse(getMockPaginatedTransactions(page, limit, filters));
  },

  getTransaction: async (id: string) => {
    await delay(400);
    const tx = MOCK_TRANSACTIONS.find((t) => t.id === id)!;
    return mockResponse(tx);
  },

  getInsights: async (accountId?: string) => {
    await delay();
    if (accountId && MOCK_INSIGHTS_BY_ACCOUNT[accountId]) {
      return mockResponse(MOCK_INSIGHTS_BY_ACCOUNT[accountId]);
    }
    return mockResponse(MOCK_INSIGHTS_DASHBOARD);
  },
};
