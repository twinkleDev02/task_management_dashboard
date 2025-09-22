import { Component, effect, inject, viewChild, ViewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { combineLatest, debounceTime, startWith } from 'rxjs';
import { TaskService } from '../../service/task-service';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from '../../modals/task.model';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { StoreService } from '../../../shared/service/store.service';

@Component({
  selector: 'app-all-task',
  standalone: false,
  templateUrl: './all-task.html',
  styleUrl: './all-task.scss'
})
export class AllTask {
 private readonly service = inject(StoreService);
  private readonly router = inject(Router);
  private readonly snack: MatSnackBar = inject(MatSnackBar);
  private readonly dialog = inject(MatDialog);
  displayedColumns = ['icon','title', 'description', 'priority', 'status','due','mark here', 'actions'];
  tasks$ = toSignal(this.service.task$);
  datasource = new MatTableDataSource<Task>(this.tasks$() || []);
  paginator = viewChild(MatPaginator);

  search = new FormControl('', { nonNullable: true });
  status = new FormControl('', { nonNullable: true });
  priority = new FormControl('', { nonNullable: true });

  constructor(private storeService: StoreService) {
    effect(() => {
      this.datasource.data = this.tasks$() || [];
      this.datasource.paginator = this.paginator();  // ✅ connect paginator
    });
  }

  ngOnInit() {
    this.datasource.filterPredicate = this.createFilterPredicate();

    combineLatest([
      this.search.valueChanges.pipe(debounceTime(300), startWith('')),
      this.status.valueChanges.pipe(startWith('')),
      this.priority.valueChanges.pipe(startWith(''))
    ]).subscribe(([search, status, priority]) => {
      // Pass the combined filter values as an object. The filterPredicate will use this.
      const filterValue = { search: search.trim().toLowerCase(), status: status.toLowerCase(), priority: priority.toLowerCase() };
      this.datasource.filter = JSON.stringify(filterValue);
    });
  }

  private createFilterPredicate() {
  return (data: Task, filter: string): boolean => {
    // Parse the JSON string to get the filter values
    const searchTerms = JSON.parse(filter);

    const matchSearch = data.title.toLowerCase().includes(searchTerms.search) ||
                        data.description.toLowerCase().includes(searchTerms.search);

    const matchStatus = searchTerms.status === '' || data.status.toLowerCase() === searchTerms.status;

    const matchPriority = searchTerms.priority === '' || data.priority.toLowerCase() === searchTerms.priority;
    
    // Return true only if all filter conditions are met
    return matchSearch && matchStatus && matchPriority;
  };
}

  add() {
    this.router.navigate(['tasks/add']);
  }

  edit(task: Task) {
    console.log(task.id);
    if (task.id != null) this.router.navigate(['tasks/edit', task.id]);
  }

  complete(task: Task) {
    if (!task.id) return;
    this.storeService.updateTask({ ...task, status: 'Completed' });
    this.snack.open('Task marked as completed', 'Dismiss', { duration: 2500 });
  }

  delete(task: Task) {
    if (!task.id) return;
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Delete Task', message: `Delete "${task.title}"?` },
    });
    ref.afterClosed().subscribe((ok: boolean) => {
      if (ok) {
        this.storeService.deleteTask(task.id);
      }
    });
  }

  onImageError(event: Event): void {
  const imgElement = event.target as HTMLImageElement;
  imgElement.src = 'icon.png'; 
}

}
