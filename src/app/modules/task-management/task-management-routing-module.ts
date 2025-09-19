import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { List } from './components/list/list';
import { AddOrEdit } from './components/add-or-edit/add-or-edit';

const routes: Routes = [
   {
    path: '',
    component: List
  },
  {
    path: 'add',
    component: AddOrEdit
  },
   {
    path: 'edit/:id',
    component: AddOrEdit
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskManagementRoutingModule { }
