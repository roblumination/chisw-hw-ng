import { createReducer, on } from '@ngrx/store';
import Contact from '../../models/contact.interface';
import Ticket from '../../models/ticket.interface';
import ItemsState from '../items.state';
import ticketActions from './tickets.actions';

export const initTicketsState: ItemsState<Ticket> = {
  items: [],
  selectedItemId: -1,
  status: 'pending',
  error: '',
};

export const ticektsReducer = createReducer(
  initTicketsState,

  on(ticketActions.setSortBy, (state, { sortBy }) => ({
    ...state,
    items: [...state.items].sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1)),
  })),

  // --- --- LOADING --- ---
  on(ticketActions.loadTickets, (state) => ({
    ...state,
    status: 'loading',
  })),
  on(ticketActions.loadTicketsSuccess, (state, { tickets }) => ({
    ...state,
    status: 'success',
    items: tickets,
  })),

  // --- --- ADD CONTACT --- ---
  on(ticketActions.addTicket, (state) => ({
    ...state,
    status: 'loading',
  })),
  on(ticketActions.addTicketSuccess, (state) => ({
    ...state,
    status: 'success',
  })),

  // --- --- EDIT CONTACT --- ---
  on(ticketActions.editTicket, (state) => ({
    ...state,
    status: 'loading',
  })),
  on(ticketActions.editTicketSuccess, (state) => ({
    ...state,
    status: 'success',
  })),

  // --- --- DELETE CONTACT --- ---
  on(ticketActions.deleteTicket, (state) => ({
    ...state,
    status: 'loading',
  })),
  on(ticketActions.deleteTicketSuccess, (state) => ({
    ...state,
    status: 'success',
  }))
);
