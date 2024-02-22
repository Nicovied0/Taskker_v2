import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root',
})
export class EditProfileService {
  private linkUrl = environment.noTechMircoservicesUrl + '/api/user';

  constructor(private http: HttpClient) {}

  updateProfile(id: string, updatedData: any): Observable<Profile | null> {
    const updateUrl = `${this.linkUrl}/${id}`;
    return this.http
      .put<Profile>(updateUrl, updatedData)
      .pipe(catchError(() => of(null)));
  }
}

export interface Profile {
  _id: string;
  name: string;
  image: string;
  email: string;
  role: string;
  actived: boolean;
  createdAt: any;
}
