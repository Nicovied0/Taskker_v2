import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const userData = localStorage.getItem('userData');

    if (userData) {
      const user = JSON.parse(userData);

      if (user && user.role === 'admin') {
        return true;
      }
    }

    return false;
  }

  profileAdmin() {}
}
