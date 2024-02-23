import { Component, OnInit } from '@angular/core';
import { GridService } from '../../../core/services/GridDate.service';

@Component({
  selector: 'app-calendar2',
  templateUrl: './calendar2.component.html',
  styleUrls: ['./calendar2.component.scss'],
})
export class Calendar2Component implements OnInit {
  gridData: any[] | undefined;
  hours: any[] = [];
  week = true;
  month = false;
  day = false;
  weeks: any[] = [];
  tasks = [];
  constructor(private gridService: GridService) {}

  ngOnInit(): void {
    this.loadGridData();
    this.generateWeekDates();
  }
  currentDateIndex: number | undefined;

  setAutofocus() {
    const currentDate = new Date();
    if (this.gridData) {
      this.currentDateIndex = this.gridData.findIndex(dayData => {
        const day = new Date(dayData.day);
        return day.getDate() === currentDate.getDate() &&
               day.getMonth() === currentDate.getMonth() &&
               day.getFullYear() === currentDate.getFullYear();
      });
    }
  }

  loadGridData() {
    this.gridService.getGridData().subscribe(
      (data) => {
        this.gridData = data;
        console.log(this.gridData);
        if (this.gridData && this.gridData.length > 0) {
          this.hours = this.gridData[0].hours;
        }
        console.log(this.hours);
      },
      (error) => {
        console.error('Error al cargar los datos de la cuadrícula:', error);
      }
    );
  }
  generateWeekDates() {
    const today = new Date();
    const firstDayOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay() + 1)
    );
    const week = [
      { date: firstDayOfWeek, dayName: this.getDayName(firstDayOfWeek) },
    ];

    for (let i = 1; i < 7; i++) {
      const nextDay = new Date(firstDayOfWeek);
      nextDay.setDate(firstDayOfWeek.getDate() + i);
      week.push({ date: nextDay, dayName: this.getDayName(nextDay) });
    }

    this.weeks = week;
    console.log(week);
  }
  getDayName(date: Date): string {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    return `${day} / ${month}`;
  }

  createTask(data: any, data2: any) {
    console.log(data);
    console.log(data2.day);
  }

  selectCalendar(data: any) {
    if (data === 'Week') {
      this.week = true;
      this.month = false;
      this.day = false;
    }
    if (data === 'Month') {
      this.month = true;
      this.week = false;
      this.day = false;
    }
    if (data === 'Day') {
      this.day = true;
      this.week = false;
      this.month = false;
    }
  }

  recibirDatosDelHijo(childData: any) {
    this.selectCalendar(childData);
  }
}
