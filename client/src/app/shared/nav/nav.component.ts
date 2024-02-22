import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/core/services/Profile.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  constructor(private profileService: ProfileService, private router: Router) {}

  data: any;
  logged: boolean = false;
  active = false;
  enOn = false;
  esOn = true;

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.data = this.profileService.getUserDataFromLocalStorage();
    if (this.data.name) {
      this.logged = true;
    }
  }
  goHome() {
    this.router.navigate(['']);
    this.noShowBurger();
  }

  goAboutUs() {
    this.router.navigate(['/aboutUs']);
    this.noShowBurger();
  }

  goSupport() {
    this.router.navigate(['/support']);
    this.noShowBurger();
  }

  goDashboard() {
    this.router.navigate(['/auth']);
    this.noShowBurger();
  }

  showBurger() {
    this.active = !this.active;
  }

  noShowBurger() {
    this.active = false;
  }
}
