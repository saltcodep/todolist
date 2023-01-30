import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { MasterTaskType } from 'src/app/models/master-task-type';
import { ManageBasicsService } from '../services/manage-basics.service';
import Swal from 'sweetalert2';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-task-type',
  templateUrl: './task-type.component.html',
  styleUrls: ['./task-type.component.scss']
})
export class TaskTypeComponent implements OnInit {
  types: MasterTaskType[];
  deleteModal: BsModalRef;
  typeId: number=0;

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
    private manageBasiceService: ManageBasicsService,
    private router: Router,
    private modalService: BsModalService
    ) { }

  ngOnInit(): void {
    this.getTypes();
  }

  getTypes(): void {
    this.manageBasiceService.getTypes().subscribe((data) => (this.types = data));
  }

  editType(typeId: number){
    this.router.navigate(['/manage-basics/task-type/edit/', typeId]);
  }

  viewType(typeId: number){
    this.router.navigate(['/manage-basics/task-type/view/', typeId]);
  }

  deleteType(typeId: number, template: TemplateRef<any>){
    this.deleteModal = this.modalService.show(template);
    this.typeId = typeId;
  }

  confirmDeleteType(){
    this.manageBasiceService.deleteType(this.typeId).subscribe({
      error: (e) => {
        this.deleteModal?.hide();
        this.toast.fire({
          icon: 'error',
          title: e.error
        })
      },
      complete: () => {
        this.deleteModal?.hide();
        this.toast.fire({
        icon: 'success',
        title: 'ข้อมูลถูกลบแล้ว'
        })
        this.getTypes();
      }
    });
  }
}
