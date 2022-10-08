import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from './contacts.component';
import { SharedModule } from '../shared/shared.module';
import { AddContactFormComponent } from './components/add-contact-form/add-contact-form.component';
import { ContactTableWidgetsComponent } from './components/table-widgets/contact-table-widgets.component';
import { ContactFilterPipe } from './pipes/contact-filter.pipe';

// --- --- MATERIAL --- ---
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  MatFormFieldModule,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { PaginatorConfig } from '../shared/PaginatorConfig';
import { ContactsRoutingModule } from './contacts-routing.module';

@NgModule({
  declarations: [
    ContactsComponent,
    AddContactFormComponent,
    ContactTableWidgetsComponent,
    ContactFilterPipe,
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
    MatPaginatorModule,
    ContactsRoutingModule,
  ],
  providers: [
    MatDatepickerModule,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
    { provide: MatPaginatorIntl, useValue: PaginatorConfig() },
  ],
})
export class ContactsModule {}
