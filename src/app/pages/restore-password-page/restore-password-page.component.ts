import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restore-password-page',
  templateUrl: './restore-password-page.component.html',
  styleUrls: ['./restore-password-page.component.scss'],
})
export class RestorePasswordPageComponent {
  passMode = true;
  resetForm = new FormGroup({
    password1: new FormControl('', [Validators.required]),
    password2: new FormControl('', [Validators.required]),
  });

  get password1() {
    return this.resetForm.get('password1');
  }

  get password2() {
    return this.resetForm.get('password2');
  }

  @ViewChild('passwordField1') passwordField1!: ElementRef;
  @ViewChild('passwordField2') passwordField2!: ElementRef;

  constructor(private router: Router) {}

  onSubmit() {
    const [pass1, pass2] = [
      this.resetForm.value.password1,
      this.resetForm.value.password2,
    ];
    if (pass1 === pass2) {
      this.router.navigate(['/login']);
    } else {
      alert('Same passwords required!');
    }
  }

  togglePassMode() {
    this.passMode = !this.passMode;
    this.passwordField1.nativeElement.type = this.passMode
      ? 'password'
      : 'text';
    this.passwordField2.nativeElement.type = this.passMode
      ? 'password'
      : 'text';
  }
}
