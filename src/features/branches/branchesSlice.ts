import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Branch {
  id: string;
  name: string;
  city: string;
  equipmentCount: number;
  certifiedStaff: number;
}

interface BranchesState {
  items: Branch[];
  selectedBranchId: string | null;
}

const initialState: BranchesState = {
  items: [
    { id: 'b1', name: 'Branch Nguyen Hue', city: 'Ho Chi Minh City', equipmentCount: 12, certifiedStaff: 8 },
    { id: 'b2', name: 'Branch Hoan Kiem', city: 'Hanoi', equipmentCount: 9, certifiedStaff: 5 },
  ],
  selectedBranchId: null,
};

const branchesSlice = createSlice({
  name: 'branches',
  initialState,
  reducers: {
    selectBranch: (state, action: PayloadAction<string | null>) => {
      state.selectedBranchId = action.payload;
    },
  },
});

export const { selectBranch } = branchesSlice.actions;
export default branchesSlice.reducer;
