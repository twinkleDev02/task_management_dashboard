import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../service/task-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Task } from '../../modals/task.model';
import { StoreService } from '../../../shared/service/store.service';

@Component({
  selector: 'app-add-or-edit',
  standalone: false,
  templateUrl: './add-or-edit.html',
  styleUrl: './add-or-edit.scss'
})
export class AddOrEdit {
 private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(StoreService);
  private readonly snack: MatSnackBar = inject(MatSnackBar);

  id: string | null = null;
  form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.maxLength(100)]],
    description: [''],
    priority: ['Medium', Validators.required],
    status: ['Pending', Validators.required],
      icon: [''],
    dueDate: [null as string | null, Validators.required] 
  });

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    // console.log(idParam);
    this.id = idParam;
    if (this.id) {
      console.log(this.id);
      this.service.taskById(this.id).subscribe((task) => this.form.patchValue(task));
    }
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form.getRawValue() as Task;
    const req = this.id
      ? this.service.updateTask({...value, id: this.id as any})
      : this.service.addTask(value);
    this.router.navigate(['/tasks']);
      if(this.id){
        this.snack.open('Task updated successfully', 'Dismiss', { duration: 2500 });
      }else{
        this.snack.open('Task added successfully', 'Dismiss', { duration: 2500 });
      }
  }

}
