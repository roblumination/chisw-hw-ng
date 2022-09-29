import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { MatTableDataSource } from '@angular/material/table';
import Ticket from './models/ticket.interface';
import { TicketService } from './services/ticket.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
})
export class TicketsComponent implements OnInit {
  tickets: Ticket[];
  ticketsDataSource: MatTableDataSource<Ticket>;
  displayedColumns: string[] = [
    'ticketDetails',
    'customerName',
    'date',
    'priority',
    'context',
  ];

  constructor(private ticketsService: TicketService) {
    this.tickets = this.ticketsService.getAll();
    this.ticketsDataSource = new MatTableDataSource(this.tickets);
  }

  setFilterPhrase(filterPhrase: string) {
    this.ticketsDataSource.filter = filterPhrase;
  }

  setSort(sort: keyof Ticket) {
    this.tickets.sort((a, b) => {
      if (sort == 'customerName' || sort == 'ticketName') {
        return a[sort].localeCompare(b[sort], 'en', { numeric: true });
      }
      if (a[sort] > b[sort]) return 1;
      return -1;
    });
    this.updateTable();
  }

  updateTable() {
    this.ticketsDataSource = new MatTableDataSource(this.tickets);
  }

  ngOnInit(): void {}
}
