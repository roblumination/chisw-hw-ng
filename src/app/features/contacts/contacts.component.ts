import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { AddContactFormComponent } from './components/add-contact-form/add-contact-form.component';
// import { AddTicketFormComponent } from './components/add-ticket-form/add-contact-form.component';
import Contact from '../../core/models/contact.interface';
import { ContactService } from '../../core/services/contact.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/state/app.state';
import contactsActions from 'src/app/core/state/contacts/contacts.actions';
import { contactsSelect } from 'src/app/core/state/contacts/contacts.selectors';
import { LoadingStatus } from 'src/app/core/models/LoadingStatus.type';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnDestroy, OnInit {
  contactsSubscription: Subscription;
  contactsStatus$: Observable<LoadingStatus>;
  // contacts$;
  contactsDataSource: MatTableDataSource<Contact> =
    new MatTableDataSource<Contact>([]);
  filterPhrase = '';
  displayedColumns: string[] = [
    'name',
    'email',
    'address',
    'createdAt',
    'context',
  ];

  isModalComfirmHidden = true;
  isModalAddHidden = true;

  // to delete or edit
  contactId = -1;

  @ViewChild(AddContactFormComponent)
  private formComp!: AddContactFormComponent;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private store: Store<AppState> /*private contactService: ContactService*/
  ) {
    this.contactsSubscription = this.store
      .select(contactsSelect.all)
      .subscribe((response) => {
        console.log(response);
        this.contactsDataSource = new MatTableDataSource(response);
        this.contactsDataSource.paginator = this.paginator;
        this.filter();
      });
    this.contactsStatus$ = this.store.select(contactsSelect.status);
    store.dispatch(contactsActions.loadContacts());
    // this.contactsSubscription = this.contactService
    //   .getAll()
    //   .subscribe((response) => {
    //     // console.log(response);
    //     this.contactsDataSource = new MatTableDataSource(response);
    //     this.contactsDataSource.paginator = this.paginator;
    //     this.filter();
    //   });
  }

  ngAfterViewInit() {
    this.contactsDataSource.paginator = this.paginator;
  }

  ngOnInit() {
    console.log('HELLO!');
  }

  setFilterPhrase(phrase: string) {
    this.filterPhrase = phrase;
    this.filter();
  }

  filter() {
    this.contactsDataSource.filter = this.filterPhrase;
  }

  setSortBy(sortBy: keyof Contact) {
    // this.contactService.sortBy(sortBy);
  }

  deleteContact() {
    this.isModalComfirmHidden = true;
    // this.contactService.delete(this.contactId);
  }

  editContact() {
    this.formComp.updateView();
    this.isModalAddHidden = false;
  }

  addNewContact() {
    this.contactId = -1;
    this.formComp.contactId = -1;
    this.formComp.updateView();

    this.isModalAddHidden = false;
  }

  ngOnDestroy(): void {
    this.contactsSubscription.unsubscribe();
  }
}
