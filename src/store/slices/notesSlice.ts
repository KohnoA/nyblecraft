import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INote } from '@/types';

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

    removeNote(state, action: PayloadAction<number>) {
      state.list = state.list.filter((tag) => tag.id !== action.payload);
    },

    editNote(
      state,
      action: PayloadAction<{ newDesc: string; id: number; newTags: string[] }>
    ) {
      const { newDesc, id, newTags } = action.payload;

      state.list = state.list.map((note) => {
        if (note.id === id && note.desc !== newDesc) {
          note.desc = newDesc;
          note.tags = newTags;
        }

        return note;
      });
    },
  },
});

export const { addNote, removeNote, editNote } = notesSlice.actions;
