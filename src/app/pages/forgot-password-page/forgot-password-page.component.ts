import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.scss'],
})
export class ForgotPasswordPageComponent {
  isNextState = false;
  text = 'Enter your email from registered account';
  emailForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
  });

  get email() {
    return this.emailForm.get('email');
  }

  onSumbit() {
    if (this.emailForm.valid) {
      this.nextStep();
    }
  }

  nextStep() {
    this.isNextState = true;
    this.text =
      'Link to change your password has been sent to provided email if we have it inside our system';
  }

  reset() {
    this.isNextState = false;
    this.text = 'Enter your email from registered account';
  }
}
