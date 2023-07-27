export interface Task {
    _id?: string; // Optional because the server will generate it on creation
    user?: string; // User ID to associate tasks with users
    title: string;
    description: string;
    dueDate: Date;
    priority: 'high' | 'medium' | 'low';
    state: 'in-progress' | 'to-do' | 'completed';
    Action?:string,
    history?: TaskHistory[]; // Optional because it will be set by the server
  }
  
  export interface TaskHistory {
    timestamp: Date;
    action: string;
  }
  