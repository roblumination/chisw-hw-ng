import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { TicketPriority } from '../models/priority.enum';
import Ticket from '../models/ticket.interface';
import TicketGenerator from './TicketGenerator';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private tickets: Ticket[] = [];
  private tickets$ = new BehaviorSubject<Ticket[]>(this.tickets);
  private ticket$ = new Subject<Ticket>();

  constructor() {
    this.tickets = new TicketGenerator().getRandomTickets();
  }

  getAll(): Observable<Ticket[]> {
    this.sendChanges();
    return this.tickets$.asObservable();
  }

  getById(id: number): Observable<Ticket> {
    // return this.tickets.filter
    // console.log('get by id');
    setTimeout(() => {
      this.ticket$.next(this.tickets.filter((t) => t.id === id)[0]);
    }, 0);
    return this.ticket$.asObservable();
  }

  delete(id: number) {
    this.tickets = this.tickets.filter((ticket) => ticket.id !== id);
    this.sendChanges();
  }

  edit(ticket: Ticket) {
    console.log('EDIT!');
    const id = ticket.id;
    const arrIndex = this.tickets.findIndex((t) => t.id === id);
    if (arrIndex === -1) {
      console.error(`Ticket with ID ${id} not found`);
      return;
    }

    this.tickets[arrIndex] = ticket;
    this.sendChanges();
  }

  sortBy(sort: keyof Ticket) {
    this.tickets.sort((a, b) => {
      if (sort == 'customerName' || sort == 'ticketName') {
        return a[sort].localeCompare(b[sort], 'en', { numeric: true });
      }
      if (a[sort] > b[sort]) return 1;
      return -1;
    });
    this.sendChanges();
  }

  // private

  private sendChanges() {
    this.tickets$.next(this.tickets);
  }
}
