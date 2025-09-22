import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
   {
    path: '',
    redirectTo: 'dashboard',  // redirect empty path to 'dashboard'
    pathMatch: 'full'
  },
   {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard-routing-module').then(
        (m) => m.DashboardRoutingModule
      ),
  },
  {
    path: 'tasks',
    loadChildren: () =>
      import('./task-management/task-management-routing-module').then(
        (m) => m.TaskManagementRoutingModule
      ),
  },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
