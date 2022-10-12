import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NgForm,
} from '@angular/forms';
import { first } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  isPreviewHidden = true;
  isEditMode = false;

  user = {
    firstName: 'Jones',
    lastName: 'Ferdinand',
    email: 'superemail@gmail.com',
    address: 'Unknow city, unknow country',
  };

  editForm = new FormGroup({
    firstName: new FormControl(this.user.firstName),
    lastName: new FormControl(this.user.lastName),
    email: new FormControl(this.user.email),
    address: new FormControl(this.user.address),
  });

  @ViewChild('editF') eForm!: NgForm;

  get firstName() {
    return this.editForm.get('firstName') as FormControl;
  }
  get lastName() {
    return this.editForm.get('lastName') as FormControl;
  }
  get email() {
    return this.editForm.get('email') as FormControl;
  }
  get address() {
    return this.editForm.get('address') as FormControl;
  }

  constructor() {}

  openForm() {
    this.isEditMode = true;
  }

  closeForm() {
    this.isEditMode = false;
  }

  triggerSubmit() {
    if (this.isEditMode) {
      this.eForm.ngSubmit.emit();
    }
  }

  onSubmit() {
    console.log('SUBMITED FROM FORM!');
  }

  submit() {
    if (this.isEditMode) {
      const output = this.editForm.value;
      this.user.firstName = output.firstName ?? '';
      this.user.lastName = output.lastName ?? '';
      this.user.email = output.email ?? '';
      this.user.address = output.address ?? '';

      this.closeForm();
    } else {
      this.openForm();
    }
  }

  ngOnInit(): void {}
}
