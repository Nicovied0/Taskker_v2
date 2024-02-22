import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private linkUrl = environment.backUrl + "/auth/login";
  private registerUrl = environment.backUrl + "/auth/register";
  private verifyTokenUrl = environment.backUrl + "/auth/profile";

  constructor(private http: HttpClient,) { }

  login(email: string, password: string): Observable<any> {
    const credentials = { email, password };

    return this.http.post(this.linkUrl, credentials).pipe(
      catchError((error) => {
        console.error('Error during login:', error);
        return throwError(error);
      }),
      switchMap((response: any) => {
        if (response && response.token) {
          this.storeToken(response.token);
          return this.getUserData();
        }
        return of(response);
      })
    );
  }
  
  private storeToken(token: string): void {
    localStorage.setItem('authToken', token);
  }


  getUserData(): Observable<any | null> {
    return this.getToken().pipe(
      switchMap((authToken) => {
        if (!authToken) {
          return throwError('No authentication token found');
        }

        const headers = new HttpHeaders({
          'token': authToken
        });

        return this.http.get(this.verifyTokenUrl, { headers }).pipe(
          catchError((error) => {
            console.error('Error fetching user data:', error);
            const userData = this.getUserDataFromLocalStorage();
            return userData ? of(userData) : throwError(error);
          }),
          switchMap((response: any) => {
            if (response && response.profile) {
              this.storeUserData(response.profile);
            }
            return of(response);
          })
        );
      })
    );
  }

   getUserDataFromLocalStorage(): any | null {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }

  private storeUserData(profileData: any): void {
    localStorage.setItem('userData', JSON.stringify(profileData));
  }


  getToken(): Observable<string | null> {
    return new Observable((observer) => {
      const token = localStorage.getItem('authToken');
      observer.next(token);
      observer.complete();
    });
  }





  isLoged(): boolean {
    const authToken = this.getToken();
    return authToken !== null;
  }

  register(email: string, password: string, name: string): Observable<any> {
    const credentials = { email, password, name }
    return this.http.post(this.registerUrl, credentials);
  }


  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
  }
}