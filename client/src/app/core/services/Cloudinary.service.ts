import { Injectable } from '@angular/core';
import { environment } from '../../../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of, tap } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CloudinaryService {
  private apiUrl = environment.noTechMircoservicesUrl + '/api/newImage';

  constructor(private http: HttpClient) {}

  uploadImage(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);

    return this.http.post(this.apiUrl, formData).pipe(
      tap((response) => console.log('Cloudinary response:', response)),
      catchError((error) => {
        console.error('Error during image upload:', error);
        return throwError(error);
      }),
      switchMap((response: any) => {
        if (response && response.url) {
          return of(response);
        } else {
          return throwError('Invalid response format');
        }
      })
    );
  }
}
