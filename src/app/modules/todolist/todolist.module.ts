import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodolistRoutingModule } from './todolist-routing.module';
import { TodolistComponent } from './todolist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskAddComponent } from 'src/app/modules/todolist/task-add/task-add.component';
import { DateThPipe } from './pipe-todo-lsit/date-th.pipe';


@NgModule({
  declarations: [
    TodolistComponent,
    TaskListComponent,
    TaskAddComponent,
    DateThPipe,
  ],
  imports: [
    CommonModule,
    TodolistRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
  ]
})
export class TodolistModule { }
