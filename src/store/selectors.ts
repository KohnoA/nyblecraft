import { createSelector } from '@reduxjs/toolkit/react';
import { RootState } from './store';

export const selectAllNotes = (state: RootState) => state.notes.list;
export const selectFilter = (state: RootState) => state.filter.tags;

export const selectAllTags = createSelector(selectAllNotes, (allNotes) => {
  const allTagsArr = allNotes.map((item) => item.tags).flat();

  return allTagsArr.map((tag) => ({ value: tag, label: tag }));
});

export const selectNotesByFilter = createSelector(
  [selectAllNotes, selectFilter],
  (allNotes, filterArr) => {
    if (filterArr.length === 0) {
      return allNotes;
    } else {
      return allNotes.filter(({ tags }) =>
        tags.some((tag) => filterArr.includes(tag))
      );
    }
  }
);
