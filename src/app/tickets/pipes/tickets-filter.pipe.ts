import { Pipe, PipeTransform } from '@angular/core';
import Ticket from '../models/ticket.interface';

@Pipe({
  name: 'ticketsFilter',
})
export class TicketsFilterPipe implements PipeTransform {
  transform(tickets: Ticket[], filterPhrase: string): Ticket[] {
    return tickets.filter((ticket) => {
      return (
        ticket.ticketName.includes(filterPhrase) &&
        ticket.customerName.includes(filterPhrase)
      );
    });
  }
}
