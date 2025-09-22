import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskManagementRoutingModule } from './task-management-routing-module';
import { AllTask } from './components/all-task/all-task';
import { SharedModule } from '../shared/shared/shared-module';
import { ReactiveFormsModule } from '@angular/forms';
import { IsOverduePipe } from '../shared/pipes/is-overdue.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    AllTask,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    TaskManagementRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    IsOverduePipe,
    MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatCardModule,
        MatDialogModule,
        MatDatepickerModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatPaginatorModule,
    MatNativeDateModule,
    MatSnackBarModule,
  ]
})
export class TaskManagementModule { }
