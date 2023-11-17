import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  selector: 'product-hunter-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTooltipModule],
  templateUrl: './product-hunter-card.component.html',
  styleUrls: ['./product-hunter-card.component.scss'],
})
export class ProductHunterCardComponent {
  @Input() bannerName = '';
  @Input() bannerText = '';
  @Input() bannerTooltip = '';
}
