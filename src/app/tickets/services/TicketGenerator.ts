import { TicketPriority } from '../models/priority.enum';
import Ticket from '../models/ticket.interface';
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

  getRandomProfileImgUrl(): string {
    const seed = this.getRandom(0, 10000);
    // const type = 'adventurer-neutral';
    const type = 'big-ears-neutral';
    return `https://avatars.dicebear.com/api/${type}/${seed}.svg`;
  }

  private generateTickets() {
    for (let i = 0; i < this.USER_AMOUNT; i++) {
      const customerName = randomNames[this.getRandom(randomNames.length)];
      const priority = this.PRIORITY[this.getRandom(this.PRIORITY.length)];
      const ticketName = randomIssues[this.getRandom(randomIssues.length)];
      const result: Ticket = {
        id: i,
        ticketName: ticketName,
        customerName: customerName,
        photoUrl: this.getRandomProfileImgUrl(),
        lastUpdated: this.getRandomDate(new Date('2022/07/28'), new Date()),
        customerLastLogin: this.getRandomDate(
          new Date('2022/09/15'),
          new Date()
        ),
        creationDate: this.getRandomDate(new Date('2022/02/24'), new Date()),
        priority: priority,
      };

      this.tickets.push(result);
    }
  }

  private getRandom(max: number, min: number = 0): number {
    const range = max - min;
    return ~~(Math.random() * range) + min;
  }

  private getRandomDate(start: Date, end: Date) {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  }
}
