import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  mockUser = {
    email: 'test@gmail.com',
    pass: '123456',
  };
  passMode = true;
  @ViewChild('passwordField') passwordField!: ElementRef;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router) {}

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  togglePassmode() {
    this.passMode = !this.passMode;
    this.passwordField.nativeElement.type = this.passMode ? 'text' : 'password';
  }

  onSumbit() {
    if (
      this.mockUser.email === this.loginForm.value.email &&
      this.mockUser.pass === this.loginForm.value.password
    ) {
      console.log('USER OK!');
      this.router.navigate(['/main']);
    }
    console.log(this.loginForm.value);
  }
}
