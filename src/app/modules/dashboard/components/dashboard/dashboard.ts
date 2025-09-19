import { Component } from '@angular/core';
import { Task } from '../../../task-management/models/task';
import { TaskManagement } from '../../../task-management/service/task-management';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
   projects: Task[] = [];

   totalTasks = 0;
  completedTasks = 0;
  pendingTasks = 0;
  pendingHighPriorityTasks = 0;
  constructor(private taskService: TaskManagement) {}

  ngOnInit() {
    // Subscribe to the tasks observable
    this.taskService.getTasks().subscribe(tasks => {
      this.projects = tasks;
      this.updateTaskCounts();
    });
  }

   updateTaskCounts() {
    this.totalTasks = this.projects.length;
    this.completedTasks = this.projects.filter(t => t.status === 'Completed').length;
    this.pendingTasks = this.projects.filter(t => t.status === 'Pending').length;
    this.pendingHighPriorityTasks = this.projects.filter(t => t.status === 'Pending' && t.priority === 'High').length;
  }

  getStatusSeverity(status: string): string {
    switch (status) {
      case 'Completed': return 'success';
      case 'Pending': return 'danger';
      default: return 'info';
    }
  }

  getPrioritySeverity(priority: string): string {
    switch (priority) {
      case 'High': return 'danger';
      case 'Medium': return 'warning';
      case 'Low': return 'success';
      default: return 'info';
    }
  }
}
