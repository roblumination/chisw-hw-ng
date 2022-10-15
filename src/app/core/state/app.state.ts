import Contact from '../models/contact.interface';
import Ticket from '../models/ticket.interface';
import ItemsState from './items.state';

export interface AppState {
  contacts: ItemsState<Contact>;
  tickets: ItemsState<Ticket>;
}
