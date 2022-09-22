import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalWindowComponent } from './components/modal-window/modal-window.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HeaderComponent } from './components/header/header.component';
// import { RegularButtonComponent } from './components/regular-button/regular-button.component';

@NgModule({
  // declarations: [ModalWindowComponent, RegularButtonComponent],
  declarations: [ModalWindowComponent, NotFoundComponent, HeaderComponent],
  imports: [CommonModule, ReactiveFormsModule],
  // exports: [ModalWindowComponent, RegularButtonComponent],
  exports: [ModalWindowComponent, ReactiveFormsModule, HeaderComponent],
})
export class SharedModule {}
