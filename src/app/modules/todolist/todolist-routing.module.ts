import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskAddComponent } from 'src/app/modules/todolist/task-add/task-add.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TodolistComponent } from './todolist.component';

const routes: Routes = [
  {
    path: '',
    component: TodolistComponent,
    children: [
      {
        path: '',
        component: TaskListComponent
      },
      {
        path: 'add',
        component: TaskAddComponent,
        data: { mode: 'add' }
      },
      {
        path: 'edit/:id',
        component: TaskAddComponent,
        data: { mode: 'edit' }
      },
      {
        path: 'view/:id',
        component: TaskAddComponent,
        data: { mode: 'view' }
      },
    ]
  },
  // { 
  //   path: 'add', component: TaskAddComponent, data: { action: 'add' } 
  // },
  // { 
  //   path: 'edit/:id', component: TaskAddComponent, data: { action: 'edit' } 
  // },
  // { 
  //   path: 'view/:id', component: TaskAddComponent, data: { action: 'view' } 
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodolistRoutingModule { }
