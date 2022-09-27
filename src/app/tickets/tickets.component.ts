import { Component, OnInit } from '@angular/core';
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
    this.tickets = ticketsService.getAll();
    this.ticketsDataSource = new MatTableDataSource(this.tickets);
    // console.log(this.tickets);
  }

  ngOnInit(): void {
    // console.log(this.ticketsService.getAll());
    // console.log(this.ticketsService.getByPageNumber(0));
    // console.log(this.ticketsService.getByPageNumber(1));
    // console.log(this.ticketsService.getByPageNumber(2));
  }
}
