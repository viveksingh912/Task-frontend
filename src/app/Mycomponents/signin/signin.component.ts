import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Authactions from '../state/auth/auth.actions';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  email:string;
  password:string;
  constructor(private store:Store){

  }
  onSignInClicked(){
    const credentials={
      email:this.email,
      password:this.password,
    }
    this.store.dispatch(Authactions.loginRequest({credentials}));
  }
}
