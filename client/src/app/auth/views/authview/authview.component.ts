import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/core/services/Profile.service';

@Component({
  selector: 'app-authview',
  templateUrl: './authview.component.html',
  styleUrls: ['./authview.component.scss'],
})
export class AuthviewComponent {
  constructor(private profileService: ProfileService, private router: Router) {}
  data: any;

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.data = this.profileService.getUserDataFromLocalStorage();
    if (this.data.name) {
      this.router.navigate(['/app']);
    }
  }
}
