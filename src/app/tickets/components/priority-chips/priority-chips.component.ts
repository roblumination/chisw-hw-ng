import { Component, Input, OnInit } from '@angular/core';
import { TicketPriority } from '../../models/priority.enum';

@Component({
  selector: 'app-priority-chips',
  templateUrl: './priority-chips.component.html',
  styleUrls: ['./priority-chips.component.scss'],
})
export class PriorityChipsComponent implements OnInit {
  @Input() priority: TicketPriority = TicketPriority.Low;

  constructor() {}

  ngOnInit(): void {}

  isHight() {
    return this.priority === TicketPriority.Hight;
  }

  isLow() {
    return this.priority === TicketPriority.Low;
  }
}
