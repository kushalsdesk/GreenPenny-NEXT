# Greenpenny Finance Platform - Integration Context & Roadmap

## Project Overview
This project consists of a NextJS (v15) frontend and a NestJS (v11) backend. The backend API, database schemas (PostgreSQL + Drizzle), and authentication (Supabase) are fully implemented. The frontend UI components are built using Tailwind v4, shadcn/Radix UI, and Framer Motion. 

The goal is to wire the frontend to the backend API, replacing mock data with real data fetching, and utilizing Zustand for state management.

## Current Architecture
- **API Client:** `src/lib/apiClient.ts` handles API requests and Supabase token injection.
- **Frontend State:** Managed via Zustand (stores to be implemented/connected).
- **Backend Framework:** NestJS with modules for Accounts, Transactions, Users, and Insights.

## Integration Roadmap

Our approach is iterative. For each section, we will:
1. Define the necessary state (Zustand) if required.
2. Wire up the components to the `apiClient.ts`.
3. Test the integration.
4. `git commit` the progress.
5. Update this `context.md` file to track progress.

### Step 1: Global State Setup (Zustand Stores)
- [x] Create/Update Zustand stores (`useAccountStore`, `useTransactionStore`, `useUserStore`) to manage fetched data and loading states.
- [x] Connect stores to `apiClient.ts` methods.

### Step 2: Dashboard Home (`DashboardHome.tsx`)
- [ ] Fetch current user data (`getUser`).
- [ ] Fetch accounts and calculate total balance (`getAccounts`).
- [ ] Fetch recent transactions (`getTransactions` with limit).
- [ ] Replace static UI placeholders with dynamic state variables.

### Step 3: Transactions Section (`TransactionsSection.tsx`)
- [ ] Fetch all transactions with pagination and filtering (`getTransactions`).
- [ ] Implement create transaction flow (`createTransaction`) from the modal.
- [ ] Implement update/delete transaction flows (`updateTransaction`, `deleteTransaction`).
- [ ] Ensure the global state updates optimistically or triggers a re-fetch.

### Step 4: Insights Section (`InsightsSection.tsx`)
- [ ] Fetch insights data (`getInsights`).
- [ ] Map the API response format to the Recharts data structures.
- [ ] Ensure date ranges and filters apply correctly to the analytics.

### Step 5: Settings & Profile (`SettingsSection.tsx`)
- [ ] Fetch detailed user profile data.
- [ ] Implement update user profile functionality (`updateUser`).
- [ ] Handle account management (e.g., creating/deleting sub-accounts if applicable).

## Progress Tracker
- **Status:** Initializing roadmap.
- **Current Focus:** Step 1 - Global State Setup (Zustand Stores).
