import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable, Subject } from 'rxjs';
import Contact from '../../../core/models/contact.interface';
import ContactGenerator from './ContactGenerator';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private contacts: Contact[] = [];
  private contacts$ = new BehaviorSubject<Contact[]>(this.contacts);
  private contact$ = new Subject<Contact>();
  private generator = new ContactGenerator();

  constructor() {
    this.contacts = this.generator.getRandomContacts();
  }

  getAll(): Observable<Contact[]> {
    this.sendChangesToContactList();
    return this.simulateLoading(this.contacts$);
  }

  getById(id: number): Observable<Contact> {
    setTimeout(() => {
      this.contact$.next(this.contacts.filter((t) => t.id === id)[0]);
    }, 0);
    return this.contact$.asObservable();
  }

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

  add(ticket: Contact) {
    console.log('ADD IN SERVICE!');
    this.contacts.push({
      ...ticket,
      id: this.getIdForNewContact(),
    });
    this.sendChangesToContactList();
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

  getRandomProfilePic() {
    return this.generator.getRandomProfileImgUrl();
  }

  // --- --- PRIVATE --- ---

  private sendChangesToContactList() {
    this.contacts$.next(this.contacts);
  }

  private getIdForNewContact() {
    return this.contacts.length;
  }

  private simulateLoading(data$: Observable<any>) {
    return data$.pipe(delay(1000));
  }
}
