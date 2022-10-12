import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import Contact from '../../../../core/models/contact.interface';
import { ContactService } from '../../services/contact.service';

type FormMode = 'add' | 'edit';

@Component({
  selector: 'app-add-contact-form',
  templateUrl: './add-contact-form.component.html',
  styleUrls: ['./add-contact-form.component.scss'],
})
export class AddContactFormComponent {
  contactSubscription: Subscription;
  contactForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
  });

  readonly CONTACT_BLANK: Contact = {
    id: -1,
    firstName: 'INIT',
    lastName: 'INIT',
    email: 'INIT@gnail.com',
    address: 'Lviv, INIT',
    createdAt: new Date(),
    photoUrl: 'INIT',
  };
  currentContact: Contact = this.CONTACT_BLANK;

  get mode(): FormMode {
    return this.contactId >= 0 ? 'edit' : 'add';
  }
  get firstName() {
    return this.contactForm.get('firstName') as AbstractControl;
  }
  get lastName() {
    return this.contactForm.get('lastName') as AbstractControl;
  }
  get email() {
    return this.contactForm.get('email') as AbstractControl;
  }
  get address() {
    return this.contactForm.get('address') as AbstractControl;
  }

  @Input() contactId: number = -1;
  @Output() requestCloseWindow = new EventEmitter<void>();

  constructor(private contactService: ContactService) {
    this.contactSubscription = contactService.getById(0).subscribe(() => {});
  }

  updateView() {
    this.contactForm.reset();
    if (this.mode === 'add') {
      this.currentContact = this.CONTACT_BLANK;
    } else {
      this.contactSubscription.unsubscribe();
      this.contactSubscription = this.contactService
        .getById(this.contactId)
        .subscribe((ticket) => {
          this.currentContact = ticket;
          this.fillTicketForm();
        });
    }
  }

  fillTicketForm() {
    this.firstName.setValue(this.currentContact.firstName);
    this.lastName.setValue(this.currentContact.lastName);
    this.email.setValue(this.currentContact.email);
    this.address.setValue(this.currentContact.address);
  }

  closeModal() {
    this.requestCloseWindow.emit();
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.mode === 'add' ? this.addTicket() : this.editTicket();
      this.closeModal();
    } else {
      alert('Please, fill all fields!');
    }
  }

  editTicket() {
    const formOutput = this.contactForm.value;
    this.currentContact.firstName = formOutput.firstName ?? '';
    this.currentContact.lastName = formOutput.lastName ?? '';
    this.currentContact.email = formOutput.email ?? '';
    this.currentContact.address = formOutput.address ?? '';

    this.contactService.edit(this.currentContact);
  }

  addTicket() {
    const formOutput = this.contactForm.value;
    this.currentContact.firstName = formOutput.firstName ?? '';
    this.currentContact.lastName = formOutput.lastName ?? '';
    this.currentContact.email = formOutput.email ?? '';
    this.currentContact.address = formOutput.address ?? '';

    // IDK HOW TO DO IT ANOTHER WAY
    // this.currentContact.priority = formOutput.priority as TicketPriority;
    //

    this.contactService.add(this.currentContact);
  }
}
