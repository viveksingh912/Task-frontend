import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { selectToken } from './Mycomponents/state/auth/auth.reducer'; // Import the selectToken selector
import { map, take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<any>, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(selectToken),
      take(1), 
      map((token: string | null) => {
        const isLoggedIn = token !== null;
        return isLoggedIn; 
      }),
      map((isLoggedIn: boolean) => {
        if (isLoggedIn) {
          return true; 
        } else {
          this.router.navigate(['/signup']);
          return false;
        }
      })
    );
  }
}
