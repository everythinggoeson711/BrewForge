import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import recipesReducer from '../features/recipes/recipesSlice';
import branchesReducer from '../features/branches/branchesSlice';
import trainingReducer from '../features/training/trainingSlice';
import certificationReducer from '../features/certification/certificationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    recipes: recipesReducer,
    branches: branchesReducer,
    training: trainingReducer,
    certification: certificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
