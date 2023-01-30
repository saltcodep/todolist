import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MasterTaskPriority } from 'src/app/models/master-task-priority';
import { ManageBasicsService } from '../services/manage-basics.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task-priority',
  templateUrl: './task-priority.component.html',
  styleUrls: ['./task-priority.component.scss']
})
export class TaskPriorityComponent implements OnInit {
  prioritys: MasterTaskPriority[];

  deleteModel: BsModalRef;
  priorityId: number;

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
    private modalServiece: BsModalService,
    ) { }

  ngOnInit(): void {
    this.getPriority();
  }

  getPriority(): void{
    this.manageBasicsService.getPriority().subscribe(data => this.prioritys = data);
  }

  editPriority(priorityId: number){
    this.router.navigate(['/manage-basics/task-priority/edit/', priorityId]);
  }

  viewPriority(priorityId: number){
    this.router.navigate(['/manage-basics/task-priority/view/', priorityId]);
  }

  deletePriority(statusId: number, template: TemplateRef<any>){
    this.deleteModel = this.modalServiece.show(template);
    this.priorityId = statusId;
  }

  confirmDeletePriority(){
    this.manageBasicsService.deletePriority(this.priorityId).subscribe({
      complete: () => {
        this.deleteModel.hide();
        this.toast.fire({
          icon: 'success',
          title: 'ลบข้อมูลแล้ว'
        });
        this.getPriority();
      },
      error: (e) => {
        this.deleteModel.hide();
        this.toast.fire({
          icon: 'error',
          title: e.error
        });
      }
    });
  
  }
}
