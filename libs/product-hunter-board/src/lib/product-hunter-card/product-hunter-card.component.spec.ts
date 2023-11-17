import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductHunterCardComponent } from './product-hunter-card.component';

describe('ProductHunterCardComponent', () => {
  let component: ProductHunterCardComponent;
  let fixture: ComponentFixture<ProductHunterCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductHunterCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductHunterCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
