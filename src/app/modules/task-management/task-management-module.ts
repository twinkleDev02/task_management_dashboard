import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskManagementRoutingModule } from './task-management-routing-module';
import { AddOrEdit } from './components/add-or-edit/add-or-edit';
import { List } from './components/list/list';
import { SharedModule } from '../../shared/shared-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddOrEdit,
    List
  ],
  imports: [
    CommonModule,
    TaskManagementRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  
})
export class TaskManagementModule { }
