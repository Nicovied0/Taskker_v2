import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  taskName: string = '';
  taskDescription: string = '';
  meetingUrl: string = '';
  repeatDaily: boolean = false;
  startDate: string = '';
  endDate: string = '';
  startTime: string = '';
  endTime: string = '';
  startTimeOptions: string[] = [];
  startDataToInput: any = '';
  endTimeOptions: string[] = [];
  taskData: any = {
    status: 'Agendada',
  };

  @Input() dateToTask: string = '';
  @Input() idGridNewTask : any;
  @Output() taskCreated = new EventEmitter<any>();
  @Output() modalClosed = new EventEmitter<void>();

  ngOnInit() {
    this.startDate = this.dateToTask;
    console.log(this.dateToTask)
    this.comproveTypeDate();
    console.log(this.repeatDaily);
    console.log(this.idGridNewTask)
  }

  createTask() {
    if (this.repeatDaily === false) {
      this.taskData.start = this.startDate;
      this.taskData.title = this.taskName;
      this.taskData.description = this.taskDescription;
      this.taskData.meetingUrl = this.meetingUrl;
      this.taskData.repeatDaily = this.repeatDaily;
      this.taskData.end = this.endDate + 'T' + this.endTime + ':00';
    }
    if (this.repeatDaily === true) {
      this.taskData.start = this.startDate;
      this.taskData.title = this.taskName;
      this.taskData.description = this.taskDescription;
      this.taskData.meetingUrl = this.meetingUrl;
      this.taskData.repeatDaily = this.repeatDaily;
      this.taskData.start = this.startDate;
      this.taskData.end = this.endDate + 'T' + this.endTime + ':00';
      this.taskData.repeatDaily = true;
      console.log('soy yo');
    }
    console.log(this.taskData)
    this.taskCreated.emit(this.taskData);
    this.closeModal();
  }

  comproveTypeDate() {
    if (this.repeatDaily === true) {
      const dateTimeParts = this.dateToTask.split('T');
      this.startDataToInput = dateTimeParts[0];
      this.taskData.start = this.startDate;
      this.taskData.end = this.endDate;
    }
    if (this.repeatDaily === false) {
      const dateTimeParts = this.dateToTask.split('T');
      const timePart = dateTimeParts[1].substring(0, 5);
      this.startTime = timePart;
      this.endDate = dateTimeParts[0];
      this.generateStartTimeOptions();
      this.generateEndTimeOptions();
    }
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

  generateEndTimeOptions() {
    this.endTimeOptions = [];

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

  closeModal() {
    this.modalClosed.emit();
  }

  onInputChange() {
    console.log('El valor del campo ha cambiado: ' + this.repeatDaily);
    this.comproveTypeDate();
  }
}
