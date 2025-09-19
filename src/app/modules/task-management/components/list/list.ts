import { Component, ElementRef, ViewChild } from '@angular/core';
import { Task } from '../../models/task';
import { Table } from 'primeng/table';
import { Observable, Subscription } from 'rxjs';
import { TaskManagement } from '../../service/task-management';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List {
  @ViewChild('dt') dt: Table | undefined;
  @ViewChild('deleteConfirmationModal')
  deleteModalRef!: ElementRef;
  tasks$!: Observable<Task[]>; // This is the Observable
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  statusOptions: string[] = ['Pending', 'Completed'];
  priorityOptions: string[] = ['Low', 'Medium', 'High'];
 taskIdToDelete: number | null = null;
  selectedStatus: string | null = null;
  selectedPriority: string | null = null;
  searchText: string = '';
  private subscription!: Subscription;
  
  constructor(private taskService: TaskManagement,private router: Router) {}
  ngOnInit() {
   this.getAlltasks() 
  }

  getAlltasks() {
     this.tasks$ = this.taskService.getTasks();
    this.subscription = this.tasks$.subscribe((tasks) => {
      this.tasks = tasks;
      console.log('Array of tasks:', this.tasks);
    });

    this.filteredTasks = this.tasks;
  }

  getPrioritySeverity(
    priority: string
  ): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' {
    switch (priority) {
      case 'High':
        return 'danger';
      case 'Medium':
        return 'warn';
      case 'Low':
        return 'success';
      default:
        return 'secondary';
    }
  }

  getTaskIcon(title: string): string {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('build')) return 'pi pi-code';
    if (titleLower.includes('documentation')) return 'pi pi-book';
    if (titleLower.includes('deploy')) return 'pi pi-cloud-upload';
    if (titleLower.includes('bug')) return 'pi pi-bug';
    if (titleLower.includes('database')) return 'pi pi-database';
    return 'pi pi-check-square';
  }

  ngOnDestroy(): void {
    // Clean up the subscription to prevent memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  applyFilters(): void {
    this.filteredTasks = this.tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
        task.description.toLowerCase().includes(this.searchText.toLowerCase());
      const matchesStatus = !this.selectedStatus || task.status === this.selectedStatus;
      const matchesPriority = !this.selectedPriority || task.priority === this.selectedPriority;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }

 onEdit(task: Task) {
  this.router.navigate(['tasks', 'edit', task.id]);

}

  onDelete(id: number): void {
     this.taskIdToDelete = id;
     this.taskService.deleteTask(this.taskIdToDelete);
     this.getAlltasks()
  }

  
}
