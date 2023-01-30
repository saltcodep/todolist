import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ManageBasicsService } from '../services/manage-basics.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-task-status-forms',
  templateUrl: './task-status-forms.component.html',
  styleUrls: ['./task-status-forms.component.scss']
})
export class TaskStatusFormsComponent implements OnInit {
  mode: string;
  id: number;
  submit: boolean = false;

  statusFormGroup: FormGroup;
  statusId: FormControl;
  statusName: FormControl;
  active: FormControl;

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

  constructor(
    private manageBasicsService: ManageBasicsService,
    private activaRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private location: Location
    ) {
      this.initForm();
    }

  ngOnInit(): void {
    this.activaRoute.data.subscribe(data => {
      this.mode = data['mode'];
    })
    this.id = Number(this.activaRoute.snapshot.paramMap.get('id'));
    this.getStatus();
  }

  initForm(){
    this.statusId = this.fb.control(null);
    this.statusName = this.fb.control(null);
    this.active = this.fb.control('I', Validators.required);
    this.statusFormGroup = this.fb.group({
      statusId: this.statusId,
      statusName: this.statusName,
      active: this.active
    })
  }

  getStatus(){
    if (this.mode == 'edit' || this.mode == 'view') {
      this.manageBasicsService.getStatusById(this.id).subscribe(data => {
        this.statusFormGroup.patchValue({
          statusId: data.statusId,
          statusName: data.statusName,
          active: data.active
        })
        if (this.mode == 'view') {
          this.statusId.disable();
          this.statusName.disable();
          this.active.disable();
        }
      })
    }
  }

  addStatusOrEditStatus(){
    this.submit = true;
    if (this.statusFormGroup.valid) {
      if (this.mode == 'edit'){
        this.manageBasicsService.editStatus(this.id, this.statusFormGroup.value).subscribe({
          complete: () => {
            this.toast.fire({
              icon: 'success',
              title: 'บันทึกข้อมูลสำเร็จ'
            })
            this.router.navigate(['/manage-basics/task-status']);
          },
          error: e => {
            this.toast.fire({
              icon: 'error',
              title: e.error
            })
          },
          next: () => {
            
          }
        });
      } else if (this.mode == 'add'){
        this.manageBasicsService.addStatus(this.statusFormGroup.value).subscribe({
          complete: () => {
            this.toast.fire({
              icon: 'success',
              title: 'บันทึกข้อมูลสำเร็จ'
            })
            this.router.navigate(['/manage-basics/task-status']);
          },
          error: e => {
            this.toast.fire({
              icon: 'error',
              title: e.error
            })
          }
        });
      }
    }
  }

  editStatus(){
    this.router.navigate(['/manage-basics/task-status/edit/',this.id]);
  }

  back(){
    this.location.back();
  }
}
