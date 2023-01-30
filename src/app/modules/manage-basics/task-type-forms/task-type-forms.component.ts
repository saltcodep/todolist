import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ManageBasicsService } from '../services/manage-basics.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task-type-forms',
  templateUrl: './task-type-forms.component.html',
  styleUrls: ['./task-type-forms.component.scss']
})
export class TaskTypeFormsComponent implements OnInit {
  isChecked: string;

  typeFormGroup: FormGroup;
  typeId: FormControl;
  typeName: FormControl;
  active: FormControl;

  id: number;
  mode: string;
  submit: boolean = false;

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
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location
    ) { 
      this.initForm();
    }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.mode = data['mode'];
    })
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getType();
  }

  initForm(){
    this.typeId = this.fb.control(null);
    this.typeName = this.fb.control(null, Validators.required);
    this.active = this.fb.control('I', Validators.required);
    this.typeFormGroup = this.fb.group({
      typeId: this.typeId,
      typeName: this.typeName,
      active: this.active
    })
  }

  getType(){
    if (this.mode == 'edit' || this.mode == 'view'){
      this.manageBasicsService.getTypeById(this.id).subscribe(data => {
        this.typeFormGroup.patchValue({
          typeId: data.typeId,
          typeName: data.typeName,
          active: data.active
        })
        if (this.mode == 'view'){
          this.typeId.disable();
          this.typeName.disable();
          this.active.disable();
        }
      })
    }
  }

  addTypeOrEditType(){
    this.submit = true;
    if (this.typeFormGroup.valid) {
      if (this.mode == 'edit'){
        this.manageBasicsService.editType(this.id, this.typeFormGroup.value).subscribe({
          complete: () => {
            this.toast.fire({
              icon: 'success',
              title: 'บันทึกข้อมูลสำเร็จ'
            })
            this.router.navigate(['/manage-basics/task-type']);
          },
          error: e => {
            this.toast.fire({
              icon: 'error',
              title: 'เกิดข้อผิดพลาด'
            })
          },
          next: () => {
            
          }
        });
      } else if (this.mode == 'add'){
        this.manageBasicsService.addType(this.typeFormGroup.value).subscribe({
          complete: () => {
            this.toast.fire({
              icon: 'success',
              title: 'บันทึกข้อมูลสำเร็จ'
            })
            this.router.navigate(['/manage-basics/task-type']);
          },
          error: e => {
            this.toast.fire({
              icon: 'error',
              title: 'เกิดข้อผิดพลาด'
            })
          }
        });
      }
    }
  }

  back(){
    this.location.back();
  }

  editType(){
    this.router.navigate(['/manage-basics/task-type/edit/',this.id]);
  }
}
