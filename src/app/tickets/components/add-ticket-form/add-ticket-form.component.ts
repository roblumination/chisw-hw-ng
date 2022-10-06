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

  readonly TICKET_BLANK: Ticket = {
    id: -1,
    customerLastLogin: new Date(),
    customerName: 'INIT',
    lastUpdated: new Date(),
    creationDate: new Date(),
    photoUrl: 'INIT',
    ticketName: 'INIT',
    priority: TicketPriority.Hight,
  };
  currentTicket = this.TICKET_BLANK;

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

  @Input() ticketId: number = -1;
  @Output() requestCloseWindow = new EventEmitter<void>();

  constructor(private ticketService: TicketService) {
    this.ticketSubscription = ticketService.getById(0).subscribe(() => {});
  }

  updateView() {
    this.ticketForm.reset();
    if (this.mode === 'add') {
      this.currentTicket = this.TICKET_BLANK;
    } else {
      this.ticketSubscription.unsubscribe();
      this.ticketSubscription = this.ticketService
        .getById(this.ticketId)
        .subscribe((ticket) => {
          this.currentTicket = ticket;
          this.fillTicketForm();
        });
    }
  }

  fillTicketForm() {
    this.details.setValue(this.currentTicket.ticketName);
    this.customerName.setValue(this.currentTicket.customerName);
    if (this.mode === 'edit') {
      this.date.setValue(this.currentTicket.creationDate);
      this.priority.setValue(this.currentTicket.priority);
    } else {
      this.priority.setValue('');
      this.date.setValue('');
    }
  }

  closeModal() {
    this.requestCloseWindow.emit();
  }

  onSubmit() {
    if (this.ticketForm.valid) {
      this.mode === 'add' ? this.addTicket() : this.editTicket();
      this.closeModal();
    }
  }

  editTicket() {
    const formOutput = this.ticketForm.value;
    this.currentTicket.customerName = formOutput.customerName!;
    this.currentTicket.ticketName = formOutput.details!;
    this.currentTicket.creationDate = new Date(formOutput.date!);
    this.currentTicket.priority = formOutput.priority as TicketPriority;
    this.currentTicket.lastUpdated = new Date();
  }

  addTicket() {
    console.log('ADD!');
    const formOutput = this.ticketForm.value;
    this.currentTicket.customerName = formOutput.customerName!;
    this.currentTicket.ticketName = formOutput.details!;
    this.currentTicket.photoUrl = this.ticketService.getRandomProfilePic();
    this.currentTicket.creationDate = new Date(formOutput.date!);

    // IDK HOW TO DO IT ANOTHER WAY
    this.currentTicket.priority = formOutput.priority as TicketPriority;
    //

    this.ticketService.add(this.currentTicket);
  }
}
