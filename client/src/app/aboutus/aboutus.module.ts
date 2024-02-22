import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutusRoutingModule } from './aboutus-routing.module';
import { AboutusviewsComponent } from './views/aboutusviews/aboutusviews.component';


@NgModule({
  declarations: [
    AboutusviewsComponent
  ],
  imports: [
    CommonModule,
    AboutusRoutingModule
  ]
})
export class AboutusModule { }
