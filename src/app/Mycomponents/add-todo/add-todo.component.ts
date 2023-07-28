import { Component, EventEmitter, Output } from '@angular/core';
import { Task } from '../models/task.model';
import { Store } from '@ngrx/store';
import * as  fromTodos from '../store/task.reducer';
import * as todoAction from '../store/task.actions';
import { take } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css'],
})
export class AddTodoComponent {
  title: string;
  description: string;
  dueDate: Date;
  priority: 'low' | 'medium' | 'high';
  state:'to-do'|'in-progress'|'completed';
  @Output() todoHide: EventEmitter<void>=new EventEmitter();
  constructor(private store:Store<fromTodos.TaskState>,private router:Router ){

  }
  
  onClick() {
    const task = {
      title: this.title,
      description: this.description,
      dueDate: this.dueDate,
      priority: this.priority,
      state:this.state
    };
    this.store.dispatch(todoAction.addTask({task}));
    this.title='';
    this.description='';
    this.dueDate=new Date;
    this.priority='low';
    this.todoHide.emit();
  }
}
