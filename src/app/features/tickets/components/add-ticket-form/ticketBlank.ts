import { TicketPriority } from 'src/app/core/models/priority.enum';
import Ticket from 'src/app/core/models/ticket.interface';

export const TICKET_BLANK: Ticket = {
  id: -1,
  customerLastLogin: new Date(),
  customerName: '',
  lastUpdated: new Date(),
  creationDate: new Date(),
  photoUrl: '',
  ticketName: '',
  priority: TicketPriority.Hight,
};
