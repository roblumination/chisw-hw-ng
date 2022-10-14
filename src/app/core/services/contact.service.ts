import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  delay,
  first,
  Observable,
  Subject,
  Subscription,
} from 'rxjs';
import CONTACT_BLANK from 'src/app/features/contacts/components/add-contact-form/contactBlank';
import Contact from '../models/contact.interface';
import { AppState } from '../state/app.state';
import contactsActions from '../state/contacts/contacts.actions';
import { contactsSelect } from '../state/contacts/contacts.selectors';
import ContactGenerator from './ContactGenerator';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private contacts: Array<Contact> = [];
  private contacts$ = new BehaviorSubject<Contact[]>(this.contacts);
  private contact$ = new Subject<Contact>();
  private generator = new ContactGenerator();
  selectedId = -1;

  constructor(private store: Store<AppState>) {
    this.store
      .select(contactsSelect.currentId)
      .subscribe((currentId) => (this.selectedId = currentId));
    // const testContact = {
    //   id: -1,
    //   firstName: 'INIT',
    //   lastName: 'INIT',
    //   email: 'INIT@gnail.com',
    //   address: 'Lviv, INIT',
    //   createdAt: new Date(),
    //   photoUrl: 'INIT',
    // };
    this.contacts.push(...this.generator.getRandomContacts());
  }

  getAll(): Observable<Contact[]> {
    this.sendChangesToContactList();
    return this.simulateLoading(this.contacts$.pipe(first()));
    // return this.contacts$;
  }

  // getCurrent(): Observable<Contact> {
  //   this.contact$.next(
  //     this.selectedId === -1
  //       ? CONTACT_BLANK
  //       : this.contacts.filter((t) => t.id === this.selectedId)[0]
  //   );
  //   return this.contact$.asObservable();
  // }

  // getById(id: number): Observable<Contact> {
  //   setTimeout(() => {
  //     this.contact$.next(this.contacts.filter((t) => t.id === id)[0]);
  //   }, 0);
  //   return this.contact$.asObservable();
  // }

  delete(id: number) {
    this.contacts = this.contacts.filter((ticket) => ticket.id !== id);
    this.sendChangesToContactList();
  }

  edit(contact: Contact) {
    const id = contact.id;
    const arrIndex = this.contacts.findIndex((t) => t.id === id);
    if (arrIndex === -1) {
      console.error(`Ticket with ID ${id} not found`);
      return;
    }

    this.contacts[arrIndex] = contact;
    this.sendChangesToContactList();
  }

  add(contact: Contact) {
    this.contacts = [
      ...this.contacts,
      {
        ...contact,
        id: this.getIdForNewContact(),
      },
    ];

    // --- --- TODO delete --- ---
    // this.sendChangesToContactList();
    // --- --- TODO delete --- ---

    // --- --- ASYNC --- ---
    const result = new Subject<void>();
    setTimeout(() => result.next(), 1000);

    return result.asObservable();
  }

  sortBy(key: keyof Contact) {
    this.contacts.sort((a, b) => {
      // if (key == 'customerName' || key == 'ticketName') {
      //   return a[key].localeCompare(b[key], 'en', { numeric: true });
      // }
      if (a[key] > b[key]) return 1;
      return -1;
    });
    this.sendChangesToContactList();
  }

  // --- --- PRIVATE --- ---

  private sendChangesToContactList() {
    this.contacts$.next(this.contacts);
  }

  private getIdForNewContact() {
    return this.contacts.length;
    // return ~~(Math.random() * 1000);
  }

  private simulateLoading(data$: Observable<any>) {
    return data$.pipe(delay(1000));
  }
}
