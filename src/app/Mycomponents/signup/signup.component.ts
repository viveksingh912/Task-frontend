import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as  Authactions from '../state/auth/auth.actions';
import * as fromAuth from '../state/auth/auth.reducer';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  name:string;
  email:string;
  password:string;
  loginError$ = this.store.pipe(select(fromAuth.selctError));
  constructor(private store:Store<fromAuth.State>){

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
