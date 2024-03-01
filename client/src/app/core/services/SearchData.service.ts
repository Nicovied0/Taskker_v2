import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SearchDataService {
  private apiUrl = 'assets/mocks/dates.mook.json'; // Reemplaza esto con la URL real de tu mock

  constructor(private http: HttpClient) {}

  getIdsForDay(startTime: string, endTime: string, day: string): Observable<number[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((data) => {
        const dayData = data.find((entry) => entry.day === day);
        if (dayData) {
          return dayData.hours
            .filter((hour:any) => hour.time >= startTime && hour.time <= endTime)
            .map((hour:any) => hour.id);
        } else {
          return [];
        }
      })
    );
  }
}
