import { configureStore } from '@reduxjs/toolkit';
import { tableReducer } from './table-slice';
import { authReducer } from './auth-slice';
import { uiReducer } from './ui-slice';

export const store = configureStore({
  reducer: {
    tableReducer: tableReducer,
    authReducer: authReducer,
    uiReducer: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
