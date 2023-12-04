import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface INote {
  description: string;
  tags: string[];
}

interface InitialStateType {
  list: INote[];
}

const initialState: InitialStateType = {
  list: [],
};

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote(state, action: PayloadAction<INote>) {
      state.list.push(action.payload);
    },
  },
});

export const { addNote } = notesSlice.actions;
