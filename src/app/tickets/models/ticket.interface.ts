import { TicketPriority } from './priority.enum';

export default interface Ticket {
  ticketName: string;
  customerName: string;
  photoUrl: string;
  lastUpdated: Date;
  creationDate: Date;
  priority: TicketPriority;
  customerLastLogin: Date;
}
