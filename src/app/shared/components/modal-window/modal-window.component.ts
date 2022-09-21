import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss'],
})
export class ModalWindowComponent implements OnInit {
  @Input() header = 'Header';
  @Input() content = 'Content';

  constructor() {}

  ngOnInit(): void {}
}
