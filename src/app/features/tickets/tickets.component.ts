import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { AddTicketFormComponent } from './components/add-ticket-form/add-ticket-form.component';
import Ticket from '../../core/models/ticket.interface';
import { TICKET_BLANK } from './components/add-ticket-form/ticketBlank';
import { LoadingStatus } from 'src/app/core/models/common.types';
import { ticketsSelectors } from 'src/app/core/state/tickets/tickets.selectors';
import ticketActions from 'src/app/core/state/tickets/tickets.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/state/app.state';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
})
export class TicketsComponent implements OnDestroy {
  ticketsSubscription: Subscription;
  ticketStatus$: Observable<LoadingStatus>;
  tickets: Array<Ticket> = [];

  // --- --- TABLE --- ---
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
  // --- --- END TABLE --- ---

  isModalComfirmHidden = true;
  isModalAddHidden = true;

  selectedTicketId = -1;

  @ViewChild(AddTicketFormComponent) private formComp!: AddTicketFormComponent;
  @ViewChild(MatPaginator) ticketPaginator!: MatPaginator;

  get selectedTicket(): Ticket {
    return this.selectedTicketId === -1
      ? { ...TICKET_BLANK, creationDate: new Date() }
      : this.tickets.filter((ticket) => ticket.id === this.selectedTicketId)[0];
  }

  constructor(private store: Store<AppState>) {
    this.ticketsSubscription = this.store
      .select(ticketsSelectors.all)
      .subscribe((ticketsFromDB) => {
        this.tickets = ticketsFromDB;
        this.ticketsDataSource = new MatTableDataSource(ticketsFromDB);
        this.ticketsDataSource.paginator = this.ticketPaginator;
        this.filter();
      });
    this.ticketStatus$ = this.store.select(ticketsSelectors.status);
    store.dispatch(ticketActions.loadTickets());
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

  deleteTicket() {
    this.isModalComfirmHidden = true;
    this.store.dispatch(
      ticketActions.deleteTicket({ ticketId: this.selectedTicketId })
    );
  }

  editTicket() {
    this.isModalAddHidden = false;
  }

  addNewTicket() {
    this.setSelectedTicket(-1);
    this.isModalAddHidden = false;
  }

  ngOnDestroy(): void {
    this.ticketsSubscription.unsubscribe();
  }

  setSelectedTicket(ticketId: number) {
    this.selectedTicketId = ticketId;
    this.formComp.updateView(this.selectedTicket);
  }
}
