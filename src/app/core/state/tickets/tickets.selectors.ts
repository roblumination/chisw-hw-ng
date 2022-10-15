import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

const selectFeature = (state: AppState) => state.tickets;

export const ticketsSelectors = {
  all: createSelector(selectFeature, (state) => state.items),
  status: createSelector(selectFeature, (state) => state.status),
};
