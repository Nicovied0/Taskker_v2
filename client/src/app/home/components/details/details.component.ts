import { Component } from '@angular/core';
import { FinancePersonalService } from 'src/app/core/services/FinancePersonal.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent {
  cards: any;

  constructor(private financePersonalService: FinancePersonalService) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.financePersonalService.getData().subscribe(
      (data) => {
        this.cards = data;
      },
      (error) => {
        console.error('Error in get Data', error);
      }
    );
  }
}
