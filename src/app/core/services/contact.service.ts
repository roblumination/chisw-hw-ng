import { Injectable } from '@angular/core';
import { BehaviorSubject, first, Observable, Subject } from 'rxjs';
import Contact from '../models/contact.interface';
import { simulateLoading } from '../utils';
import ContactGenerator from './ContactGenerator';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private contacts: Array<Contact> = [];
  private contacts$ = new BehaviorSubject<Contact[]>(this.contacts);
  private generator = new ContactGenerator();

  constructor() {
    this.contacts.push(...this.generator.getRandomContacts());
  }

  getAll(): Observable<Contact[]> {
    this.sendChangesToContactList();
    return simulateLoading(this.contacts$.pipe(first()));
  }

  delete(id: number) {
    this.contacts = this.contacts.filter((ticket) => ticket.id !== id);
    return this.emitVoidObservable();
  }

  edit(contact: Contact) {
    this.contacts = [
      ...this.contacts.filter((c) => c.id !== contact.id),
      contact,
    ];
    return this.emitVoidObservable();
  }

  add(contact: Contact) {
    this.contacts = [
      ...this.contacts,
      { ...contact, id: this.getIdForNewContact() },
    ];

    return this.emitVoidObservable();
  }

  private sendChangesToContactList() {
    this.contacts$.next(this.contacts);
  }

  private getIdForNewContact() {
    return this.contacts.length;
  }

  private emitVoidObservable() {
    const result = new Subject<void>();
    setTimeout(() => result.next(), 0);
    return result.asObservable();
  }
}
