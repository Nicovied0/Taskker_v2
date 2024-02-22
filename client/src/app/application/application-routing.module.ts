import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppviewComponent } from './views/appview/appview.component';
import { ProfileviewComponent } from './views/profileview/profileview.component';
import { EditprofileviewComponent } from './views/editprofileview/editprofileview.component';

const routes: Routes = [
  {
    path: '',
    component: AppviewComponent,
  },
  {
    path: 'profile',
    component: ProfileviewComponent,
  },
  {
    path: 'editProfile',
    component: EditprofileviewComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicationRoutingModule {}
