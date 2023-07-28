import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodosComponent } from './Mycomponents/todos/todos.component';
import { SigninComponent } from './Mycomponents/signin/signin.component';
import { SignupComponent } from './Mycomponents/signup/signup.component';
import { AuthGuard } from './auth.guard';
import { AddTodoComponent } from './Mycomponents/add-todo/add-todo.component';
import { TaskHistoryComponent } from './Mycomponents/taskhistory/taskhistory.component';
const routes: Routes = [
  // canactivate=> used to if user is logged in then only redirect to the home component
  // canActivate:[AuthGuard]
  { path: '', component: TodosComponent, canActivate:[AuthGuard]},
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'history/:id', component: TaskHistoryComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
