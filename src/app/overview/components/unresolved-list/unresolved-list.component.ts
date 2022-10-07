import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unresolved-list',
  templateUrl: './unresolved-list.component.html',
  styleUrls: ['./unresolved-list.component.scss'],
})
export class UnresolvedListComponent implements OnInit {
  tickets = [
    {
      title: 'Waiting on Feature Request',
      ammount: 4238,
    },
    {
      title: 'Awaiting Customer Response',
      ammount: 1005,
    },
    {
      title: 'Awaiting Developer Fix',
      ammount: 914,
    },
    {
      title: 'Pending',
      ammount: 281,
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
