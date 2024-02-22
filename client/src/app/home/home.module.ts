import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeviewsComponent } from './views/homeviews/homeviews.component';
import { DetailsComponent } from './components/details/details.component';
import { OptimizeComponent } from './components/optimize/optimize.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    HomeviewsComponent,
    DetailsComponent,
    OptimizeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule
  ]
})
export class HomeModule { }
