// import { Component } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { Task, TaskHistory } from '../models/task.model';
import { selectTask } from '../store/task.reducer';
import { ActivatedRoute } from '@angular/router';
import * as fromTask from '../store/task.reducer';
import { loadTasks } from '../store/task.actions';

@Component({
  selector: 'app-taskhistory',
  templateUrl: './taskhistory.component.html',
  styleUrls: ['./taskhistory.component.css'],
})
export class TaskHistoryComponent implements OnInit {
  todoId: string;
  taskHistory$: Observable<TaskHistory[]>;

  constructor(
    private store: Store<fromTask.TaskState>,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this line is executed to make sure that the data in the selcted task remains always availb
    this.store.dispatch(loadTasks());
    this.route.params.subscribe((params) => {

      this.todoId = params['id']; // 'id' is the parameter name defined in the route configuration
      // console.log(this.todoId);
      this.taskHistory$ = this.store.select(selectTask).pipe(
        map((tasks: Task[]) => {
          const selectedTask = tasks.find((task) => task._id === this.todoId);
          return selectedTask?.history || [];
        })
      );
    });
  }
}
