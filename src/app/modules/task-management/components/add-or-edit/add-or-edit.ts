import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../models/task';
import { TaskManagement } from '../../service/task-management';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-or-edit',
  standalone: false,
  templateUrl: './add-or-edit.html',
  styleUrl: './add-or-edit.scss'
})
export class AddOrEdit {
  taskForm!: FormGroup;
task?: Task;
  constructor(private fb: FormBuilder, private taskService: TaskManagement,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      dueDate: ['', Validators.required],
      priority: ['High', Validators.required],
      status: ['Pending', Validators.required]
    });


  const idParam = this.route.snapshot.paramMap.get('id');

  if (idParam) {
    const id = +idParam;
    this.taskService.getTasks().subscribe(tasks => {
      this.task = tasks.find(t => t.id === id);
      if (this.task) {
        this.taskForm.patchValue({ ...this.task });
        console.log('Form patched with task:', this.task);
      } else {
        console.warn('Task not found for id:', id);
      }
    });
  }
}


  get f() {
    return this.taskForm.controls;
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.getRawValue();
    const newTask: Task = {
      ...formValue,
      id: 0   
    };
      console.log('✅ Task submitted:', this.taskForm.getRawValue());
    } else {
      console.log('❌ Form is invalid:', this.taskForm.value);
      this.taskForm.markAllAsTouched();

   const data = {
    id: 123,
    title: "Complete project report",
    description: "Write and finalize the quarterly project report.",
    priority: 'High',  // TypeScript currently sees this as a string
    status: 'Pending', // TypeScript currently sees this as a string
    dueDate: "2025-10-26"
};

// Use 'as Task' to tell TypeScript to treat the 'data' object as a 'Task' type.
const myTask: Task = data as Task;
 this.taskService.addTask(myTask);
    }
  }
}
