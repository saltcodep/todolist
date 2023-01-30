import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'todo', loadChildren: () => import('./modules/todolist/todolist.module').then(m => m.TodolistModule)
  },
  {
    path: 'manage-basics', loadChildren: () => import('./modules/manage-basics/manage-basics.module').then(m => m.ManageBasicsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
