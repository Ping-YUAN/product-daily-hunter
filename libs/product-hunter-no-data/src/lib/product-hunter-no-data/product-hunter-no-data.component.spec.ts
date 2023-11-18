import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductHunterNoDataComponent } from './product-hunter-no-data.component';

describe('ProductHunterNoDataComponent', () => {
  let component: ProductHunterNoDataComponent;
  let fixture: ComponentFixture<ProductHunterNoDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductHunterNoDataComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductHunterNoDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
