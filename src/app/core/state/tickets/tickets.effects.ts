import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, map, mergeMap } from 'rxjs';
import { TicketService } from '../../services/ticketService/ticket.service';
import ticketActions from './tickets.actions';

@Injectable()
export class TicketsEffects {
  constructor(
    private actions$: Actions,
    private ticketService: TicketService
  ) {}

  loadTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ticketActions.loadTickets),
      mergeMap(() =>
        this.ticketService.getAll().pipe(
          map((tickets) =>
            ticketActions.loadTicketsSuccess({ tickets: tickets })
          ),
          catchError(() => EMPTY)
        )
      )
    )
  );

  addTicket$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ticketActions.addTicket),
      mergeMap(({ ticket }) =>
        this.ticketService.add(ticket).pipe(
          map(() => ticketActions.addTicketSuccess()),
          catchError(() => EMPTY)
        )
      )
    );
  });

  addTicketSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ticketActions.addTicketSuccess),
      map(() => ticketActions.loadTickets())
    );
  });

  deleteTicket$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ticketActions.deleteTicket),
      mergeMap(({ ticketId }) =>
        this.ticketService.delete(ticketId).pipe(
          map(() => ticketActions.addTicketSuccess()),
          catchError(() => EMPTY)
        )
      )
    );
  });

  deleteContactSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ticketActions.deleteTicket),
      map(() => ticketActions.loadTickets())
    );
  });

  editContact$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ticketActions.editTicket),
      mergeMap(({ ticket }) =>
        this.ticketService.edit(ticket).pipe(
          map(() => ticketActions.addTicketSuccess()),
          catchError(() => EMPTY)
        )
      )
    );
  });

  editTicketSuccess$ = createEffect(() => {
    console.log('ADD SUCCEDD');
    return this.actions$.pipe(
      ofType(ticketActions.editTicketSuccess),
      map(() => ticketActions.loadTickets())
    );
  });
}
