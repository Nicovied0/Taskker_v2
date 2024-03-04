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
          diaryEvent: task.diaryEvent,
        }));
      })
    );
  }

  getTasksByUserId2(userId: string): Observable<any[]> {
    const [monday, sunday] = this.getMondayAndSundayOfCurrentWeek();

    console.log(monday)
    console.log(sunday)

    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`).pipe(
      map((tasks: any[]) => {
        return tasks
          .filter((task) => {
            const taskEndDate = new Date(task.end);
            return taskEndDate >= monday && taskEndDate <= sunday;
          })
          .map((task) => ({
            id: task._id,
            text: task.title,
            description: task.description,
            start: task.start,
            end: task.end,
            backColor: task.status,
            meetingUrl: task.meetingUrl,
            diaryEvent: task.diaryEvent,
            daysOfRepeat: task.daysOfRepeat,
            gridId: task.gridId,
          }));
      })
    );
  }

  private getMondayAndSundayOfCurrentWeek(): Date[] {
    const currentDate = new Date();
    const currentDayOfWeek = currentDate.getDay();

    const monday = new Date(currentDate);
    monday.setDate(currentDate.getDate() - currentDayOfWeek + 1);
    monday.setHours(0, 0, 0, 0); // Establecer hora a las 00:00

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999); // Establecer hora a las 23:59:59.999

    return [monday, sunday];
}


  createTask(data: any) {
    return this.http.post<any>(this.apiUrl, data);
  }

  createTask2(data: any) {
    console.log(data);
    return this.http.post<any>(this.apiUrl, data);
  }

  editTask(eventId: string, updatedEvent: any): Observable<any> {
    const url = this.apiUrl + '/' + eventId;
    const adjustedEventData = this.adjustEventData(updatedEvent);
    return this.http.put<any>(url, adjustedEventData);
  }
  editTask2(id: string, data: any): Observable<any> {
    const url = this.apiUrl + '/' + id;
    return this.http.put<any>(url, data);
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
