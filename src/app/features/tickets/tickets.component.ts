import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AddTicketFormComponent } from './components/add-ticket-form/add-ticket-form.component';
import { TicketPriority } from './models/priority.enum';
import Ticket from '../../core/models/ticket.interface';
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
  isModalAddHidden = true;

  // to delete or edit
  ticketId = -1;

  @ViewChild(AddTicketFormComponent) private formComp!: AddTicketFormComponent;
  @ViewChild(MatPaginator) ticketPaginator!: MatPaginator;

  constructor(private ticketsService: TicketService) {
    this.ticketsSubscription = this.ticketsService
      .getAll()
      .subscribe((response) => {
        // console.log(response);
        this.ticketsDataSource = new MatTableDataSource(response);
        this.ticketsDataSource.paginator = this.ticketPaginator;
        this.filter();
      });
  }

  ngAfterViewInit() {
    this.ticketsDataSource.paginator = this.ticketPaginator;
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
    console.log(this.ticketId);
    this.formComp.updateView();
    this.isModalAddHidden = false;
  }

  addNewTicket() {
    this.ticketId = -1;
    this.formComp.ticketId = -1;
    this.formComp.updateView();

    this.isModalAddHidden = false;
  }

  ngOnDestroy(): void {
    this.ticketsSubscription.unsubscribe();
  }
}
