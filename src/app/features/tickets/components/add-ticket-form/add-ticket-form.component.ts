import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/core/state/app.state';
import ticketActions from 'src/app/core/state/tickets/tickets.actions';
import { TicketPriority } from '../../../../core/models/priority.enum';
import Ticket from '../../../../core/models/ticket.interface';
import { TICKET_BLANK } from './ticketBlank';

type FormMode = 'add' | 'edit';

@Component({
  selector: 'app-add-ticket-form',
  templateUrl: './add-ticket-form.component.html',
  styleUrls: ['./add-ticket-form.component.scss'],
})
export class AddTicketFormComponent {
  // ticketSubscription: Subscription;
  ticketPriority = [
    TicketPriority.Hight,
    TicketPriority.Normal,
    TicketPriority.Low,
  ];
  ticketForm = new FormGroup({
    details: new FormControl('', Validators.required),
    customerName: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    priority: new FormControl('', Validators.required),
  });

  currentTicket = TICKET_BLANK;

  @Output() requestCloseWindow = new EventEmitter<void>();

  get mode(): FormMode {
    return this.currentTicket.id >= 0 ? 'edit' : 'add';
  }
  get details() {
    return this.ticketForm.get('details') as AbstractControl;
  }
  get date() {
    return this.ticketForm.get('date') as AbstractControl;
  }
  get customerName() {
    return this.ticketForm.get('customerName') as AbstractControl;
  }
  get priority() {
    return this.ticketForm.get('priority') as AbstractControl;
  }

  constructor(private store: Store<AppState>) {
    // this.ticketSubscription = ticketService.getById(0).subscribe(() => {});
  }

  updateView(ticket: Ticket) {
    this.currentTicket = { ...ticket };
    this.ticketForm.reset();
    this.fillForm();
  }

  closeModal() {
    this.requestCloseWindow.emit();
  }

  onSubmit() {
    if (this.ticketForm.valid) {
      this.mode === 'add' ? this.addTicket() : this.editTicket();
      this.closeModal();
    } else {
      alert('Please, fill all fields!');
    }
  }

  editTicket() {
    this.readValuesFromForm();
    this.store.dispatch(
      ticketActions.editTicket({ ticket: this.currentTicket })
    );
  }

  addTicket() {
    this.readValuesFromForm();
    this.store.dispatch(
      ticketActions.addTicket({ ticket: this.currentTicket })
    );
  }

  private fillForm() {
    this.details.setValue(this.currentTicket.ticketName);
    this.customerName.setValue(this.currentTicket.customerName);
    if (this.mode === 'edit') {
      this.date.setValue(this.currentTicket.creationDate);
      this.priority.setValue(this.currentTicket.priority);
    }
  }

  private readValuesFromForm() {
    const formOutput = this.ticketForm.value;
    this.currentTicket.ticketName = formOutput.details ?? '';
    this.currentTicket.creationDate = new Date(formOutput.date ?? Date.now());
    this.currentTicket.customerName = formOutput.customerName ?? '';
    this.currentTicket.priority = formOutput.priority as TicketPriority;
  }
}
