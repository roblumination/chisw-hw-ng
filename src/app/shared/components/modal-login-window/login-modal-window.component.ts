import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-modal-window',
  templateUrl: './login-modal-window.component.html',
  styleUrls: ['./login-modal-window.component.scss'],
})
export class ModalLoginWindowComponent implements OnInit {
  @Input() header = 'Header';
  @Input() content = 'Content';

  constructor() {}

  ngOnInit(): void {}
}
