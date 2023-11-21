import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ProductHunterServices } from '@product-daily-hunter/product-hunter-services';

@Component({
  selector: 'product-hunter-no-data',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './product-hunter-no-data.component.html',
  styleUrls: ['./product-hunter-no-data.component.scss'],
})
export class ProductHunterNoDataComponent {
  get tooManyRequestError() {
    return this.service.errorTooManyRequest;
  }
  constructor(private service: ProductHunterServices) {}
}
