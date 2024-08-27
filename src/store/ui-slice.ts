import { UiState } from '@/types/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: UiState = {
  isAuthChecked: false,
};

export const uiSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
  },
});

export const { setIsAuthChecked } = uiSlice.actions;

export const uiReducer = uiSlice.reducer;
