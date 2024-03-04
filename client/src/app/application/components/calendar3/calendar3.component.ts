import { Component, OnInit } from '@angular/core';
import { GridService } from '../../../core/services/GridDate.service';
import { TaskService } from 'src/app/core/services/Task.service';
import { AuthService } from 'src/app/core/services/Auth.service';
import { SearchDataService } from 'src/app/core/services/SearchData.service';

@Component({
  selector: 'app-calendar3',
  templateUrl: './calendar3.component.html',
  styleUrls: ['./calendar3.component.scss'],
})
export class Calendar3Component implements OnInit {
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
  showModalView: boolean = false;
  idGridNewTask: any;
  dataToView: any;
  dateToTask: any;
  dataToEdit: any;
  status: string = '';
  currentDateIndex: number | undefined;
  cellClicked: boolean | undefined;
  selectedCol: number | undefined;
  selectedRow: number | undefined;
  userId: any;
  days: any;

  constructor(
    private gridService: GridService,
    private taskService: TaskService,
    private authService: AuthService,
    private searchDataService: SearchDataService
  ) {}

  ngOnInit(): void {
    this.getData();
    this.loadGridData();
    this.generateWeekDates();
    this.searchDataService
      .getIdsForDay('T09:00:00', 'T09:30:00', 'Martes')
      .subscribe((ids) => {
        console.log(ids);
        this.days = ids;
      });
    this.dataHourToDayId();
  }

  getData() {
    this.userId = this.authService.getUserDataFromLocalStorage().id;
    this.taskService.getTasksByUserId2(this.userId).subscribe((tasks) => {
      this.tasks = tasks;
      console.log('tasks', this.tasks);
      this.generateArrayForAllTasks();
    });
  }
  dayHourId: any;

  loadGridData() {
    this.gridService.getGridData().subscribe(
      (data) => {
        this.gridData = data;
        if (this.gridData && this.gridData.length > 0) {
          this.hours = this.gridData[0].hours;
        }
        console.log(this.gridData);
        console.log(this.hours);

        // Setear el id en cada grilla
        this.gridData!.forEach((dayData) => {
          dayData.hours.forEach((hour: { id: { toString: () => any } }) => {
            // Establecer el id en cada hora
            hour.id = hour.id.toString(); // Convertir a cadena si es necesario
          });
        });

        // Llamar a dataHourToDayId después de cargar los datos de la cuadrícula
        this.dataHourToDayId();
      },
      (error) => {
        console.error('Error al cargar los datos de la cuadrícula:', error);
      }
    );
  }

  deleteTask(id: any) {
    console.log(id);
    this.taskService.deleteTask(id).subscribe(
      (response) => {
        console.log('Tarea eliminada con éxito:', response);
        this.tasks = [];
        this.getData();
      },
      (error) => {
        console.error('Error al eliminar la tarea:', error);
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

  createTask(hour: any, dayData: any, arrayDate: any, idGrid: any) {
    console.log('soy este');
    const createTask = this.generateDatoToCreateTask(hour, dayData, arrayDate);

    this.dateToTask = createTask;

    this.showModal = true;
    this.idGridNewTask = idGrid;
    console.log(this.dateToTask);
  }

  onModalClosed() {
    this.showModal = false;
  }
  onModalEditClosed() {
    this.showModalEdit = false;
  }
  modalviewClosed() {
    this.showModalView = false;
  }

  generateArrayToTaskUbications(id: any) { 
    let arrayTasks = [];
    for (let i = 0; i < this.tasks.length; i++) {
      for (let j = 0; j < this.tasks[i].gridId.length; j++) {
        if (this.tasks[i].gridId[j] === id) {
          arrayTasks.push(this.tasks[i].gridId[j]); 
        }
      }
    }
    return arrayTasks; 
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
    console.log;
    const data = this.generateDatoToCreateTask(hour, dayData, this.weeks);

    return this.tasks.some((task) => task.start === data);
  }

  editTaskIfExists(id: any, data: any) {
    console.log(id, data);
    this.dataToEdit = data;
    this.showModalEdit = true;
    console.log(this.dataToEdit);
  }

  onTaskCreated(data: any) {
    const newTask = {
      start: data.start,
      end: data.end,
      title: data.title,
      usercreator: this.userId,
      status: data.status,
      repeatDaily: data.repeatDaily,
      meetingUrl: data.meetingUrl,
      description: data.description,
      gridId:data.gridId
    };

    this.taskService.createTask2(newTask).subscribe(
      (response) => {
        console.log('Nueva tarea creada con éxito:', response);
        this.tasks = [];
        this.getData();
        this.showModal = false;
      },
      (error) => {
        console.error('Error al crear la tarea:', error);
      }
    );
  }

  onTaskEdited(data: any) {
    console.log(data);
    console.log('soy el edited');
    const editTask = {
      start: data.start,
      end: data.end,
      title: data.title,
      usercreator: this.userId,
      status: data.status,
      repeatDaily: data.repeatDaily,
      meetingUrl: data.meetingUrl,
      description: data.description,
      gridId:data.gridId
    };
    const id = data.id;
    this.taskService.editTask2(id, editTask).subscribe(
      (response) => {
        console.log('Tarea editada con éxito:', response);
        this.tasks = [];
        this.getData();
      },
      (error) => {
        console.error('Error al editar la tarea:', error);
      }
    );
  }

  viewTask(id: any, data: any, idGrid: any) {
    console.log(id, data, idGrid);
    this.dataToView = data;
    this.dataToView.idGrid = idGrid;
    this.showModalView = true;
    console.log(this.dataToView);
  }

  comprobate(id: any, task: any) {
    for (let i = 0; i < task.gridId.length; i++) {
      if (id === task.gridId[i]) {
        return true;
      }
    }
    return false;
  }

  comprobate2(id: any, task: any): boolean {
     const data = task.gridId.filter((gridId: any) => gridId === id).length > 0;
     return data
  }

  noCoincideConNingunTask(id: any) {
    for (let i = 0; i < this.tasks.length; i++) {
      for (let j = 0; j < this.tasks[i].gridId.length; j++) {
        if (id === this.tasks[i].gridId[j]) {
          return false; 
        }
      }
    }
    return true; 
  }

  getTaskStatusClass(status: string): string {
    switch (status) {
      case 'Completa':
        return 'green-background';
      case 'Alerta':
        return 'yellow-background';
      case 'Cancelada':
        return 'red-background';
      case 'Agendada':
        return 'blue-background';
      case 'En proceso':
        return 'grey-background';
      default:
        return '';
    }
  }

  comprobarTareas(hourId: any): boolean {
    return this.tasks.some((task) => this.comprobate(hourId, task));
  }

  dataHourToDayId() {
    if (!this.gridData) {
      console.error('No hay datos de la cuadrícula para procesar.');
      return;
    }

    this.dayHourId = {};

    this.gridData.forEach((dayData) => {
      const dayId = dayData.day;
      const hourIds: any[] = [];

      dayData.hours.forEach((hour: { id: any }) => {
        hourIds.push(hour.id);
      });

      this.dayHourId[dayId] = hourIds;
    });

    console.log('dayHourId:', this.dayHourId);
  }
}
