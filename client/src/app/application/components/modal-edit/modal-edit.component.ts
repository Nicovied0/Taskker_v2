import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.scss'],
})
export class ModalEditComponent implements OnInit {
  @Input() dataToEdit: any = [];
  @Output() taskEdited = new EventEmitter<any>();
  @Output() modalEditClosed = new EventEmitter<void>();

  ngOnInit() {
    this.setData();
    this.generateStartTimeOptions();
    this.generateEndTimeOptions();
  }

  constructor() {}

  taskName: any;
  taskDescription: any;
  meetingUrl: any;
  repeatDaily: any;
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

  setData() {
    if (this.dataToEdit) {
      this.taskName = this.dataToEdit.text || '';
      this.taskDescription = this.dataToEdit.description || '';
      this.meetingUrl = this.dataToEdit.meetingUrl || '';
      this.repeatDaily = this.dataToEdit.diaryEvent || false;
      this.startTime = this.dataToEdit.start;
      this.startDataToInput = this.getStartDate();
      console.log(this.startDate);
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
      this.taskData.start = this.dataToEdit.start;
      this.taskData.title = this.taskName;
      this.taskData.description = this.taskDescription;
      this.taskData.meetingUrl = this.meetingUrl;
      this.taskData.repeatDaily = this.repeatDaily;
      this.taskData.end = this.startDate + 'T' + this.endTime + ':00';
      console.log('so easy', this.taskData);
    }
    if (this.repeatDaily === true) {
      this.taskData.start = this.dataToEdit.start;
      this.taskData.title = this.taskName;
      this.taskData.description = this.taskDescription;
      this.taskData.meetingUrl = this.meetingUrl;
      this.taskData.repeatDaily = this.repeatDaily;
      this.taskData.end = this.endDate + 'T' + this.endTime + ':00';
      this.taskData.repeatDaily = true;
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
    console.log(this.taskData);
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
}
