// import { TicketPriority } from '../models/priority.enum';
import Ticket from '../../../core/models/ticket.interface';
import { TicketPriority } from '../../models/priority.enum';
import {
  getRandomDateInRange,
  getRandomInRange,
  getRandomProfileImgUrl,
} from '../../utils';
import { randomIssues } from './randomIssues';
import { randomNames } from './randomNames';

export default class TicketGenerator {
  private readonly USER_AMOUNT = 4;
  private readonly PRIORITY = [
    TicketPriority.Hight,
    TicketPriority.Normal,
    TicketPriority.Low,
  ];

  private tickets: Array<Ticket> = [];

  constructor() {}

  getRandomTickets() {
    this.generateTickets();
    return this.tickets;
  }

  private generateTickets() {
    for (let i = 0; i < this.USER_AMOUNT; i++) {
      const customerName = randomNames[getRandomInRange(randomNames.length)];
      const priority = this.PRIORITY[getRandomInRange(this.PRIORITY.length)];
      const ticketName = randomIssues[getRandomInRange(randomIssues.length)];
      const result: Ticket = {
        id: i,
        ticketName: ticketName,
        customerName: customerName,
        photoUrl: getRandomProfileImgUrl(),
        lastUpdated: getRandomDateInRange(new Date('2022/07/28'), new Date()),
        customerLastLogin: getRandomDateInRange(
          new Date('2022/09/15'),
          new Date()
        ),
        creationDate: getRandomDateInRange(new Date('2022/02/24'), new Date()),
        priority: priority,
      };

      this.tickets.push(result);
    }
  }
}
