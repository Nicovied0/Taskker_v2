import { Component,EventEmitter,Input,Output } from '@angular/core';

@Component({
  selector: 'app-modal-view',
  templateUrl: './modal-view.component.html',
  styleUrls: ['./modal-view.component.scss']
})
export class ModalViewComponent {
  @Input() dataToView: any = [];
  @Output() modalviewClosed = new EventEmitter<void>();


  closeModal() {
    this.modalviewClosed.emit();
  }
}
