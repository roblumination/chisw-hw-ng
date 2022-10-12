import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChildren,
} from '@angular/core';
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

  constructor() {}

  @ViewChildren('filterInput') filterInput!: ElementRef;

  ngOnInit(): void {}

  closeFilterInput() {
    this.isInputShown = false;
    // this.filterInput.nativeElement.value = '';
  }

  // clearFilterInput() {
  //   this.filterInput.nativeElement.value = '';
  //   this.setFilterPhrase('');
  // }

  setSortBy(sortBy: keyof Ticket) {
    this.requestSetSortBy.emit(sortBy);
  }

  setFilterPhrase(phrase: string) {
    this.requestSetFilterPhrase.emit(phrase);
  }

  addNew() {
    this.requestAddNew.emit();
  }
}
