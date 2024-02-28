import { Component, OnInit } from '@angular/core';
import { GridService } from '../../../core/services/GridDate.service';
import { TaskService } from 'src/app/core/services/Task.service';
import { AuthService } from 'src/app/core/services/Auth.service';

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
  cellTasks: boolean[][] = [];

  tasks: any[] = [];
  showModal = false;
  showModalEdit = false;
  dateToTask: any;
  dataToEdit: any;
  status: string = '';
  currentDateIndex: number | undefined;
  cellClicked: boolean | undefined;
  selectedCol: number | undefined;
  selectedRow: number | undefined;

  constructor(
    private gridService: GridService,
    private taskService: TaskService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getData();
    this.loadGridData();
    this.generateWeekDates();
  }

  getData() {
    const userId = this.authService.getUserDataFromLocalStorage().id;
    this.taskService.getTasksByUserId2(userId).subscribe((tasks) => {
      this.tasks = tasks;
      console.log('tasks', this.tasks);
      this.generateArrayForAllTasks();
    });
  }

  setAutofocus() {
    const currentDate = new Date();
    if (this.gridData) {
      this.currentDateIndex = this.gridData.findIndex((dayData) => {
        const day = new Date(dayData.day);
        return (
          day.getDate() === currentDate.getDate() &&
          day.getMonth() === currentDate.getMonth() &&
          day.getFullYear() === currentDate.getFullYear()
        );
      });
    }
  }

  loadGridData() {
    this.gridService.getGridData().subscribe(
      (data) => {
        this.gridData = data;
        if (this.gridData && this.gridData.length > 0) {
          this.hours = this.gridData[0].hours;
        }
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
      {
        date: firstDayOfWeek,
        dayName: this.getDayName(firstDayOfWeek),
        dateComplet: this.getDayNumber(firstDayOfWeek),
      },
    ];

    for (let i = 1; i < 7; i++) {
      const nextDay = new Date(firstDayOfWeek);
      nextDay.setDate(firstDayOfWeek.getDate() + i);
      week.push({
        date: nextDay,
        dayName: this.getDayName(nextDay),
        dateComplet: this.getDayNumber(nextDay),
      });
    }

    this.weeks = week;
  }

  getDayName(date: Date): string {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    return `${day} / ${month}`;
  }

  getDayNumber(date: Date): string | null {
    if (!date) {
      return null;
    }

    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
  }

  createTask(hour: any, dayData: any, arrayDate: any) {
    const createTask = this.generateDatoToCreateTask(hour, dayData, arrayDate);
    this.dateToTask = createTask;
    this.showModal = true;
  }

  onTaskCreated(taskName: string) {
    console.log('Tarea creada:', taskName);
    this.showModal = false;
  }

  onModalClosed() {
    this.showModal = false;
  }
  onModalEditClosed() {
    this.showModalEdit = false;
  }

  generateArrayForAllTasks(): void {
    this.cellTasks = this.hours.map((hour) =>
      this.gridData!.map((dayData) => this.checkTaskForHour(hour.time, dayData))
    );
  }

  generateDatoToCreateTask(hour: any, dayData: any, arrayDate: any[]): any {
    const dayIndexMap: { [key: string]: number } = {
      Lunes: 0,
      Martes: 1,
      Miercoles: 2,
      Jueves: 3,
      Viernes: 4,
      Sabado: 5,
      Domingo: 6,
    };

    const dayIndex = dayIndexMap[dayData.day];

    if (dayIndex !== undefined) {
      const dayNumber = arrayDate[dayIndex].dateComplet;
      const response = dayNumber + hour;
      return response;
    } else {
      console.log('error in generate date');
      return null;
    }
  }

  selectCalendar(data: any) {
    this.week = data === 'Week';
    this.month = data === 'Month';
    this.day = data === 'Day';
  }

  recibirDatosDelHijo(childData: any) {
    this.selectCalendar(childData);
  }

  checkTaskForHour(hour: any, dayData: any): boolean {
    const data = this.generateDatoToCreateTask(hour, dayData, this.weeks);
    return this.tasks.some((task) => task.start === data);
  }

  editTaskIfExists(id: any, data: any) {
    console.log(id, data);
    this.dataToEdit = data;
    this.showModalEdit = true;
    console.log(this.dataToEdit);
  }
}
