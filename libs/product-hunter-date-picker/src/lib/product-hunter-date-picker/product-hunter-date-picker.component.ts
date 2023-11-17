import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'product-hunter-date-picker',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTooltipModule,
  ],
  templateUrl: './product-hunter-date-picker.component.html',
  styleUrls: ['./product-hunter-date-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ProductHunterDatePickerComponent implements OnInit {
  private _date!: Date;

  dateToView!: FormControl;

  @Output() changed = new EventEmitter<string>();

  ngOnInit(): void {
    this.dateToView = new FormControl();
    this.dateToView.valueChanges.subscribe((_data) => {
      this.changed.emit(_data);
    });
    this.setCurrentDate();
  }

  setPreviousDate() {
    const previousDay = new Date(this._date);
    previousDay.setDate(previousDay.getDate() - 1);
    this.setDate(previousDay);
  }

  setNextDate() {
    const nextDay = new Date(this._date);
    nextDay.setDate(nextDay.getDate() + 1);
    this.setDate(nextDay);
  }

  setCurrentDate() {
    this.setDate(new Date());
  }

  setDate(date: Date) {
    this._date = date;
    this.dateToView.setValue(this._date);
  }
}
