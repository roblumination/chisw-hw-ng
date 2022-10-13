import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-loader',
  templateUrl: './card-loader.component.html',
  styleUrls: ['./card-loader.component.scss'],
})
export class CardLoaderComponent {
  @Input()
  isHidden = false;
}
