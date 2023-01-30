import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageBasicsRoutingModule } from './manage-basics-routing.module';
import { ManageBasicsComponent } from './manage-basics.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TaskTypeComponent } from './task-type/task-type.component';
import { TaskStatusComponent } from './task-status/task-status.component';
import { TaskPriorityComponent } from './task-priority/task-priority.component';
import { TaskTypeFormsComponent } from './task-type-forms/task-type-forms.component';
import { TaskStatusFormsComponent } from './task-status-forms/task-status-forms.component';
import { TaskPriorityFormsComponent } from './task-priority-forms/task-priority-forms.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ActivePipe } from './pipe/active.pipe';


@NgModule({
  declarations: [
    ManageBasicsComponent,
    TaskTypeComponent,
    TaskTypeFormsComponent,
    TaskStatusComponent,
    TaskStatusFormsComponent,
    TaskPriorityComponent,
    TaskPriorityFormsComponent,
    ActivePipe
  ],
  imports: [
    CommonModule,
    ManageBasicsRoutingModule,
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ManageBasicsModule { }
