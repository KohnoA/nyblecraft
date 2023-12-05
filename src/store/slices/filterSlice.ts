import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface initalStateType {
  tags: string[];
}

const initialState: initalStateType = {
  tags: [],
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<string[]>) {
      state.tags = action.payload;
    }
  },
});

export const { setFilter } = filterSlice.actions;
