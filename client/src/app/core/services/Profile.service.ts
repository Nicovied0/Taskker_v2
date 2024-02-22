import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor() {}

  getUserDataFromLocalStorage(): any {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      return userData;
    } else {
      return null;
    }
  }

  updateRol() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    userData.role = 'admin';
    localStorage.setItem('userData', JSON.stringify(userData));
  }
  
}