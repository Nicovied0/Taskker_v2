import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DayPilot } from '@daypilot/daypilot-lite-angular';
import { HttpClient } from '@angular/common/http';
import { TaskService } from 'src/app/core/services/Task.service';
import { fixDateFormat } from './date-utils.ts';
import { AuthService } from 'src/app/core/services/Auth.service';

@Injectable()
export class DataService {
  static colors = {
    green: '#6aa84f',
    yellow: '#f1c232',
    red: '#cc4125',
    gray: '#808080',
    blue: '#2e78d6',
  };

  constructor(
    private http: HttpClient,
    private taskService: TaskService,
    private authService: AuthService
  ) {}
  tasks: any[] = [];

  getEvents(from: DayPilot.Date, to: DayPilot.Date): Observable<any[]> {
    return new Observable((observer) => {
      const userId = this.authService.getUserDataFromLocalStorage().id;

      this.taskService.getTasksByUserId(userId).subscribe((tasks) => {
        const events = [
          ...tasks.map((task) => ({
            id: task.id,
            text: task.text,
            description: task.description,
            start: new DayPilot.Date(fixDateFormat(task.start)).toString(
              'yyyy-MM-dd HH:mm:ss'
            ),
            end: new DayPilot.Date(fixDateFormat(task.end)).toString(
              'yyyy-MM-dd HH:mm:ss'
            ),

            backColor: this.getColorForStatus(task.backColor),
            meetingUrl: task.meetingUrl,
          })),
        ];

        observer.next(events);
        observer.complete();
      });
    });
  }
  getColors(): any[] {
    const colors = [
      { name: 'Completa', id: DataService.colors.green },
      { name: 'Alerta', id: DataService.colors.yellow },
      { name: 'Cancelada', id: DataService.colors.red },
      { name: 'En proceso', id: DataService.colors.gray },
      { name: 'Agendada', id: DataService.colors.blue },
    ];
    return colors;
  }

  getColorForStatus = (status: string): string => {
    switch (status) {
      case 'Completa':
        return DataService.colors.green;
      case 'Alerta':
        return DataService.colors.yellow;
      case 'Cancelada':
        return DataService.colors.red;
      case 'En proceso':
        return DataService.colors.gray;
      case 'Agendada':
        return DataService.colors.blue;
      default:
        return '';
    }
  };
}
