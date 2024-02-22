import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeviewsComponent } from './views/homeviews/homeviews.component';

const routes: Routes = [
  {
    path: '',
    component: HomeviewsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
