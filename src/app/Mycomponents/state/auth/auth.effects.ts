import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap,tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http"; // Import HttpClient

import * as AuthActions from "./auth.actions";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private http: HttpClient,private router: Router) {}

  loginRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginRequest),
      switchMap((action) => {
        const { email, password, name } = action.credentials;
        // seleting endpoint based on the provided  credentials
        const endpoint = name ? "https://task-backend-tau.vercel.app/api/auth/createuser" : "https://task-backend-tau.vercel.app/api/auth/login";
        return this.http.post<{ token: string }>(endpoint, action.credentials).pipe(
          map((response) => AuthActions.loginSuccess({ auth_token: response.token })),
          catchError((error) => {
            console.error("API call error:", error.error.error); 
            return of(AuthActions.loginFailure({ err: error.error.error }));
          }),
          // tap(() => {
          //   console.log("API call completed successfully!"); 
          // })
        );
      })
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap((action) => {
          localStorage.setItem('auth_token',action.auth_token);
          this.router.navigateByUrl('/');
        })
      ),
    { dispatch: false } // Add this line to prevent dispatching any action from this effect
  );
}
