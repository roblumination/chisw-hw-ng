import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AddContactFormComponent } from './components/add-contact-form/add-contact-form.component';
// import { AddTicketFormComponent } from './components/add-ticket-form/add-contact-form.component';
import Contact from '../../core/models/contact.interface';
import { ContactService } from './services/contact.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnDestroy {
  contactsSubscription: Subscription;
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

  constructor(private contactService: ContactService) {
    this.contactsSubscription = this.contactService
      .getAll()
      .subscribe((response) => {
        // console.log(response);
        this.contactsDataSource = new MatTableDataSource(response);
        this.contactsDataSource.paginator = this.paginator;
        this.filter();
      });
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

  setSortBy(sortBy: keyof Contact) {
    this.contactService.sortBy(sortBy);
  }

  deleteContact() {
    this.isModalComfirmHidden = true;
    this.contactService.delete(this.contactId);
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
