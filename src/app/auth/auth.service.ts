import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly LOCAL_STORAGE_KEY = 'isLoggedIn';
  private readonly MOCK_USER = {
    email: 'test@gmail.com',
    pass: 'ilovekebab',
  };

  public isLoggedIn;
  private isLoggedIn$;

  constructor() {
    this.isLoggedIn = this.readFromLocalStorage();
    this.isLoggedIn$ = new BehaviorSubject<boolean>(this.isLoggedIn);
  }

  getIsLogedInObservable(): Observable<boolean> {
    return this.isLoggedIn$.asObservable();
  }

  login(email: string, pass: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const isCredCorrect =
        this.MOCK_USER.email === email && this.MOCK_USER.pass === pass;
      if (isCredCorrect) {
        this.isLoggedIn = true;
        this.updateLoginState();
        this.updateLocalStorage();
        resolve();
      } else {
        reject();
      }
    });
  }

  logout() {
    this.isLoggedIn = false;
    this.updateLoginState();
    this.updateLocalStorage();
  }

  private updateLoginState() {
    this.isLoggedIn$.next(this.isLoggedIn);
  }

  private updateLocalStorage() {
    localStorage.setItem(this.LOCAL_STORAGE_KEY, this.isLoggedIn.toString());
  }
  private readFromLocalStorage(): boolean {
    const value = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    return JSON.parse(value ?? 'false');
  }
}
