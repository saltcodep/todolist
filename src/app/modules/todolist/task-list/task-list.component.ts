import { Component, OnInit, TemplateRef } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/modules/todolist/services/task.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MasterTaskStatus } from 'src/app/models/master-task-status';
import { MasterTaskType } from 'src/app/models/master-task-type';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  constructor(
    private taskService: TaskService,
    private fb: FormBuilder,
    private router: Router,
    private modalService: BsModalService
  ) {
    this.initForm();
  }

  tasks: Task[] = [];
  statuses: MasterTaskStatus[] = [];
  types: MasterTaskType[] = [];

  searchForm: FormGroup;
  type: FormControl;
  status: FormControl;
  name: FormControl;
  date: FormControl;

  page: number;
  results: number = 5;
  total: number = 0;

  // startItem: number;
  // endItem: number;

  modalRef?: BsModalRef;

  toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  initForm() {
    this.type = this.fb.control(null);
    this.status = this.fb.control(null);
    this.name = this.fb.control(null);
    this.date = this.fb.control(null);
    this.searchForm = this.fb.group({
      type: this.type,
      status: this.status,
      name: this.name,
      date: this.date,
    });
  }

  ngOnInit(): void {
    this.getStatus();
    this.getType();
    this.page = 1;
    this.searchTask();
  }

  searchTask() {
    this.taskService.getTasks(
      this.results,
      this.page,
      this.type.value,
      this.status.value,
      this.name.value,
      this.date.value
    ).subscribe((data) => {
      this.tasks = data.data;
      this.total = data.recordsTotal;
      // if (this.page == 1) {
      //   this.startItem = 1;
      // } else {
      //   this.startItem = (this.page - 1) * this.results + 1;
      // }
      // this.endItem = this.startItem + data.data.length - 1;
    });
  }

  getStatus(): void {
    this.taskService.getStatus().subscribe((data) => (this.statuses = data));
  }

  getType(): void {
    this.taskService.getTypes().subscribe((data) => (this.types = data));
  }

  pageChanged(event: PageChangedEvent): void {
    this.page = event.page;
    this.searchTask();
  }

  resultsChange(e: any) {
    this.searchTask();
  }

  cleanTask() {
    this.initForm();
    this.tasks = [];
    this.results;
  }

  editTask(taskId: number) {
    this.router.navigate(['/todo/edit/', taskId]);
  }

  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe((data) => {
      this.searchTask();
      this.toast.fire({
        icon: 'success',
        title: 'ข้อมูลถูกลบแล้ว'
      })
    });
  }

  viewTask(taskId: number) {
    this.router.navigate(['/todo/view/', taskId]);
  }

  openModalDelete(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(taskId: number): void {
    this.modalRef?.hide();
    this.deleteTask(taskId);
  }
}
