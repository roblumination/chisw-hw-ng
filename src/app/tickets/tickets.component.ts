import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import Ticket from './models/ticket.interface';
import { TicketService } from './services/ticket.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
})
export class TicketsComponent implements OnDestroy {
  // tickets: Ticket[];
  ticketsSubscription: Subscription;
  ticketsDataSource: MatTableDataSource<Ticket> =
    new MatTableDataSource<Ticket>([]);
  filterPhrase = '';
  displayedColumns: string[] = [
    'ticketDetails',
    'customerName',
    'date',
    'priority',
    'context',
  ];

  isModalComfirmHidden = true;

  // to delete or edit
  ticketId = -1;

  constructor(private ticketsService: TicketService) {
    this.ticketsSubscription = this.ticketsService
      .getAll()
      .subscribe((response) => {
        // console.log(response);
        this.ticketsDataSource = new MatTableDataSource(response);
        this.filter();
      });
  }

  setFilterPhrase(phrase: string) {
    this.filterPhrase = phrase;
    this.filter();
  }

  filter() {
    this.ticketsDataSource.filter = this.filterPhrase;
  }

  setSortBy(sortBy: keyof Ticket) {
    this.ticketsService.sortBy(sortBy);
  }

  deleteTicket() {
    this.isModalComfirmHidden = true;
    this.ticketsService.delete(this.ticketId);
  }

  editTicket() {
    console.log('EDIT', this.ticketId);
  }

  // setSort(sort: keyof Ticket) {
  //   this.tickets.sort((a, b) => {
  //     if (sort == 'customerName' || sort == 'ticketName') {
  //       return a[sort].localeCompare(b[sort], 'en', { numeric: true });
  //     }
  //     if (a[sort] > b[sort]) return 1;
  //     return -1;
  //   });
  //   this.updateTable();
  // }

  // updateTable() {
  //   this.ticketsDataSource = new MatTableDataSource(this.tickets);
  // }

  ngOnDestroy(): void {}
}
