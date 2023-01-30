import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { MasterTaskPriority } from 'src/app/models/master-task-priority';
import { MasterTaskStatus } from 'src/app/models/master-task-status';
import { MasterTaskType } from 'src/app/models/master-task-type';
import { TaskService } from '../services/task.service';
import * as moment from 'moment';


@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.scss']
})
export class TaskAddComponent implements OnInit {

  statuses: MasterTaskStatus[] = [];
  types: MasterTaskType[] = [];
  priorities: MasterTaskPriority[] = [];

  taskGroup: FormGroup;
  taskId: FormControl;
  taskType: FormControl;
  taskStatus: FormControl;
  taskPriority: FormControl;
  taskName: FormControl;
  targetDate: FormControl;

  submit: boolean = false;
  id: number;
  mode: string;
  // activatedRouteData: Data;

  constructor(
    private taskService: TaskService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.initForm();
    this.activatedRoute.data.subscribe(data => {
      this.mode = data['mode'];
      // this.activatedRouteData = data;
    })
  }

  initForm() {
    this.taskId = this.fb.control(null);
    this.taskType = this.fb.control(null, Validators.required);
    this.taskStatus = this.fb.control(null, Validators.required);
    this.taskPriority = this.fb.control(null, Validators.required);
    this.taskName = this.fb.control(null, Validators.required);
    this.targetDate = this.fb.control(null, Validators.required);
    this.taskGroup = this.fb.group({
      taskId: this.taskId,
      taskType: this.taskType,
      taskStatus: this.taskStatus,
      taskPriority: this.taskPriority,
      taskName: this.taskName,
      targetDate: this.targetDate,
    });
  }

  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getStatus();
    this.getType();
    this.getPriority();
    this.getFormTask();
  }

  getStatus(): void {
    this.taskService.getStatus().subscribe((data) => (this.statuses = data));
  }

  getType(): void {
    this.taskService.getTypes().subscribe((data) => (this.types = data));
  }

  getPriority(): void {
    this.taskService.getPrioriy().subscribe(data => this.priorities = data);
  }

  addTask() {
    this.submit = true;
    if (this.taskGroup.valid) {
      if (this.mode == 'edit') {
        this.taskService.editTask(this.id, this.taskGroup.value).subscribe(() => {
          this.router.navigate(['/todo']);
        });
      }
      if (this.mode == 'add') {
        this.taskService.addTask(this.taskGroup.value).subscribe(() => {
          this.router.navigate(['/todo']);
        });
      }
    }
  }

  back() {
    this.location.back();
  }

  getFormTask() {
    if (this.mode == 'edit' || this.mode == 'view') {
      this.taskService.getTaskById(this.id).subscribe(data => {
        // this.taskName.setValue(data.taskName);
        this.taskGroup.patchValue({
          taskName: data.taskName,
          taskType: data.taskType,
          targetDate: moment(data.targetDate).toDate(),
          taskStatus: data.taskStatus,
          taskPriority: data.taskPriority,
        })
        if (this.mode == 'view') {
          this.taskId.disable();
          this.taskType.disable();
          this.taskStatus.disable();
          this.taskPriority.disable();
          this.taskName.disable();
          this.targetDate.disable();
        }
      })
    }
  }

  editTask(taskId: number) {
    this.router.navigate(['/todo/edit/', taskId]);
  }
}
