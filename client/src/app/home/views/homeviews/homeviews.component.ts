import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homeviews',
  templateUrl: './homeviews.component.html',
  styleUrls: ['./homeviews.component.scss']
})
export class HomeviewsComponent {

  constructor(private router: Router){

  }
  goProfile(){
    this.router.navigate(["/app"])
  }
}
