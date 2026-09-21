import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type UserRole = 'admin' | 'rnd' | 'trainer' | 'trainee' | 'auditor';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  branchId: string | null;
}

interface AuthState {
  currentUser: AuthUser | null;
}

const initialState: AuthState = {
  currentUser: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ email: string }>) => {
      state.currentUser = {
        id: 'u1',
        name: action.payload.email.split('@')[0] || 'BrewForge User',
        email: action.payload.email,
        role: 'admin',
        branchId: null,
      };
    },
    logout: (state) => {
      state.currentUser = null;
    },
    setRole: (state, action: PayloadAction<UserRole>) => {
      if (state.currentUser) {
        state.currentUser.role = action.payload;
      }
    },
  },
});

export const { login, logout, setRole } = authSlice.actions;
export default authSlice.reducer;
