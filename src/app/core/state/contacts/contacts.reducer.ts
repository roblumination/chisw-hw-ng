import { createReducer, on } from '@ngrx/store';
import Contact from '../../models/contact.interface';
import ItemsState from '../items.state';
import contactsActions from './contacts.actions';

export const initContactsState: ItemsState<Contact> = {
  items: [],
  selectedItemId: -1,
  status: 'pending',
  error: '',
};

export const contactsReducer = createReducer(
  initContactsState,

  on(contactsActions.setCurrentContactId, (state, { contactId }) => ({
    ...state,
    selectedItemId: contactId,
  })),
  on(contactsActions.setSortBy, (state, { sortBy }) => ({
    ...state,
    items: [...state.items].sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1)),
  })),

  // --- --- LOADING --- ---
  on(contactsActions.loadContacts, (state) => ({
    ...state,
    status: 'loading',
  })),
  on(contactsActions.loadContactsSuccess, (state, { contacts }) => ({
    ...state,
    status: 'success',
    items: contacts,
  })),

  // --- --- ADD CONTACT --- ---
  on(contactsActions.addContact, (state) => ({
    ...state,
    status: 'loading',
  })),
  on(contactsActions.addContactSuccess, (state) => ({
    ...state,
    status: 'success',
  })),

  // --- --- EDIT CONTACT --- ---
  on(contactsActions.editContact, (state) => ({
    ...state,
    status: 'loading',
  })),
  on(contactsActions.editContactSuccess, (state) => ({
    ...state,
    status: 'success',
  })),

  // --- --- DELETE CONTACT --- ---
  on(contactsActions.deleteContact, (state) => ({
    ...state,
    status: 'loading',
  })),
  on(contactsActions.deleteContactSuccess, (state) => ({
    ...state,
    status: 'success',
  }))
);
