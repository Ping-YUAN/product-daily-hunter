import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductHunterNavComponent } from '@product-daily-hunter/product-hunter-nav';
import { ProductHunterServices } from '@product-daily-hunter/product-hunter-services';
import { ProductHunterBoardComponent } from '@product-daily-hunter/product-hunter-board';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProductHunterNoDataComponent } from '@product-daily-hunter/product-hunter-no-data';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    MatProgressBarModule,
    ProductHunterNavComponent,
    ProductHunterBoardComponent,
    ProductHunterNoDataComponent,
  ],
  selector: 'product-daily-hunter-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  get isLoading() {
    return this.productHunterServices.isLoading;
  }
  get error() {
    return this.productHunterServices.errorFromBackend;
  }
  constructor(private productHunterServices: ProductHunterServices) {}

  onDateChanged($event) {
    this.productHunterServices.targetDateChanged($event);
  }
}
