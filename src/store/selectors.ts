import { createSelector } from '@reduxjs/toolkit/react';
import { RootState } from './store';

export const selectAllNotes = (state: RootState) => state.notes.list;
export const selectFilter = (state: RootState) => state.filter.tags;

export const selectAllTags = createSelector(
  selectAllNotes,
  (allNotes) => {
    const allTagsArr = allNotes.map((item) => item.tags).flat();

    return allTagsArr.map((tag) => ({ value: tag, label: tag }))
  }
)

// export const selectNotesByFilter = createSelector(
//   [selectAllNotes, selectFilter],
//   (allNotes, filter) => {
//     return allNotes.filter((note) => note.tags);
//   }
// );