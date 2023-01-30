import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MasterTaskPriority } from 'src/app/models/master-task-priority';
import { MasterTaskStatus } from 'src/app/models/master-task-status';
import { MasterTaskType } from 'src/app/models/master-task-type';

@Injectable({
  providedIn: 'root'
})
export class ManageBasicsService {

  setActive: string;

  private typeUrl = 'http://localhost:8082/tasktype/';
  private statusUrl = 'http://localhost:8082/taskstatus/';
  private priorityUrl = 'http://localhost:8082/taskpriority/';

  constructor(private http: HttpClient) { }
  
  getTypes(): Observable<MasterTaskType[]> {
    return this.http.get<MasterTaskType[]>(this.typeUrl);
  }

  addType(type: MasterTaskType): Observable<MasterTaskType>{
    // if(type.active) this.setActive = "A";
    // else this.setActive = "I";
    return this.http.post<MasterTaskType>(this.typeUrl, {
      "typeId": type.typeId,
      "typeName": type.typeName,
      "active": type.active
    });
  }

  getTypeById(id: number): Observable<any>{
    return this.http.get<any>(this.typeUrl+id);
  }

  editType(id: number, type: MasterTaskType): Observable<any>{
    // if(type.active) this.setActive = "A";
    // else this.setActive = "I";
    return this.http.put(this.typeUrl+id, {
      "typeId": type.typeId,
      "typeName": type.typeName,
      "active": type.active
    });
  }

  deleteType(id: number): Observable<object>{
    return this.http.delete(this.typeUrl+id);
  }

  getStatus(): Observable<MasterTaskStatus[]> {
    return this.http.get<MasterTaskStatus[]>(this.statusUrl);
  }

  addStatus(status: MasterTaskStatus): Observable<MasterTaskStatus>{
    return this.http.post<MasterTaskStatus>(this.statusUrl, {
      "statusId": status.statusId,
      "statusName": status.statusName,
      "active": status.active
    });
  }

  getStatusById(id: number): Observable<any>{
    return this.http.get<any>(this.statusUrl+id);
  }

  editStatus(id: number, status: MasterTaskStatus): Observable<any>{
    return this.http.put(this.statusUrl+id, status);
  }

  deleteStatus(id: number): Observable<object>{
    return this.http.delete(this.statusUrl+id);
  }

  getPriority(): Observable<MasterTaskPriority[]> {
    return this.http.get<MasterTaskPriority[]>(this.priorityUrl);
  }

  addPriority(priority: MasterTaskPriority): Observable<MasterTaskPriority>{
    return this.http.post<MasterTaskPriority>(this.priorityUrl, {
      "priorityId": priority.priorityId,
      "priorityName": priority.priorityName
    });
  }

  getPriorityById(id: number): Observable<any>{
    return this.http.get<any>(this.priorityUrl+id);
  }

  editPriority(id: number, priority: MasterTaskPriority): Observable<any>{
    return this.http.put(this.priorityUrl+id, priority);
  }

  deletePriority(id: number): Observable<object>{
    return this.http.delete(this.priorityUrl+id);
  }
}
