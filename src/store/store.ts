import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { notesSlice } from './slices/notesSlice';
import { filterSlice } from './slices/filterSlice';

const rootReducer = combineReducers({
  [notesSlice.name]: notesSlice.reducer,
  [filterSlice.name]: filterSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
