import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusviewsComponent } from './views/aboutusviews/aboutusviews.component';

const routes: Routes = [
  {
    path: '',
    component: AboutusviewsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutusRoutingModule {}
