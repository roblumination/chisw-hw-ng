import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { TicketPriority } from '../../models/priority.enum';
import Ticket from '../../models/ticket.interface';
import { TicketService } from '../../services/ticket.service';

type FormMode = 'add' | 'edit';

@Component({
  selector: 'app-add-ticket-form',
  templateUrl: './add-ticket-form.component.html',
  styleUrls: ['./add-ticket-form.component.scss'],
})
export class AddTicketFormComponent {
  ticketSubscription: Subscription;
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
  @Input() ticketId: number = -1;
  @Output() requestCloseWindow = new EventEmitter<void>();

  readonly ticketBlank: Ticket = {
    id: -1,
    customerLastLogin: new Date(),
    customerName: 'INIT',
    lastUpdated: new Date(),
    creationDate: new Date(),
    photoUrl: 'INIT',
    ticketName: 'INIT',
    priority: TicketPriority.Hight,
  };
  currentTicket = this.ticketBlank;

  get mode(): FormMode {
    return this.ticketId >= 0 ? 'edit' : 'add';
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

  constructor(private ticketService: TicketService) {
    this.ticketSubscription = ticketService.getById(0).subscribe(() => {});
  }

  updateView() {
    if (this.mode === 'add') {
      this.currentTicket = this.ticketBlank;
      this.fillForm();
    } else {
      this.ticketSubscription.unsubscribe();
      this.ticketSubscription = this.ticketService
        .getById(this.ticketId)
        .subscribe((ticket) => {
          this.currentTicket = ticket;
          this.fillForm();
        });
    }
  }

  fillForm() {
    this.details.setValue(this.currentTicket.ticketName);
    this.customerName.setValue(this.currentTicket.customerName);
    // this.date.setValue(this.mode === 'add' ? '' : '00/00/0000');
    if (this.mode === 'edit') {
      this.date.setValue(this.currentTicket.creationDate);
      this.priority.setValue(this.currentTicket.priority);
    } else {
      // console.log()
      this.priority.setValue('');
      this.date.setValue('');
    }
    // this.
  }

  close() {
    this.requestCloseWindow.emit();
  }

  onSubmit() {
    console.log(this.ticketForm.value);
  }
}
