import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/Auth.service';
import { ProfileService } from 'src/app/core/services/Profile.service';

@Component({
  selector: 'app-profileview',
  templateUrl: './profileview.component.html',
  styleUrls: ['./profileview.component.scss'],
})
export class ProfileviewComponent {
  constructor(
    private profileService: ProfileService,
    private authService: AuthService
  ) {}
  data: any;
  role: any;

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.data = this.profileService.getUserDataFromLocalStorage();
    this.role = this.data.role;
  }
}
