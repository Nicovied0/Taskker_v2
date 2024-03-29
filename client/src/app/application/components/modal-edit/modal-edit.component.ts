import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  getPositionInEndTimeOptions,
  generateArrayToIDDate,
  generateWeekTask
} from '../modal/gridFunction';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.scss'],
})
export class ModalEditComponent implements OnInit {
  @Input() dataToEdit: any = [];
  @Input() idGridNewTask: any;
  @Output() taskEdited = new EventEmitter<any>();
  @Output() modalEditClosed = new EventEmitter<void>();

  ngOnInit() {
    this.setData();
    this.generateStartTimeOptions();
    this.generateEndTimeOptions();
    console.log(this.idGridNewTask);
  }

  constructor() {}

  repeatDaysOptions: string[] = [
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado',
    'Domingo',
  ];
  taskName: any;
  taskDescription: any;
  meetingUrl: any;
  daysOfRepeat: any[] = [];
  repeatDaily: any;
  startDate: string = '';
  endDate: string = '';
  startTime: string = '';
  endTime: string = '';
  selectedDays: { [key: string]: boolean } = {
    Lunes: false,
    Martes: false,
    Miercoles: false,
    Jueves: false,
    Viernes: false,
    Sabado: false,
    Domingo: false,
  };

  startTimeOptions: string[] = [];
  startDataToInput: any = '';
  endTimeOptions: string[] = [];
  taskData: any = {
    status: 'Agendada',
  };

  lastDay: string | undefined;

  setData() {
    if (this.dataToEdit) {
      this.taskName = this.dataToEdit.text || '';
      this.taskDescription = this.dataToEdit.description || '';
      this.meetingUrl = this.dataToEdit.meetingUrl || '';
      this.repeatDaily = this.dataToEdit.diaryEvent || false;
      this.startTime = this.dataToEdit.start;
      this.startDataToInput = this.getStartDate();
      this.startTime = this.dataToEdit.start;
      this.endTime = this.dataToEdit.end;
      this.startDate = this.getStartDate();

      const startDateTime = new Date(this.startTime);
      const startHour = startDateTime.getHours().toString().padStart(2, '0');
      const startMinute = startDateTime
        .getMinutes()
        .toString()
        .padStart(2, '0');

      const endDateTime = new Date(this.endTime);
      const endHour = endDateTime.getHours().toString().padStart(2, '0');
      const endMinute = endDateTime.getMinutes().toString().padStart(2, '0');
      this.endTime = `${endHour}:${endMinute}`;
      this.startTime = `${startHour}:${startMinute}`;
      console.log(this.endTime);
      console.log(this.startTime);
    }
  }

  createTask() {
    if (this.repeatDaily === false) {
      this.x()
      this.executeGridFunction()
      this.taskData.start = this.dataToEdit.start;
      this.taskData.title = this.taskName;
      this.taskData.description = this.taskDescription;
      this.taskData.meetingUrl = this.meetingUrl;
      this.taskData.repeatDaily = this.repeatDaily;
      this.taskData.end = this.startDate + 'T' + this.endTime + ':00';
      this.taskData.gridId = this.arrayGridPositions;
      console.log('so easy', this.taskData);
    }

    if (this.repeatDaily === true) {
      this.x()
      this.executeGridFunction()
      const array =  this.executeGridFunction()

      this.taskData.start = this.dataToEdit.start;
      this.taskData.title = this.taskName;
      this.taskData.description = this.taskDescription;
      this.taskData.meetingUrl = this.meetingUrl;
      this.taskData.repeatDaily = true;
      this.taskData.daysOfRepeat = this.daysOfRepeat;
      console.log('soy yo');
    }
    this.taskData.id = this.dataToEdit.id;
    console.log(this.taskData);
    this.taskEdited.emit(this.taskData);
    this.closeModal();
  }

  generateStartTimeOptions() {
    for (let hour = 6; hour <= 23; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute
          .toString()
          .padStart(2, '0')}`;
        this.startTimeOptions.push(time);
      }
    }
  }

  x() {

    const lastSelectedDays = Object.keys(this.selectedDays).filter(
      (key) => this.selectedDays[key]
    );
    this.lastDay = lastSelectedDays[lastSelectedDays.length - 1];

    console.log(lastSelectedDays);
    this.daysOfRepeat = lastSelectedDays;
    console.log(this.lastDay);
    console.log(this.daysOfRepeat);
    console.log(this.endTime);
    this.getDayActual(this.lastDay);

    console.log(this.taskData);
  }

  getDayActual(lastDay: any) {
    const currentDate = new Date();
    let currentDay = currentDate.getDay();
    const daysToAdd = (8 - currentDay) % 7;
    const nextMondayDate = new Date(
      currentDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000
    );

    const daysOfWeek = [
      'Lunes',
      'Martes',
      'Miercoles',
      'Jueves',
      'Viernes',
      'Sabado',
      'Domingo',
    ];
    const indexOfLastDay = daysOfWeek.indexOf(lastDay);
    const dayDifference = indexOfLastDay;
    const targetDate = new Date(nextMondayDate);
    targetDate.setDate(nextMondayDate.getDate() + dayDifference);

    const year = targetDate.getFullYear();
    const month = (targetDate.getMonth() + 1).toString().padStart(2, '0');
    const day = targetDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    console.log(formattedDate);
    this.taskData.end = formattedDate + 'T' + this.endTime + ':00';
    console.log(this.taskData.end, 'end');
  }

  generateEndTimeOptions() {
    this.endTimeOptions = [];
    console.log(this.startTime);

    const [startHour, startMinute] = this.startTime.split(':').map(Number);

    const startTotalMinutes = startHour * 60 + startMinute;

    for (
      let totalMinutes = startTotalMinutes + 30;
      totalMinutes <= 23 * 60;
      totalMinutes += 30
    ) {
      const hour = Math.floor(totalMinutes / 60);
      const minute = totalMinutes % 60;

      const time = `${hour.toString().padStart(2, '0')}:${minute
        .toString()
        .padStart(2, '0')}`;
      this.endTimeOptions.push(time);
    }
  }

  getStartDate() {
    const startDate = this.dataToEdit.start;
    const dateParts = startDate.split('T');
    const dateWithoutTime = dateParts[0];
    console.log(dateWithoutTime);
    return dateWithoutTime;
  }

  closeModal() {
    this.modalEditClosed.emit();
  }

  onInputChange() {
    console.log('El valor del campo ha cambiado: ' + this.repeatDaily);
    console.log(this.taskData);
  }

  arrayGridPositions: string[] = [];

  executeGridFunction() {
    const gridStart = Number(this.idGridNewTask);
    const endTimeOptions = this.endTimeOptions;
    const position = getPositionInEndTimeOptions(
      this.endTime,
      gridStart,
      endTimeOptions
    );
    this.arrayGridPositions = generateArrayToIDDate(gridStart, position);
    if(this.repeatDaily === true){
      let response = generateWeekTask( this.arrayGridPositions,this.daysOfRepeat)
      console.log(response)
      this.taskData.gridId = response
    }else{
      this.taskData.gridId = this.arrayGridPositions;
    }
    console.log(this.taskData)
  }



}
