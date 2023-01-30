import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MasterTaskStatus } from 'src/app/models/master-task-status';
import { ManageBasicsService } from '../services/manage-basics.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task-status',
  templateUrl: './task-status.component.html',
  styleUrls: ['./task-status.component.scss']
})
export class TaskStatusComponent implements OnInit {
  statuses: MasterTaskStatus[];
  deleteModel: BsModalRef;
  statusId: number;

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
    private router: Router,
    private modalServiece: BsModalService
    ) { }

  ngOnInit(): void {
    this.getStatus();
  }

  getStatus(): void {
    this.manageBasicsService.getStatus().subscribe((data) => (this.statuses = data));
  }

  editStatus(statusId: number){
    this.router.navigate(['/manage-basics/task-status/edit/', statusId]);
  }

  viewStatus(statusId: number){
    this.router.navigate(['/manage-basics/task-status/view/', statusId]);
  }

  deleteStatus(statusId: number, template: TemplateRef<any>){
    this.deleteModel = this.modalServiece.show(template);
    this.statusId = statusId;
  }

  confirmDeleteStatus(){
    this.manageBasicsService.deleteStatus(this.statusId).subscribe({
      complete: () => {
        this.deleteModel.hide();
        this.toast.fire({
          icon: 'success',
          title: 'ลบข้อมูลแล้ว'
        });
        this.getStatus();
      },
      error: (e) => {
        this.deleteModel.hide();
        this.toast.fire({
          icon: 'error',
          title: e?.error?.message
        });
        console.log(e);
      }
    });
  }
}
