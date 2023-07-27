import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Task } from '../models/task.model';
import { Store } from '@ngrx/store';
import * as todoAction from '../store/task.actions';
import * as fromTodos from '../store/task.reducer';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap'; // Import NgbModal and NgbModalConfig

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent {
  @Input() todo: Task;
  @ViewChild('modalContent') modalContent: any;
  title: string;
  description: string;
  dueDate: Date;
  priority: 'low' | 'medium' | 'high';
  state:'to-do'|'in-progress'|'completed'
  taskId:string;
  Action:string;
  constructor(
    private store: Store<fromTodos.TaskState>,
    private router: Router,
    private modalService: NgbModal, // Inject NgbModal
    config: NgbModalConfig // Inject NgbModalConfig
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }
  ngOnInit(){
    this.title=this.todo.title;
    this.description=this.todo.description;
    this.dueDate=this.todo.dueDate;
    this.priority=this.todo.priority;
    this.state=this.todo.state;
    this.Action='';
    if(this.todo._id)
    this.taskId=this.todo._id;
  }

  onClick(taskId: string | undefined) {
    if (taskId) {
      this.store.dispatch(todoAction.deleteTask({ taskId }));
      console.log("Delete has been triggered");
    }
  }

  onUpdateClick() {
    // Implement the logic to open the modal for task update
    if (this.todo._id) {
      // Navigate to the task history component with the task ID
      this.router.navigateByUrl(`update/${this.todo._id}`);
    }
  }

  showHistory() {
    if (this.todo._id) {
      // Navigate to the task history component with the task ID
      this.router.navigateByUrl(`history/${this.todo._id}`);
    }
  }
  onSubmit(){
    if(this.title){
      if(this.title!=this.todo.title){
        this.Action='Title ,';
      }
      if(this.description!=this.todo.description){
        this.Action=this.Action+'Description ,';
      }
      if(this.dueDate!=this.todo.dueDate){
        this.Action=this.Action+'Due Date ,';
      }
      if(this.state!=this.todo.state){
        this.Action=this.Action+'Status ,';
      }
      if(this.priority!= this.todo.priority){
        this.Action=this.Action+'Priority ,';
      }
      let new_Action=this.Action.slice(0, -1);
      new_Action=new_Action+'Changed ';
      
      const task={
        title:this.title,
        description:this.description,
        dueDate:this.dueDate,
        priority:this.priority,
        state:this.state,
        Action:new_Action,
      }
      const taskId=this.todo._id;
      if(taskId && new_Action.length>9)
      this.store.dispatch(todoAction.updateTask({taskId,task}));
    }
  }

  // Function to open the modal
  openModal(content: any) {
    this.modalService.open(content);
  }
}
