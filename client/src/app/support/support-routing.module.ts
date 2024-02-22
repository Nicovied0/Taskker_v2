import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupportviewsComponent } from './views/supportviews/supportviews.component';

const routes: Routes = [
  {
    path: '',
    component: SupportviewsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupportRoutingModule {}
