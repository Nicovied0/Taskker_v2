import {
  Component,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import {
  DayPilot,
  DayPilotCalendarComponent,
  DayPilotMonthComponent,
  DayPilotNavigatorComponent,
} from '@daypilot/daypilot-lite-angular';
import { DataService } from './data.service';
import { TaskService } from 'src/app/core/services/Task.service';
import { AuthService } from 'src/app/core/services/Auth.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements AfterViewInit {
  @ViewChild('day') day!: DayPilotCalendarComponent;
  @ViewChild('week') week!: DayPilotCalendarComponent;
  @ViewChild('month') month!: DayPilotMonthComponent;
  @ViewChild('navigator') nav!: DayPilotNavigatorComponent;

  events: DayPilot.EventData[] = [];

  constructor(
    private ds: DataService,
    private taskService: TaskService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {
    this.viewWeek();
  }
  tasks: any[] | undefined;
  reloadComponentFlag: boolean = true;
  ngOnInit(): void {}

  form = [
    { name: 'Titulo', id: 'text' },
    { name: 'Descripcion', id: 'description' },
    {
      name: 'Comienza',
      id: 'start',
      dateFormat: 'MM/dd/yyyy',
      type: 'datetime',
    },
    { name: 'Termina', id: 'end', dateFormat: 'MM/dd/yyyy', type: 'datetime' },
    {
      name: 'Estado',
      id: 'backColor',
      type: 'select',
      options: this.ds.getColors(),
    },
  ];

  date = DayPilot.Date.today();

  contextMenu = new DayPilot.Menu({
    items: [
      {
        text: 'Eliminar',
        onClick: (args) => {
          const event = args.source;
          const dp = event.calendar;
          dp.events.remove(event);

          this.taskService.deleteTask(event.data.id).subscribe(
            (response) => {
              console.log('Tarea eliminada en el servidor:', response);
            },
            (error) => {
              console.error(
                'Error al eliminar la tarea en el servidor:',
                error
              );
            }
          );
        },
      },
      {
        text: 'Editar',
        onClick: async (args) => {
          const event = args.source;
          const dp = event.calendar;
          const data = event.data;

          const form = [
            { name: 'Titulo', id: 'text' },
            { name: 'Descripcion', id: 'description' },
            {
              name: 'Comienza',
              id: 'start',
              dateFormat: 'MM/dd/yyyy',
              type: 'datetime',
            },
            {
              name: 'Termina',
              id: 'end',
              dateFormat: 'MM/dd/yyyy',
              type: 'datetime',
            },
            {
              name: 'Estado',
              id: 'backColor',
              type: 'select',
              options: this.ds.getColors(),
            },
          ];

          const modal = await DayPilot.Modal.form(form, data);

          if (modal.canceled) {
            return;
          }

          event.data.text = modal.result.text;
          event.data.description = modal.result.description;
          event.data.start = modal.result.start.value;
          event.data.end = modal.result.end.value;
          event.data.backColor = this.getColorForStatus(modal.result.backColor);

          let updatedEvent = modal.result;
          updatedEvent.backColor = this.getColorForStatus(
            modal.result.backColor
          );

          this.taskService.editTask(event.data.id, updatedEvent).subscribe(
            (response) => {
              console.log('Evento editado en el servidor:', response);
            },
            (error) => {
              console.error('Error al editar el evento en el servidor:', error);
            }
          );
          event.data.backColor = this.getStatusForColors(
            modal.result.backColor
          );
          dp.events.update(event);
        },
      },
      {
        text: 'Cancelada',
        onClick: (args) => {
          const event = args.source;
          const dp = event.calendar;
          event.data.backColor = DataService.colors.red;
          dp.events.update(event);
          this.taskService.editStatus(event.data.id, 'Cancelada').subscribe(
            (response) => {
              console.log('Estado actualizado en el servidor:', response);
            },
            (error) => {
              console.error(
                'Error al actualizar el estado en el servidor:',
                error
              );
            }
          );
        },
      },
      {
        text: 'Completada',
        onClick: (args) => {
          const event = args.source;
          const dp = event.calendar;
          event.data.backColor = DataService.colors.green;

          dp.events.update(event);
          this.taskService.editStatus(event.data.id, 'Completa').subscribe(
            (response) => {
              console.log('Estado actualizado en el servidor:', response);
            },
            (error) => {
              console.error(
                'Error al actualizar el estado en el servidor:',
                error
              );
            }
          );
        },
      },
      {
        text: 'Agendada',
        onClick: (args) => {
          const event = args.source;
          const dp = event.calendar;
          event.data.backColor = DataService.colors.blue;

          dp.events.update(event);
          this.taskService.editStatus(event.data.id, 'Agendada').subscribe(
            (response) => {
              console.log('Estado actualizado en el servidor:', response);
            },
            (error) => {
              console.error(
                'Error al actualizar el estado en el servidor:',
                error
              );
            }
          );
        },
      },
      {
        text: 'Alerta',
        onClick: (args) => {
          const event = args.source;
          const dp = event.calendar;

          event.data.backColor = this.getColorForStatus(event.data.backColor);

          this.taskService.editStatus(event.data.id, 'Alerta').subscribe(
            (response) => {
              console.log('Estado actualizado en el servidor:', response);
            },
            (error) => {
              console.error(
                'Error al actualizar el estado en el servidor:',
                error
              );
            }
          );
          event.data.backColor = DataService.colors.yellow;
          dp.events.update(event);
        },
      },

      {
        text: 'En proceso',
        onClick: (args) => {
          const event = args.source;
          const dp = event.calendar;
          event.data.backColor = DataService.colors.gray;

          dp.events.update(event);
          this.taskService.editStatus(event.data.id, 'En proceso').subscribe(
            (response) => {
              console.log('Estado actualizado en el servidor:', response);
            },
            (error) => {
              console.error(
                'Error al actualizar el estado en el servidor:',
                error
              );
            }
          );
        },
      },
    ],
  });

  configNavigator: DayPilot.NavigatorConfig = {
    showMonths: 3,
    cellWidth: 25,
    cellHeight: 25,
    onVisibleRangeChanged: (args) => {
      this.loadEvents();
    },
  };

  selectTomorrow() {
    this.date = DayPilot.Date.today().addDays(1);
  }

  changeDate(date: DayPilot.Date): void {
    this.configDay.startDate = date;
    this.configWeek.startDate = date;
    this.configMonth.startDate = date;
  }

  configDay: DayPilot.CalendarConfig = {
    durationBarVisible: false,
    contextMenu: this.contextMenu,
    onTimeRangeSelected: this.onTimeRangeSelected.bind(this),
    onBeforeEventRender: this.onBeforeEventRender.bind(this),
    onEventClick: this.onEventClick.bind(this),
  };

  configWeek: DayPilot.CalendarConfig = {
    viewType: 'Week',
    durationBarVisible: false,
    contextMenu: this.contextMenu,
    onTimeRangeSelected: this.onTimeRangeSelected.bind(this),
    onBeforeEventRender: this.onBeforeEventRender.bind(this),
    onEventClick: this.onEventClick.bind(this),
  };

  configMonth: DayPilot.MonthConfig = {
    contextMenu: this.contextMenu,
    eventBarVisible: false,
    onTimeRangeSelected: this.onTimeRangeSelected.bind(this),
    onEventClick: this.onEventClick.bind(this),
  };

  ngAfterViewInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    const from = this.nav.control.visibleStart();
    const to = this.nav.control.visibleEnd();
    this.ds.getEvents(from, to).subscribe((result) => {
      this.events = result;
    });
  }

  viewDay(): void {
    this.configNavigator.selectMode = 'Day';
    this.configDay.visible = true;
    this.configWeek.visible = false;
    this.configMonth.visible = false;
  }

  viewWeek(): void {
    this.configNavigator.selectMode = 'Week';
    this.configDay.visible = false;
    this.configWeek.visible = true;
    this.configMonth.visible = false;
  }

  viewMonth(): void {
    this.configNavigator.selectMode = 'Month';
    this.configDay.visible = false;
    this.configWeek.visible = false;
    this.configMonth.visible = true;
  }

  onBeforeEventRender(args: any) {
    const dp = args.control;
    args.data.areas = [
      {
        top: 3,
        right: 3,
        width: 20,
        height: 20,
        symbol: 'assets/icons/daypilot.svg#minichevron-down-2',
        fontColor: '#fff',
        toolTip: 'Show context menu',
        action: 'ContextMenu',
      },
      {
        top: 3,
        right: 25,
        width: 20,
        height: 20,
        symbol: 'assets/icons/daypilot.svg#x-circle',
        fontColor: '#fff',
        action: 'None',
        toolTip: 'Delete event',
        onClick: async (args: any) => {
          dp.events.remove(args.source);

          this.taskService.deleteTask(args.source.data?.id).subscribe(
            (response) => {
              console.log('Tarea eliminada en el servidor:', response);
            },
            (error) => {
              console.error(
                'Error al eliminar la tarea en el servidor:',
                error
              );
            }
          );
        },
      },
    ];
  }

  async onTimeRangeSelected(args: any) {
    const modal = await DayPilot.Modal.prompt(
      'Crear nuevo evento en tu agenda:',
      'Evento'
    );
    const dp = args.control;
    dp.clearSelection();
    if (!modal.result) {
      return;
    }

    const newEvent = new DayPilot.Event({
      start: args.start,
      end: args.end,
      id: DayPilot.guid(),
      text: modal.result,
      backColor: DataService.colors.blue,
    });

    dp.events.add(newEvent);

    const userCreator = this.authService.getUserDataFromLocalStorage().id;
    const newTask = {
      start: newEvent.data.start.value,
      end: newEvent.data.end.value,
      title: newEvent.data.text,
      usercreator: userCreator,
      status: this.getColorForStatus(DataService.colors.blue),
    };

    try {
      const response = await this.taskService.createTask(newTask).toPromise();

      newEvent.data.id = response._id;

      dp.events.update(newEvent);
    } catch (error) {
      console.error('Error al crear la tarea:', error);
    }
  }

  async onEventClick(args: any) {
    const form = [
      { name: 'Titulo', id: 'text' },
      { name: 'Descripcion', id: 'description', type: 'textarea' },
      { name: 'Url de reunion', id: 'meetingUrl' },
      {
        name: 'Comienza',
        id: 'start',
        dateFormat: 'MM/dd/yyyy',
        type: 'datetime',
      },
      {
        name: 'Termina',
        id: 'end',
        dateFormat: 'MM/dd/yyyy',
        type: 'datetime',
      },
      {
        name: 'Estado',
        id: 'backColor',
        type: 'select',
        options: this.ds.getColors(),
      },
    ];
    const data = args.e.data;

    const modal = await DayPilot.Modal.form(form, data);

    if (modal.canceled) {
      return;
    }
    const eventId = data.id;
    let updatedEvent = modal.result;
    updatedEvent.backColor = this.getColorForStatus(modal.result.backColor);

    this.taskService.editTask(eventId, updatedEvent).subscribe(
      (response) => {
        console.log('Evento editado con éxito:', response);
        args.e.data.text = updatedEvent.text;
        args.e.data.description = updatedEvent.description;
        args.e.data.start = updatedEvent.start;
        args.e.data.end = updatedEvent.end;
        args.e.data.backColor = this.getStatusForColors(updatedEvent.backColor);
      },
      (error) => {
        console.error('Error al editar el evento:', error);
      }
    );
  }

  getColorForStatus = (status: string): string => {
    switch (status) {
      case DataService.colors.green:
        return 'Completa';
      case DataService.colors.yellow:
        return 'Alerta';
      case DataService.colors.red:
        return 'Cancelada';
      case DataService.colors.gray:
        return 'En proceso';
      case DataService.colors.blue:
        return 'Agendada';
      default:
        return '';
    }
  };

  getStatusForColors = (status: string): string => {
    switch (status) {
      case 'Completa':
        return DataService.colors.green;
      case 'Alerta':
        return DataService.colors.yellow;
      case 'Cancelada':
        return DataService.colors.red;
      case 'En proceso':
        return DataService.colors.gray;
      case 'Agendada':
        return DataService.colors.blue;
      default:
        return '';
    }
  };
}
