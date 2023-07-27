import { Component } from '@angular/core';
import { State, Store } from '@ngrx/store';
import * as  fromAuth from './Mycomponents/state/auth/auth.reducer';
import { Router } from '@angular/router';
import { logOut } from './Mycomponents/state/auth/auth.actions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  constructor(private store:Store<fromAuth.State>,private router:Router){

  }
  // this is a observable
  jwtToken$=this.store.select(fromAuth.selectToken);
  onSignOutclick(){
    localStorage.removeItem('auth_token');
    this.store.dispatch(logOut());
    this.router.navigateByUrl('/signin');
  }
  isLinkActive(link: string): boolean {
    return this.router.isActive(link, true);
  }
}
