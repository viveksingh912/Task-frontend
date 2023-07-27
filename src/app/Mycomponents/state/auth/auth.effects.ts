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
        const endpoint = name ? "http://localhost:5000/api/auth/createuser" : "http://localhost:5000/api/auth/login";
        return this.http.post<{ token: string }>(endpoint, action.credentials).pipe(
          map((response) => AuthActions.loginSuccess({ auth_token: response.token })),
          catchError((error) => {
            console.error("API call error:", error); // Log the error if it occurs
            return of(AuthActions.loginFailure({ err: error.message }));
          }),
          tap(() => {
            console.log("API call completed successfully!"); // Add your console.log statement here
          })
        );
      })
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap((action) => {
          // Log the auth token and navigate to the desired URL on login success
          // console.log("Login successful. Token:", action.auth_token);
          localStorage.setItem('auth_token',action.auth_token);
          this.router.navigateByUrl('/'); // Replace "/dashboard" with your desired URL
        })
      ),
    { dispatch: false } // Add this line to prevent dispatching any action from this effect
  );
}
