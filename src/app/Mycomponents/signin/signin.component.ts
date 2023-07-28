import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as Authactions from '../state/auth/auth.actions';
import *as fromAuth from '../state/auth/auth.reducer';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  email:string;
  password:string;
  loginError$ = this.store.pipe(select(fromAuth.selctError));
  constructor(private store:Store<fromAuth.State>){

  }
  onSignInClicked(){
    const credentials={
      email:this.email,
      password:this.password,
    }
    this.store.dispatch(Authactions.loginRequest({credentials}));
  }
}
