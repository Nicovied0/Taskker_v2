import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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

@NgModule({
  declarations: [
    AppviewComponent,
    NavComponent,
    ProfileviewComponent,
    EditprofileviewComponent,
    CalendarComponent,
  ],
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    FormsModule,
    HttpClientModule,
    DayPilotModule,
  ],
  providers: [DataService],
})
export class ApplicationModule {}
