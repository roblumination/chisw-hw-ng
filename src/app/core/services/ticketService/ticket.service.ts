import { Injectable } from '@angular/core';
import { BehaviorSubject, first, Observable, Subject } from 'rxjs';
import Ticket from '../../../core/models/ticket.interface';
import { getRandomProfileImgUrl, simulateLoading } from '../../utils';
import TicketGenerator from './TicketGenerator';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private tickets: Ticket[] = [];
  private tickets$ = new BehaviorSubject<Ticket[]>(this.tickets);
  private generator = new TicketGenerator();

  constructor() {
    this.tickets = this.generator.getRandomTickets();
  }

  getAll(): Observable<Ticket[]> {
    this.sendChangesToTicketList();
    return simulateLoading(this.tickets$.pipe(first()));
  }

  delete(id: number): Observable<void> {
    this.tickets = this.tickets.filter((ticket) => ticket.id !== id);
    return this.emitVoidObservable();
  }

  edit(ticket: Ticket) {
    this.tickets = [...this.tickets.filter((t) => t.id !== ticket.id), ticket];
    return this.emitVoidObservable();
  }

  add(ticket: Ticket) {
    this.tickets = [
      ...this.tickets,
      {
        ...ticket,
        id: this.getIdForNewTicket(),
        photoUrl: getRandomProfileImgUrl(),
      },
    ];

    return this.emitVoidObservable();
  }

  private sendChangesToTicketList() {
    this.tickets$.next(this.tickets);
  }

  private getIdForNewTicket() {
    return this.tickets.length;
  }

  private emitVoidObservable() {
    const result = new Subject<void>();
    setTimeout(() => result.next(), 0);
    return result.asObservable();
  }
}
