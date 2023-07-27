import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodosComponent } from './Mycomponents/todos/todos.component';
import { TodoItemComponent } from './Mycomponents/todo-item/todo-item.component';
import { AddTodoComponent } from './Mycomponents/add-todo/add-todo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { AboutComponent } from './Mycomponents/about/about.component';
import { SigninComponent } from './Mycomponents/signin/signin.component';
import { SignupComponent } from './Mycomponents/signup/signup.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authReducer } from './Mycomponents/state/auth/auth.reducer';
import { AuthEffects } from './Mycomponents/state/auth/auth.effects';
import { HttpClientModule } from '@angular/common/http';
import { reducer } from './Mycomponents/store/task.reducer';
import { TaskEffects } from './Mycomponents/store/tast.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TaskHistoryComponent } from './Mycomponents/taskhistory/taskhistory.component';
// import { UpdateComponent } from './update/update.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    TodoItemComponent,
    AddTodoComponent,
    SigninComponent,
    SignupComponent,
    TaskHistoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot({auth:authReducer,tasks:reducer}),
    EffectsModule.forRoot([AuthEffects,TaskEffects]),
    ReactiveFormsModule,
    HttpClientModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
