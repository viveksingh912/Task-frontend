import {
  createReducer,
  on,
  Action,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { Task } from '../models/task.model';
import * as TaskActions from './task.actions';
import { findIndex } from 'rxjs';

export interface TaskState {
  tasks: Task[];

}

export const initialState: TaskState = {
  tasks: [],
};

const taskReducer = createReducer(
  initialState,
  on(TaskActions.loadTasksSuccess, (state, { tasks }) => ({ ...state, tasks })),
  on(TaskActions.addTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task],
  })),
  on(TaskActions.updateTask, (state, { taskId, task }) => {
    const updatedTask = state.tasks.find((t) => t._id === taskId);
    console.log(updatedTask);
    if (updatedTask) {
      const updatedFields = { ...updatedTask, ...task };
      const updatedTaskWithHistory = {
        ...updatedFields,
        history: [
          ...(updatedTask.history || []),
          { timestamp: new Date(), action: 'Update' },
        ],
      };

      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t._id === taskId ? updatedTaskWithHistory : t
        ),
      };
    } else {
      return state;
    }
  }),
  on(TaskActions.updateTaskSuccess, (state, { task }) => {
    const index = state.tasks.findIndex((t) => t._id === task._id);
    console.log(index);
    if (index !== -1) {
      const updatedTasks = [...state.tasks];
      updatedTasks.splice(index, 1, task);
      return {
        ...state,
        tasks: updatedTasks, 
      };
    }

    return state;
  }),
  on(TaskActions.deleteTask, (state, { taskId }) => ({
    ...state,
    tasks: state.tasks.filter((t) => t._id !== taskId),
  }))
);

export function reducer(state: TaskState | undefined, action: Action) {
  return taskReducer(state, action);
}
export const selectTaskState = createFeatureSelector<TaskState>('tasks');
export const selectTask = createSelector(
  selectTaskState,
  (state) => state.tasks
);
export const selectTaskById = (taskId: string) =>
  createSelector(selectTaskState, (state) =>
    state.tasks.find((task) => task._id === taskId) || null
  );