import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type SopStatus = 'draft' | 'validated' | 'published';

export interface Recipe {
  id: string;
  name: string;
  version: number;
  status: SopStatus;
  updatedAt: string;
}

interface RecipesState {
  items: Recipe[];
}

const initialState: RecipesState = {
  items: [
    { id: 'r1', name: 'Iced Peach Oolong', version: 3, status: 'published', updatedAt: '2026-09-10' },
    { id: 'r2', name: 'Brown Sugar Boba Milk Tea', version: 2, status: 'validated', updatedAt: '2026-09-15' },
    { id: 'r3', name: 'Espresso Tonic', version: 1, status: 'draft', updatedAt: '2026-09-19' },
  ],
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    addRecipe: (state, action: PayloadAction<Recipe>) => {
      state.items.push(action.payload);
    },
    setRecipeStatus: (state, action: PayloadAction<{ id: string; status: SopStatus }>) => {
      const recipe = state.items.find((item) => item.id === action.payload.id);
      if (recipe) {
        recipe.status = action.payload.status;
      }
    },
  },
});

export const { addRecipe, setRecipeStatus } = recipesSlice.actions;
export default recipesSlice.reducer;
