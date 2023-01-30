import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddTask } from '../../../models/add-task';
import { DataTable } from '../../../models/datatable';
import { MasterTaskPriority } from '../../../models/master-task-priority';
import { MasterTaskStatus } from '../../../models/master-task-status';
import { MasterTaskType } from '../../../models/master-task-type';
import { Task } from '../../../models/task';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private taskUrl: string = 'http://localhost:8082/todo/searchtodo/';
  private statusUrl = 'http://localhost:8082/status';
  private typeUrl = 'http://localhost:8082/type';
  private priorityUrl = 'http://localhost:8082/priority';
  private baseUrl = 'http://localhost:8082/todoform/';
  private todoUrl = 'http://localhost:8082/todo/';

  constructor(private http: HttpClient) { }

  getTasks(
    results: number,
    page: number,
    type: string | null = null,
    status: string | null = null,
    name: string | null = null,
    targetDate: Date | null = null,
  ): Observable<DataTable<Task>> {
    let params = new HttpParams()
      .set('page', page)
      .set('results', results);
    let url = this.taskUrl;
    if (type != null) params = params.append('type', type);
    if (status != null) params = params.append('status', status);
    if (name != null) params = params.append('name', name);
    if (targetDate != null) params = params.append('targetDate', targetDate?.getFullYear() + '-' + targetDate?.getMonth() + '-' + targetDate?.getDate());
    return this.http.get<DataTable<Task>>(url, { params });
  }

  addTask(task: AddTask): Observable<AddTask> {
    return this.http.post<AddTask>(this.baseUrl, {
      "taskId": task.taskId,
      "taskPriority": task.taskPriority,
      "taskStatus": task.taskStatus,
      "taskType": task.taskType,
      "targetDate": moment(task.targetDate).format('YYYY-MM-DD'),
      "taskName": task.taskName,
    })
  }

  getTaskById(id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + id);
  }

  editTask(id: number, task: AddTask): Observable<any> {
    return this.http.put(this.baseUrl + id, task);
  }

  deleteTask(id: number): Observable<object> {
    return this.http.delete(this.todoUrl + id);
  }

  getStatus(): Observable<MasterTaskStatus[]> {
    return this.http.get<MasterTaskStatus[]>(this.statusUrl);
  }

  getTypes(): Observable<MasterTaskType[]> {
    return this.http.get<MasterTaskType[]>(this.typeUrl);
  }

  getPrioriy(): Observable<MasterTaskPriority[]> {
    return this.http.get<MasterTaskPriority[]>(this.priorityUrl);
  }
}
