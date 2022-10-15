import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChildren,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/state/app.state';
import ticketActions from 'src/app/core/state/tickets/tickets.actions';
import Ticket from '../../../../core/models/ticket.interface';

@Component({
  selector: 'app-table-widgets',
  templateUrl: './table-widgets.component.html',
  styleUrls: ['./table-widgets.component.scss'],
})
export class TableWidgetsComponent implements OnInit {
  isInputShown = false;

  @Output() requestSetSortBy = new EventEmitter<keyof Ticket>();
  @Output() requestSetFilterPhrase = new EventEmitter<string>();
  @Output() requestAddNew = new EventEmitter<void>();

  constructor(private store: Store<AppState>) {}

  @ViewChildren('filterInput') filterInput!: ElementRef;

  ngOnInit(): void {}

  closeFilterInput() {
    this.isInputShown = false;
  }

  setSortBy(sortBy: keyof Ticket) {
    this.store.dispatch(ticketActions.setSortBy({ sortBy: sortBy }));
  }

  setFilterPhrase(phrase: string) {
    this.requestSetFilterPhrase.emit(phrase);
  }

  addNew() {
    this.requestAddNew.emit();
  }
}
