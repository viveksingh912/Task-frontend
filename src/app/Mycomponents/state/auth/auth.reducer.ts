import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store"
import { loginFailure, loginSuccess ,logOut} from "./auth.actions"
import { act } from "@ngrx/effects";
// import { state } from "@angular/animations"

export interface State{
    token:string|null,
    loginError?:string,
}
const storedToken = localStorage.getItem("auth_token");

export const initialState: State = {
  token: storedToken ? storedToken : null,
};

const _authReducer=createReducer(
    initialState,
    on(loginSuccess,(state,{auth_token})=>{
         return{
            ...state,
            token:auth_token
         };
    }),
    on(loginFailure,(state,{err})=>{
         return{
            ...state ,
            token:null,
            loginError:err,
         };
    }),
    on(logOut,(state)=>{
         return{
            ...state ,
            token:null,
         };
    })
) 
export function authReducer(state:any,action:any){
    return _authReducer(state,action);
}
export const selectAuthState=createFeatureSelector<State>('auth');
export const selectToken=createSelector(selectAuthState,state=>state.token);