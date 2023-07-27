import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as  Authactions from '../state/auth/auth.actions';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  name:string;
  email:string;
  password:string;
  constructor(private store:Store){

  }
  onSignUpClicked(){
    const credentials={
      email:this.email,
      password:this.password,
      name:this.name,
    }
    this.store.dispatch(Authactions.loginRequest({credentials}));
  }
}
