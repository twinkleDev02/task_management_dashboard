import { Component } from '@angular/core';
import { Task, TaskPriority } from '../../../task-management/modals/task.model';
import { TaskService } from '../../../task-management/service/task-service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
 tasks: Task[] = [];
  pendingTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  completedTasks: Task[] = [];
  highPriorityPending: Task[] = [];

  dataSource = new MatTableDataSource<Task>([]);
  displayedColumns: string[] = ['title', 'status', 'dueDate', 'priority'];

  private taskSubscription!: Subscription;
  cols = 3;

  constructor(
    private taskService: TaskService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).subscribe(result => {
      if (result.matches) {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.cols = 1;
        } else if (result.breakpoints[Breakpoints.Small]) {
          this.cols = 2;
        } else {
          this.cols = 3;
        }
      }
    });
  }

  ngOnInit(): void {
    this.taskSubscription = this.taskService.fetchTasks().subscribe({
      next: (tasks: Task[]) => {
        this.tasks = tasks;
        this.dataSource.data = tasks;
        this.filterTasks();
      },
      error: (err) => {
        console.error('Failed to fetch tasks', err);
      }
    });
  }

  filterTasks(): void {
    this.pendingTasks = this.tasks.filter(t => t.status === 'Pending');
    this.inProgressTasks = this.tasks.filter(t => t.status === 'In Progress');
    this.completedTasks = this.tasks.filter(t => t.status === 'Completed');
    this.highPriorityPending = this.tasks.filter(
      t => t.status === 'Pending' && t.priority === 'High'
    );
  }

  ngOnDestroy(): void {
    if (this.taskSubscription) {
      this.taskSubscription.unsubscribe();
    }
  }
}
