import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskManagement {
  private tasks: Task[] = [
  {
    id: 1,
    title: 'Task Management App',
    description: 'Build a task management application with Angular and PrimeNG',
    priority: 'High',
    status: 'Pending',
    dueDate: '2023-11-20'
  },
  {
    id: 2,
    title: 'E-commerce Website',
    description: 'Develop a full-featured e-commerce website',
    priority: 'High',
    status: 'Completed',
    dueDate: '2023-10-15'
  },
  {
    id: 3,
    title: 'Mobile App Development',
    description: 'Create a mobile app for Android and iOS',
    priority: 'Medium',
    status: 'Pending',
    dueDate: '2023-12-05'
  },
  {
    id: 4,
    title: 'Database Migration',
    description: 'Migrate existing database to new SQL server',
    priority: 'Low',
    status: 'Completed',
    dueDate: '2023-09-30'
  }
];

  private nextId = 1;

  private tasksSubject = new BehaviorSubject<Task[]>(this.tasks);

  constructor() {}

  
  getTasks(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

 
  addTask(task: Task): void {
    const newTask = { ...task, id: this.nextId++ };
    this.tasks.push(newTask);
    this.tasksSubject.next(this.tasks); 
    console.log('Task added:', this.tasks);
  }

 
  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.tasksSubject.next(this.tasks); 
  }

  
  editTask(updatedTask: Task): void {
    const index = this.tasks.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
      this.tasksSubject.next(this.tasks); 
    }
  }
}
