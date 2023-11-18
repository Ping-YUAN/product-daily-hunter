import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductHunterNavComponent } from '@product-daily-hunter/product-hunter-nav';
import { ProductHunterServices } from '@product-daily-hunter/product-hunter-services';
import { signal } from '@angular/core';

export class ServcieMock {
  isLoading = signal(false);
  targetDateChanged() {
    this.isLoading.set(true);
  }
}
describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterTestingModule, ProductHunterNavComponent],
      providers: [
        {
          provide: ProductHunterServices,
          useClass: ServcieMock,
        },
      ],
    }).compileComponents();
  });

  it(`should get isloading to be falsy`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.isLoading()).toBeFalsy();
  });

  it(`should get isloading to be true`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.onDateChanged({});
    expect(app.isLoading()).toBeTruthy();
  });
});
