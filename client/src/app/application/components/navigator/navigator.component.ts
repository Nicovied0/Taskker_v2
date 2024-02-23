import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss'],
})
export class NavigatorComponent {
  @Output() dataNavigation = new EventEmitter<any>();
  configNavigator = { selectMode: '' };

  viewDay(): void {
    this.configNavigator.selectMode = 'Day';
    this.dataToFather('Day');
  }

  viewWeek(): void {
    this.configNavigator.selectMode = 'Week';
    this.dataToFather('Week');
  }

  viewMonth(): void {
    this.configNavigator.selectMode = 'Month';
    this.dataToFather('Month');
  }

  dataToFather(arg: any) {
    const data = arg;
    this.dataNavigation.emit(data);
  }
}
