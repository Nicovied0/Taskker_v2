import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GridService {

  constructor(private http: HttpClient) { }

  // Método para obtener el JSON de la cuadrícula de horas
  getGridData(): Observable<any> {
    // Aquí puedes reemplazar la URL con la ubicación de tu archivo JSON o cualquier endpoint de la API que proporcione los datos
    return this.http.get<any>('assets/mocks/dates.mook.json');
  }
}
