import Contact from '../models/contact.interface';
import ItemsState from './items.state';

export interface AppState {
  contacts: ItemsState<Contact>;
}
