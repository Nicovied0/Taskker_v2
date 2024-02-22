
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProfileService } from '../../../core/services/Profile.service';
import { AuthService } from '../../../core/services/Auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  constructor(private profileService: ProfileService, private router: Router, private authService: AuthService) { }
  data: any
  role:any


  ngOnInit() {
    this.getProfile()
  }

  getProfile() {
    this.data = this.profileService.getUserDataFromLocalStorage()
    this.role = this.data.role
  }

  goHome() {
    this.router.navigate(['/'])
  }
  goDashboard() {
    this.router.navigate(['/app'])
  }

  goProfile() {
    this.router.navigate(['/app/profile'])
  }
  goProfileEdit() {
    this.router.navigate(['/app/editProfile'])
  }
  goInstitution(){
    this.router.navigate(['/app/institution'])
  }


  logout() {
    this.authService.logout()
    this.router.navigate(['/'])
  }
}
