import { createAction,props } from "@ngrx/store";
export const loginRequest=createAction(
    '[Auth] Login Request',
    props<{ credentials:{email:string,password:string,name?:string}}>()
)
export const loginSuccess=createAction(
    '[Auth] Login Success',
    props<{auth_token:string}>()
)
export const loginFailure=createAction(
    '[Auth] Login Failure',
    props<{ err:string}>()
)
export const logOut=createAction(
    '[Auth] Logout',
    // props<{ err:string}>()
)
