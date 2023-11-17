import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProductHunterDatePickerComponent } from '@product-daily-hunter/product-hunter-date-picker';

@Component({
  selector: 'product-hunter-nav',
  standalone: true,
  imports: [
    CommonModule,
    MatTooltipModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    ProductHunterDatePickerComponent,
  ],
  templateUrl: './product-hunter-nav.component.html',
  styleUrls: ['./product-hunter-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductHunterNavComponent {
  @Output() changed = new EventEmitter<string>();
  onDateChanged($event) {
    this.changed.emit($event);
  }
}
