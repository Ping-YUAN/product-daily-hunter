import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductHunterNavComponent } from './product-hunter-nav.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('ProductHunterNavComponent', () => {
  let component: ProductHunterNavComponent;
  let fixture: ComponentFixture<ProductHunterNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductHunterNavComponent, BrowserDynamicTestingModule],
      providers: [provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductHunterNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
