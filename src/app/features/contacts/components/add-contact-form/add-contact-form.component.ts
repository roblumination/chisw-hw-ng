import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { FormMode } from 'src/app/core/models/common.types';
import { AppState } from 'src/app/core/state/app.state';
import contactsActions from 'src/app/core/state/contacts/contacts.actions';
import { getRandomProfileImgUrl } from 'src/app/core/utils';
import Contact from '../../../../core/models/contact.interface';
import CONTACT_BLANK from './contactBlank';

@Component({
  selector: 'app-add-contact-form',
  templateUrl: './add-contact-form.component.html',
  styleUrls: ['./add-contact-form.component.scss'],
})
export class AddContactFormComponent implements OnDestroy {
  subscriptions: Array<Subscription> = [];
  currentContact: Contact = CONTACT_BLANK;
  @Output() requestCloseWindow = new EventEmitter<void>();

  contactForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
  });

  get mode(): FormMode {
    return this.currentContact.id >= 0 ? 'edit' : 'add';
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

  constructor(private store: Store<AppState>) {}

  updateView(contact: Contact) {
    this.currentContact = { ...contact };
    this.contactForm.reset();
    this.fillForm();
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
    this.readValuesFromForm();
    this.store.dispatch(
      contactsActions.editContact({ contact: this.currentContact })
    );
  }

  addTicket() {
    this.readValuesFromForm();
    const newContact: Contact = {
      ...this.currentContact,
      photoUrl: getRandomProfileImgUrl(),
    };
    this.store.dispatch(contactsActions.addContact({ contact: newContact }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  private readValuesFromForm() {
    const formOutput = this.contactForm.value;
    this.currentContact.firstName = formOutput.firstName ?? '';
    this.currentContact.lastName = formOutput.lastName ?? '';
    this.currentContact.email = formOutput.email ?? '';
    this.currentContact.address = formOutput.address ?? '';
  }

  private fillForm() {
    this.firstName.setValue(this.currentContact.firstName);
    this.lastName.setValue(this.currentContact.lastName);
    this.email.setValue(this.currentContact.email);
    this.address.setValue(this.currentContact.address);
  }
}
