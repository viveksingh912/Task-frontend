
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, mergeMap, catchError, withLatestFrom } from 'rxjs/operators';
import { of ,tap} from 'rxjs';
import { Task } from '../models/task.model';
import * as TaskActions from './task.actions';
import * as fromAuth from '../state/auth/auth.reducer';
import { Store, select } from '@ngrx/store';
// import { AppState } from './app.state';

@Injectable()
export class TaskEffects {
  private apiUrl = 'http://localhost:5000/api'; // Replace this with your actual API endpoint

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromAuth.State> // Inject the store
  ) {}

  private getHeaders(authToken: string | null): HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  
    if (authToken) {
      headers = headers.set('Authorization', `Bearer ${authToken}`);
      console.log(headers.get('Authorization'));
    }
  
    return headers;
  }
 
  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTasks),
      // Fetch the auth token from the store using 'select'
      withLatestFrom(this.store.select(fromAuth.selectToken)),
      mergeMap(([action, authToken]) =>
        this.http.get<Task[]>(`${this.apiUrl}/tasks`, {
          headers: this.getHeaders(authToken), // Use the fetched auth token in the headers
        }).pipe(
          map((tasks) => TaskActions.loadTasksSuccess({ tasks })),
          catchError((error) =>
            of(TaskActions.loadTasksFailure({ error: error.message }))
          )
        )
      )
    )
  );

  

// ...

addTask$ = createEffect(() =>
  this.actions$.pipe(
    ofType(TaskActions.addTask),
    // Fetch the auth token from the store using 'select'
    withLatestFrom(this.store.select(fromAuth.selectToken)),
    mergeMap(([action, authToken]) =>
      this.http.post<Task>(`${this.apiUrl}/tasks`, action.task, {
        headers: this.getHeaders(authToken), // Use the fetched auth token in the headers
      }).pipe(
        // tap(task => console.log('Task added:', task)), // Add the console.log statement here
        map(task => TaskActions.addTaskSuccess({ task })),
        catchError(error => of(TaskActions.addTaskFailure({ error: error.message })))
      )
    )
  )
);


  updateTask$ = createEffect(() =>
  this.actions$.pipe(
    ofType(TaskActions.updateTask),
    withLatestFrom(this.store.select(fromAuth.selectToken)),
    mergeMap(([action, authToken]) =>
      this.http.put<Task>(`${this.apiUrl}/tasks/${action.taskId}`, action.task, {
        headers: this.getHeaders(authToken),
      }).pipe(
        // tap(task => console.log('Task added:', task)),
        map(task => TaskActions.updateTaskSuccess({ task })),
        catchError(error => of(TaskActions.updateTaskFailure({ error: error.message })))
      )
    )
  )
);


deleteTask$ = createEffect(() =>
this.actions$.pipe(
  ofType(TaskActions.deleteTask),
  withLatestFrom(this.store.select(fromAuth.selectToken)),
  mergeMap(([action, authToken]) =>
    this.http.delete<any>(`${this.apiUrl}/tasks/${action.taskId}`, {
      headers: this.getHeaders(authToken),
    }).pipe(
      map(() => TaskActions.deleteTaskSuccess({ taskId: action.taskId })),
      catchError(error => of(TaskActions.deleteTaskFailure({ error: error.message })))
    )
  )
)
);
}
