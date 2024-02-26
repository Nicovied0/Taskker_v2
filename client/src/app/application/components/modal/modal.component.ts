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
  startTimeOptions: string[] = [];
  endTimeOptions: string[] = [];

  @Input() dateToTask: string = '';
  @Output() taskCreated = new EventEmitter<any>();
  @Output() modalClosed = new EventEmitter<void>();

  ngOnInit() {
    // Establecer startDate con el valor de dateToTask al iniciar el modal
    this.startDate = this.dateToTask;

    // Obtener la hora de inicio de dateToTask y generar las opciones de hora de inicio
    const dateTimeParts = this.dateToTask.split('T');
    const timePart = dateTimeParts[1].substring(0, 5); // "09:30"
    this.startTime = timePart;
    this.generateStartTimeOptions();
  }

  createTask() {
    const taskData = {
      title: this.taskName,
      description: this.taskDescription,
      status: 'Agendada',
      meetingUrl: this.meetingUrl,
      repeatDaily: this.repeatDaily,
      start: this.startDate + 'T' + this.startTime,
      end: this.endDate,
    };
    this.taskCreated.emit(taskData);
    this.closeModal();
  }

  generateStartTimeOptions() {
    for (let hour = 6; hour <= 23; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        this.startTimeOptions.push(time);
      }
    }
  }

  generateEndTimeOptions() {
    // Limpiar el array de opciones de hora de fin
    this.endTimeOptions = [];

    // Obtener la hora y los minutos de la hora de inicio seleccionada
    const [startHour, startMinute] = this.startTime.split(':').map(Number);

    // Calcular la hora de inicio en minutos
    const startTotalMinutes = startHour * 60 + startMinute;

    // Generar opciones de hora de fin con intervalos de 30 minutos a partir de la hora de inicio
    for (let totalMinutes = startTotalMinutes + 30; totalMinutes <= 23 * 60; totalMinutes += 30) {
      // Calcular la hora y los minutos para la opción de hora de fin
      const hour = Math.floor(totalMinutes / 60);
      const minute = totalMinutes % 60;

      // Agregar la opción de hora de fin al array
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      this.endTimeOptions.push(time);
    }
  }

  closeModal() {
    this.modalClosed.emit();
  }
}
