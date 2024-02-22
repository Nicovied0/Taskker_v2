import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environment';
import { DayPilot } from '@daypilot/daypilot-lite-angular';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = environment.backUrl + '/task';

  constructor(private http: HttpClient) {}

  getTasksByUserId(userId: string): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/user/' + userId).pipe(
      map((tasks: any[]) => {
        return tasks.map((task) => ({
          id: task._id,
          text: task.title,
          description: task.description,
          start: new DayPilot.Date(task.start).toString('yyyy-MM-dd HH:mm:ss'),
          end: new DayPilot.Date(task.end).toString('yyyy-MM-dd HH:mm:ss'),
          backColor: task.status,
          meetingUrl: task.meetingUrl,
        }));
      })
    );
  }

  createTask(data: any) {
    return this.http.post<any>(this.apiUrl, data);
  }

  editTask(eventId: string, updatedEvent: any): Observable<any> {
    const url = this.apiUrl +"/"+ eventId;
    const adjustedEventData = this.adjustEventData(updatedEvent);
    return this.http.put<any>(url, adjustedEventData);
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  editStatus(id: string, newStatus: string): Observable<any> {
    const url = `${this.apiUrl}/status/${id}`;
    const updatedData = { status: newStatus };
    return this.http.put<any>(url, updatedData);
  }

  private adjustEventData(eventData: any): any {
    return {
      title: eventData.text,
      description: eventData.description,
      meetingUrl: eventData.meetingUrl,
      start: eventData.start.value,
      end: eventData.end.value,
      status: eventData.backColor,
      usercreator: eventData.usercreator,
    };
  }
}
