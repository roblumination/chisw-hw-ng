import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  private readonly REDIRECT_PATH = '/main/overview';
  passMode = true;
  @ViewChild('passwordField') passwordField!: ElementRef;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router, private authService: AuthService) {
    if (this.authService.isLoggedIn) this.redirectToMainPage();
  }

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
    const [email, pass] = [
      this.loginForm.value.email ?? '',
      this.loginForm.value.password ?? '',
    ];
    this.authService
      .login(email, pass)
      .then(() => {
        this.redirectToMainPage();
      })
      .catch(() => {
        alert('wrong password');
      });
    // console.log('USER OK!');
    // this.router.navigate(['/main']);
  }

  private redirectToMainPage() {
    this.router.navigate([this.REDIRECT_PATH]);
  }
}
