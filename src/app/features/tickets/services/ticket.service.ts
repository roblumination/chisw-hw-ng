import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { TicketPriority } from '../models/priority.enum';
import Ticket from '../../../core/models/ticket.interface';
import TicketGenerator from './TicketGenerator';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private tickets: Ticket[] = [];
  private tickets$ = new BehaviorSubject<Ticket[]>(this.tickets);
  private ticket$ = new Subject<Ticket>();
  private generator = new TicketGenerator();

  constructor() {
    this.tickets = this.generator.getRandomTickets();
  }

  getAll(): Observable<Ticket[]> {
    this.sendChangesToTicketList();
    return this.tickets$.asObservable();
  }

  getById(id: number): Observable<Ticket> {
    setTimeout(() => {
      this.ticket$.next(this.tickets.filter((t) => t.id === id)[0]);
    }, 0);
    return this.ticket$.asObservable();
  }

  delete(id: number) {
    this.tickets = this.tickets.filter((ticket) => ticket.id !== id);
    this.sendChangesToTicketList();
  }

  edit(ticket: Ticket) {
    const id = ticket.id;
    const arrIndex = this.tickets.findIndex((t) => t.id === id);
    if (arrIndex === -1) {
      console.error(`Ticket with ID ${id} not found`);
      return;
    }

    this.tickets[arrIndex] = ticket;
    this.sendChangesToTicketList();
  }

  add(ticket: Ticket) {
    console.log('ADD IN SERVICE!');
    this.tickets.push({
      ...ticket,
      id: this.getIdForNewTicket(),
    });
    this.sendChangesToTicketList();
  }

  sortBy(key: keyof Ticket) {
    this.tickets.sort((a, b) => {
      if (key == 'customerName' || key == 'ticketName') {
        return a[key].localeCompare(b[key], 'en', { numeric: true });
      }
      if (a[key] > b[key]) return 1;
      return -1;
    });
    this.sendChangesToTicketList();
  }

  getRandomProfilePic() {
    return this.generator.getRandomProfileImgUrl();
  }

  // --- --- PRIVATE --- ---

  private sendChangesToTicketList() {
    this.tickets$.next(this.tickets);
  }

  private getIdForNewTicket() {
    return this.tickets.length;
  }
}
