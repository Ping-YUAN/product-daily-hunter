import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'product-hunter-no-data',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './product-hunter-no-data.component.html',
  styleUrls: ['./product-hunter-no-data.component.scss'],
})
export class ProductHunterNoDataComponent {}
