import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { DatePipe } from '@angular/common';

import { ApplicationRoutingModule } from './application-routing.module';
import { AppviewComponent } from './views/appview/appview.component';
import { NavComponent } from './components/nav/nav.component';
import { ProfileviewComponent } from './views/profileview/profileview.component';
import { EditprofileviewComponent } from './views/editprofileview/editprofileview.component';
import { FormsModule } from '@angular/forms';
import { CalendarComponent } from './components/calendar/calendar.component';

import { DayPilotModule } from '@daypilot/daypilot-lite-angular';
import { DataService } from './components/calendar/data.service';
import { HttpClientModule } from '@angular/common/http';
import { Calendar2Component } from './components/calendar2/calendar2.component';
import { NavigatorComponent } from './components/navigator/navigator.component';
import { ModalComponent } from './components/modal/modal.component';
import { ModalEditComponent } from './components/modal-edit/modal-edit.component';
import { ModalViewComponent } from './components/modal-view/modal-view.component';

@NgModule({
  declarations: [
    AppviewComponent,
    NavComponent,
    ProfileviewComponent,
    EditprofileviewComponent,
    CalendarComponent,
    Calendar2Component,
    NavigatorComponent,
    ModalComponent,
    ModalEditComponent,
    ModalViewComponent,
  ],
  imports: [
    CommonModule, // Agrega CommonModule aquí
    ApplicationRoutingModule,
    FormsModule,
    HttpClientModule,
    DayPilotModule,
  ],
  providers: [DataService],
})
export class ApplicationModule {}
