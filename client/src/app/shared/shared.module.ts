import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { LoaderComponent } from './loader/loader.component';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../core/services/Profile.service';



@NgModule({
  declarations: [
    NavComponent,
    FooterComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    

  ],
  exports:[
    NavComponent, 
    FooterComponent, 
    LoaderComponent
  ],
  providers:[ProfileService]
  
})
export class SharedModule { }
