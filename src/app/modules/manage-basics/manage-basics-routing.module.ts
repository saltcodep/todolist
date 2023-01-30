import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageBasicsComponent } from './manage-basics.component';
import { TaskPriorityFormsComponent } from './task-priority-forms/task-priority-forms.component';
import { TaskPriorityComponent } from './task-priority/task-priority.component';
import { TaskStatusFormsComponent } from './task-status-forms/task-status-forms.component';
import { TaskStatusComponent } from './task-status/task-status.component';
import { TaskTypeFormsComponent } from './task-type-forms/task-type-forms.component';
import { TaskTypeComponent } from './task-type/task-type.component';

const routes: Routes = [
  { 
    path: '', 
    component: ManageBasicsComponent,
    children:[
      {
        path: 'task-type',
        component: TaskTypeComponent,
        // children: [
          // {
          //   path: 'add',
          //   component: TaskTypeFormsComponent,
          //   data:{
          //     mode: 'add'
          //   }
          // },
          // {
          //   path: 'edit/:id',
          //   component: TaskTypeFormsComponent,
          //   data:{
          //     mode: 'edit'
          //   }
          // },
          // {
          //   path: 'view/:id',
          //   component: TaskTypeFormsComponent,
          //   data:{
          //     mode: 'view'
          //   }
          // }
        // ]
      },
      {
        path: 'task-type/add',
        component: TaskTypeFormsComponent,
        data:{
          mode: 'add'
        }
      },
      {
        path: 'task-type/edit/:id',
        component: TaskTypeFormsComponent,
        data:{ 
          mode: 'edit' 
        }
      },
      {
        path: 'task-type/view/:id',
        component: TaskTypeFormsComponent,
        data:{
          mode: 'view'
        }
      },
      {
        path: 'task-status',
        component: TaskStatusComponent
      },
      {
        path: 'task-status/add',
        component: TaskStatusFormsComponent,
        data: {
          mode: 'add'
        }
      },
      {
        path: 'task-status/edit/:id',
        component: TaskStatusFormsComponent,
        data: {
          mode: 'edit'
        }
      },
      {
        path: 'task-status/view/:id',
        component: TaskStatusFormsComponent,
        data: {
          mode: 'view'
        }
      },
      {
        path: 'task-priority',
        component: TaskPriorityComponent
      },
      {
        path: 'task-priority/add',
        component: TaskPriorityFormsComponent,
        data: {
          mode: 'add'
        }
      },
      {
        path: 'task-priority/edit/:id',
        component: TaskPriorityFormsComponent,
        data: {
          mode: 'edit'
        }
      },
      {
        path: 'task-priority/view/:id',
        component: TaskPriorityFormsComponent,
        data: {
          mode: 'view'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageBasicsRoutingModule { }
