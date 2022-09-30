import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-wrapper',
  templateUrl: './modal-wrapper.component.html',
  styleUrls: ['./modal-wrapper.component.scss'],
})
export class ModalWrapperComponent implements OnInit {
  @Input()
  isHidden = true;

  constructor() {}

  ngOnInit(): void {}
}
