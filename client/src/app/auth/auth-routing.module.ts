import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthviewComponent } from './views/authview/authview.component';

const routes: Routes = [
  {
    path: '',
    component: AuthviewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
