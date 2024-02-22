import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FinancePersonalService {
  private imagesUrl = '../assets/mocks/financePersonal.mook.json';

  constructor(private http: HttpClient) {}

  getData(): Observable<FinancePersonal[]> {
    return this.http.get<FinancePersonal[]>(this.imagesUrl);
  }
}

interface FinancePersonal {
    title: string;
    text: string;
    urlImg: string;
  }
  