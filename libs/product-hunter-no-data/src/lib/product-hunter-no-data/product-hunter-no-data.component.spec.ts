import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductHunterNoDataComponent } from './product-hunter-no-data.component';
import { ProductHunterServices } from '@product-daily-hunter/product-hunter-services';
import { signal } from '@angular/core';

describe('ProductHunterNoDataComponent', () => {
  let component: ProductHunterNoDataComponent;
  let fixture: ComponentFixture<ProductHunterNoDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductHunterNoDataComponent],
      providers: [
        {
          provide: ProductHunterServices,
          useValue: {
            errorTooManyRequest: signal(false),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductHunterNoDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
