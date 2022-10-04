import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

// --- --- Components --- ---
import { TableWidgetsComponent } from './components/table-widgets/table-widgets.component';
import { TicketsComponent } from './tickets.component';

// --- --- Material --- ---
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PriorityChipsComponent } from './components/priority-chips/priority-chips.component';
import { TicketsFilterPipe } from './pipes/tickets-filter.pipe';
import { MatButtonModule } from '@angular/material/button';
import { AddTicketFormComponent } from './components/add-ticket-form/add-ticket-form.component';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    TicketsComponent,
    TableWidgetsComponent,
    PriorityChipsComponent,
    TicketsFilterPipe,
    AddTicketFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatRippleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  providers: [MatDatepickerModule],
})
export class TicketsModule {}
