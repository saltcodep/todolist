import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ManageBasicsService } from '../services/manage-basics.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task-priority-forms',
  templateUrl: './task-priority-forms.component.html',
  styleUrls: ['./task-priority-forms.component.scss']
})
export class TaskPriorityFormsComponent implements OnInit {
  mode: string;
  id: number;
  submit: boolean = false;

  priorityFormGroup: FormGroup;
  priorityId: FormControl;
  priorityName: FormControl;

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
    this.getPriority();
  }

  
  initForm(){
    this.priorityId = this.fb.control(null);
    this.priorityName = this.fb.control(null);
    this.priorityFormGroup = this.fb.group({
      priorityId: this.priorityId,
      priorityName: this.priorityName
    })
  }

  getPriority(){
    if (this.mode == 'edit' || this.mode == 'view') {
      this.manageBasicsService.getPriorityById(this.id).subscribe(data => {
        this.priorityFormGroup.patchValue({
          priorityId: data.priorityId,
          priorityName: data.priorityName,
        })
        if (this.mode == 'view') {
          this.priorityId.disable();
          this.priorityName.disable();
        }
      })
    }
  }

  addPriorityOrEditPriority(){
    this.submit = true;
    if (this.priorityFormGroup.valid) {
      if (this.mode == 'edit'){
        this.manageBasicsService.editPriority(this.id, this.priorityFormGroup.value).subscribe({
          complete: () => {
            this.toast.fire({
              icon: 'success',
              title: 'บันทึกข้อมูลสำเร็จ'
            })
            this.router.navigate(['/manage-basics/task-priority']);
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
        this.manageBasicsService.addPriority(this.priorityFormGroup.value).subscribe({
          complete: () => {
            this.toast.fire({
              icon: 'success',
              title: 'บันทึกข้อมูลสำเร็จ'
            })
            this.router.navigate(['/manage-basics/task-priority']);
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

  editPriority(){
    this.router.navigate(['/manage-basics/task-prioritys/edit/',this.id]);
  }

  back(){
    this.location.back();
  }
}
