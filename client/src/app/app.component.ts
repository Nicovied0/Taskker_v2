import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'client';

  showLoader: any = null;
  ruta: any = true;
  currentRoute = this.router.url;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.ruta = this.router.url;

        if (this.ruta.includes('/app') || this.ruta.includes('/auth')) {
          this.showLoader = false;
        } else {
          this.showLoader = true;
        }
      }
    });
  }
}
