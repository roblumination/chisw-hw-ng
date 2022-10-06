import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChildren,
} from '@angular/core';
import Contact from '../../models/contact.interface';

@Component({
  selector: 'app-contact-table-widgets',
  templateUrl: './contact-table-widgets.component.html',
  styleUrls: ['./contact-table-widgets.component.scss'],
})
export class ContactTableWidgetsComponent implements OnInit {
  isInputShown = false;

  @Output() requestSetSortBy = new EventEmitter<keyof Contact>();
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

  setSortBy(sortBy: keyof Contact) {
    this.requestSetSortBy.emit(sortBy);
  }

  setFilterPhrase(phrase: string) {
    this.requestSetFilterPhrase.emit(phrase);
  }

  addNew() {
    this.requestAddNew.emit();
  }
}
