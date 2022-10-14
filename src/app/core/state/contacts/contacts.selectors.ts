import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

const selectFeature = (state: AppState) => state.contacts;

export const contactsSelect = {
  all: createSelector(selectFeature, (state) => state.items),
  // current: createSelector(selectFeature, (state) =>
  //   state.items.filter((item) => item.id === state.selectedItemId)
  // ),
  currentId: createSelector(selectFeature, (state) => state.selectedItemId),
  status: createSelector(selectFeature, (state) => state.status),
};
