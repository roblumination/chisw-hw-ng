import { Injectable } from '@angular/core';
import { TicketPriority } from '../models/priority.enum';
import Ticket from '../models/ticket.interface';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  // --- --- Ticket generator configuration --- ---
  private readonly USER_AMOUNT = 20;
  private readonly PROFILE_PIC_PATH = '/assets/img/user-pic';
  private readonly PROFILE_PIC_MAX_INDEX = 9;
  private readonly PRIORITY = [
    TicketPriority.Hight,
    TicketPriority.Normal,
    TicketPriority.Low,
  ];
  private readonly USER_NAMES = [
    'Ocean Simon',
    'Aj Stewart',
    'Gianni Wooten',
    'Arnie Britton',
    'Anayah Andrews',
    'Tyron Costa',
    'Serena Morris',
    'Tre Gay',
    'Tobi Mcdermott',
    'Hywel Connelly',
    'Belle Madden',
    'Shahzaib Rich',
    'Arian Wormald',
    'Rebecca Gibson',
    'Brady Reyna',
    'Haroon Rudd',
    'Xander Mann',
    'Annie Joseph',
    'Miranda Hoover',
    'Darcy Delacruz',
  ];
  // --- --- --- --- --- --- --- --- --- ---

  private tickets: Ticket[] = [];
  private lastRandomResult = 0;
  // private pageSize = 4;

  constructor() {
    this.generateTickets();
  }

  getAll() {
    return this.tickets;
  }

  // getByPageNumber(pageIndex: number): Ticket[] {
  //   if (pageIndex > this.getPagesAmmount()) return [];
  //   const startIndex = this.pageSize * pageIndex;
  //   return this.tickets.slice(startIndex, startIndex + this.pageSize);
  // }

  // setPageSize(pageSize: number) {
  //   this.pageSize = pageSize;
  // }

  // private getPagesAmmount() {
  //   return ~~(this.tickets.length / this.pageSize);
  // }

  private generateTickets() {
    for (let i = 0; i < this.USER_AMOUNT; i++) {
      const result: Ticket = {
        id: i,
        ticketName: `TEST test super number ${i + 1}`,
        customerName: this.USER_NAMES[this.getRandom(this.USER_NAMES.length)],
        photoUrl: this.getRandomProfileImgUrl(),
        lastUpdated: new Date(),
        customerLastLogin: new Date(),
        creationDate: new Date(),
        priority: this.PRIORITY[this.getRandom(this.PRIORITY.length)],
      };

      this.tickets.push(result);
    }
  }

  private getRandom(max: number, min: number = 0): number {
    const range = max - min;
    return ~~(Math.random() * range) + min;
  }

  private getRandomProfileImgUrl(): string {
    const newProfilePic =
      this.PROFILE_PIC_PATH +
      '/g' +
      this.getRandom(this.PROFILE_PIC_MAX_INDEX) +
      '.jpg';

    // need for avoiding same profile picture one by one
    if (this.tickets.length === 0) return newProfilePic;
    const lastPicturePath = this.tickets[this.tickets.length - 1].photoUrl;
    return newProfilePic !== lastPicturePath
      ? newProfilePic
      : this.getRandomProfileImgUrl();
  }
}
