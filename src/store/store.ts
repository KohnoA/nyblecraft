import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { notesSlice } from './slices/notesSlice';

const rootReducer = combineReducers({
  [notesSlice.name]: notesSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
