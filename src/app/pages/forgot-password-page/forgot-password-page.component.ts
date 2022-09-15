import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.scss'],
})
export class ForgotPasswordPageComponent {
  text = 'Enter your email from registered account';

  nextStep() {
    this.text =
      'Link to change your password has been sent to provided email if we have it inside our system';
  }

  reset() {
    this.text = 'Enter your email from registered account';
  }
}
