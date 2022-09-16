import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss'],
})
export class SignUpPageComponent {
  @ViewChild('passwordField1') passwordField1!: ElementRef;
  @ViewChild('passwordField2') passwordField2!: ElementRef;
  passMode = true;
  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    password1: new FormControl('', [Validators.required]),
    password2: new FormControl('', [Validators.required]),
  });
  constructor(private router: Router) {}

  get email() {
    return this.signUpForm.get('email');
  }
  get firstName() {
    return this.signUpForm.get('firstName');
  }
  get lastName() {
    return this.signUpForm.get('lastName');
  }
  get password1() {
    return this.signUpForm.get('password1');
  }
  get password2() {
    return this.signUpForm.get('password2');
  }

  togglePassmode() {
    this.passMode = !this.passMode;
    this.passwordField1.nativeElement.type = this.passMode
      ? 'password'
      : 'text';
    this.passwordField2.nativeElement.type = this.passMode
      ? 'password'
      : 'text';
  }

  onSumbit() {
    const output = this.signUpForm.value;
    if (output.password1 !== output.password2) {
      alert('Passwords must not differ!');
    } else {
      this.router.navigate(['/login']);
    }
    console.log(output);
  }
}
