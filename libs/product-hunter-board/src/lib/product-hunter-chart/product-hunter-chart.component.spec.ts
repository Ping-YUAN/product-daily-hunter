import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ProductHunterChartComponent,
  ChartBuilderToken,
} from './product-hunter-chart.component';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class Chart {
  public canvas;
  public options;
  public data;
  // this is not a complete mock. You may need to mock other properties as well.

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public constructor(canvas: any, options: any) {
    this.canvas = canvas;
    this.options = options;
    this.data = options.data;
  }
  update() {}
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).Chart = Chart;

describe('ProductHunterChartComponent', () => {
  let component: ProductHunterChartComponent;
  let fixture: ComponentFixture<ProductHunterChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductHunterChartComponent],
      providers: [
        {
          provide: ChartBuilderToken,
          useValue: new Chart(null, { data: null }),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductHunterChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.chart.update = jest.fn();
    component.categories = [
      {
        topic: 'test',
        count: 4,
      },
    ];
    expect(component).toBeTruthy();
  });
});
