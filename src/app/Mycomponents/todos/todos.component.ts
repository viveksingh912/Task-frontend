import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromTodos from '../store/task.reducer';
import { Observable, auditTime, map } from 'rxjs';
import { Task } from '../models/task.model';
import { loadTasks } from '../store/task.actions';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent {
  todos$: Observable<Task[]>;
  showAddTaskForm: boolean = false;
  sortByState: boolean = false;
  sortByDueDate: boolean = false;
  sortByPriority: boolean = false;

  constructor(private store: Store<fromTodos.TaskState>) {}

  ngOnInit() {
    this.store.dispatch(loadTasks());
    this.todos$ = this.store.pipe(select(fromTodos.selectTask));
  }

  toggleAddTaskForm() {
    this.showAddTaskForm = !this.showAddTaskForm;
  }
  onSort(criteria: string) {
    switch (criteria) {
      case 'state':
        this.sortByStateFunc();
        break;
      case 'dueDate':
        this.sortByDueDateFunc();
        break;
      case 'priority':
        this.sortByPriorityFunc();
        break;
      default:
        break;
    }
  }

  sortByStateFunc() {
    this.sortByState = !this.sortByState;
    if (this.sortByState) {
      const stateOrder = { 'to-do': 3,'in-progress': 2,  'completed': 1 };
      this.todos$ = this.todos$.pipe(
        map((tasks) => [...tasks].sort((a, b) => stateOrder[b.state] - stateOrder[a.state]))
      );
    } else {
      const stateOrder = { 'in-progress': 2, 'to-do': 1, 'completed': 3 }; 
      this.todos$ = this.todos$.pipe(
        map((tasks) => [...tasks].sort((a, b) => stateOrder[b.state] - stateOrder[a.state]))
      );
    }
  }

  sortByDueDateFunc() {
    this.sortByDueDate = !this.sortByDueDate;
    
    const originalSortOrder = !this.sortByDueDate;
  
    this.todos$ = this.todos$.pipe(
      map((tasks) => {
        const updatedTasks = tasks.map((task) => ({
          ...task,
          dueDate: typeof task.dueDate === 'string' ? new Date(task.dueDate) : task.dueDate,
        }));
        updatedTasks.sort((a, b) => {
          if (a.dueDate instanceof Date && b.dueDate instanceof Date) {
            return originalSortOrder ? a.dueDate.getTime() - b.dueDate.getTime() : b.dueDate.getTime() - a.dueDate.getTime();
          } else if (a.dueDate instanceof Date && (!b.dueDate || !(b.dueDate instanceof Date))) {
            return originalSortOrder ? -1 : 1;
          } else if (b.dueDate instanceof Date && (!a.dueDate || !(a.dueDate instanceof Date))) {
            return originalSortOrder ? 1 : -1;
          } else {
            return 0;
          }
        });
        return updatedTasks;
      })
    );
  }
  
  
  

  sortByPriorityFunc() {
    this.sortByPriority = !this.sortByPriority;
    if (this.sortByPriority) {
      const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
      this.todos$ = this.todos$.pipe(
        map((tasks) => [...tasks].sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]))
      );
    } else {
      const priorityOrder = { 'high': 1, 'medium': 2, 'low': 3 }; 
      this.todos$ = this.todos$.pipe(
        map((tasks) => [...tasks].sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]))
      );
    }
  }
  exportToCsv() {
    const tasksToExport: Task[] = [];
    this.todos$.subscribe((tasks) => {
      tasksToExport.push(...tasks);
    });

    const csvData = this.convertToCsv(tasksToExport);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'tasks.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  convertToCsv(data: Task[]): string {
    const csvArray: any[] = [];
    const headers = ['Title', 'Description', 'Priority', 'Due Date', 'Status'];
    csvArray.push(headers);

    data.forEach((task) => {
      const taskRow = [task.title, task.description, task.priority, task.dueDate, task.state];
      csvArray.push(taskRow);
    });

    return csvArray.map((row) => row.join(',')).join('\n');
  }
}
