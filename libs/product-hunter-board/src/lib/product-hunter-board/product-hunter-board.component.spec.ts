import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductHunterBoardComponent } from './product-hunter-board.component';
import { Component, signal } from '@angular/core';
import { ProductHunterServices } from '@product-daily-hunter/product-hunter-services';
import { of } from 'rxjs';
import { provideAnimations } from '@angular/platform-browser/animations';

class ServcieMock {
  isLoading = signal(false);
  targetDateChanged() {
    this.isLoading.set(true);
  }
  getLoadedProducts() {
    return of([
      {
        id: '425542',
        name: 'Cypher',
        slug: 'cypher-3',
        discription: 'Meet your AI self',
        topics: ['messaging', 'artificial-intelligence', 'entertainment'],
        commentsCount: 286,
        votesCount: 575,
        url: 'https://www.producthunt.com/r/p/425542',
      },
    ]);
  }
}

@Component({
  selector: 'product-hunter-chart',
  template: '<p></p>',
  standalone: true,
})
class MockChartComponent {}

describe('ProductHunterBoardComponent', () => {
  let component: ProductHunterBoardComponent;
  let fixture: ComponentFixture<ProductHunterBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductHunterBoardComponent, MockChartComponent],
      providers: [
        {
          provide: ProductHunterServices,
          useClass: ServcieMock,
        },
        provideAnimations(),
      ],
      declarations: [],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductHunterBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
