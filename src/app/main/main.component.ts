import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationTabsNames } from './NavigationTabsNames.enum';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  constructor(private router: Router) {}

  goToPage(val: NavigationTabsNames) {
    this.router.navigate(['main/' + val.toLocaleLowerCase()]);
  }
}
