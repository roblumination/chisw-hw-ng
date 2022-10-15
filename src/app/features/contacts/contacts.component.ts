import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { AddContactFormComponent } from './components/add-contact-form/add-contact-form.component';
import Contact from '../../core/models/contact.interface';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/state/app.state';
import contactsActions from 'src/app/core/state/contacts/contacts.actions';
import { contactsSelect } from 'src/app/core/state/contacts/contacts.selectors';
import { LoadingStatus } from 'src/app/core/models/common.types';
import CONTACT_BLANK from './components/add-contact-form/contactBlank';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnDestroy {
  contactsSubscription: Subscription;
  contactsStatus$: Observable<LoadingStatus>;
  contacts: Array<Contact> = [];

  // --- --- TABLE --- ---
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
  // --- --- END TABLE --- ---

  isModalComfirmHidden = true;
  isModalAddHidden = true;

  selectedContactId = -1;

  @ViewChild(AddContactFormComponent)
  private formComp!: AddContactFormComponent;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  get selectedContact() {
    return this.selectedContactId === -1
      ? { ...CONTACT_BLANK, createdAt: new Date() }
      : this.contacts.filter(
          (contact) => contact.id === this.selectedContactId
        )[0];
  }

  constructor(private store: Store<AppState>) {
    this.contactsSubscription = this.store
      .select(contactsSelect.all)
      .subscribe((contactsFromDB) => {
        this.contacts = contactsFromDB;
        this.contactsDataSource = new MatTableDataSource(contactsFromDB);
        this.contactsDataSource.paginator = this.paginator;
        this.filter();
      });
    this.contactsStatus$ = this.store.select(contactsSelect.status);
    store.dispatch(contactsActions.loadContacts());
  }

  ngAfterViewInit() {
    this.contactsDataSource.paginator = this.paginator;
  }

  setFilterPhrase(phrase: string) {
    this.filterPhrase = phrase;
    this.filter();
  }

  filter() {
    this.contactsDataSource.filter = this.filterPhrase;
  }

  setSelectedContact(contactId: number) {
    this.selectedContactId = contactId;
    this.formComp.updateView(this.selectedContact);
  }

  deleteContact() {
    this.isModalComfirmHidden = true;
    this.store.dispatch(
      contactsActions.deleteContact({ contactId: this.selectedContactId })
    );
  }

  editContact() {
    this.isModalAddHidden = false;
  }

  addNewContact() {
    this.setSelectedContact(-1);

    this.isModalAddHidden = false;
  }

  ngOnDestroy(): void {
    this.contactsSubscription.unsubscribe();
  }
}
