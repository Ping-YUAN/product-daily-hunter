import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductHunterDatePickerComponent } from './product-hunter-date-picker.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('ProductHunterDatePickerComponent', () => {
  let component: ProductHunterDatePickerComponent;
  let fixture: ComponentFixture<ProductHunterDatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProductHunterDatePickerComponent,
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
      providers: [provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductHunterDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should set previous day', () => {
    const currentDate = component['_date'].getDate();
    component.setPreviousDate();
    expect(component['_date'].getDate()).toEqual(currentDate - 1);
  });
  it('should set next day', () => {
    const currentDate = component['_date'].getDate();
    component.setNextDate();
    expect(component['_date'].getDate()).toEqual(currentDate + 1);
  });
});
