/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Component,
  Inject,
  InjectionToken,
  Input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Chart from 'chart.js/auto';
import { ProductCategory } from '@product-daily-hunter/product-hunter-common';

export function chartBuilder(id: string, options) {
  return new Chart.Chart(id, options);
}
export const ChartBuilderToken = new InjectionToken<typeof chartBuilder>(
  'chartBuilder'
);

@Component({
  selector: 'product-hunter-chart',
  standalone: true,
  imports: [CommonModule],
  providers: [{ provide: ChartBuilderToken, useValue: chartBuilder }],
  templateUrl: './product-hunter-chart.component.html',
  styleUrls: ['./product-hunter-chart.component.scss'],
})
export class ProductHunterChartComponent implements OnInit {
  chart: any = [];
  private data = {
    labels: ['Total Apps'],
    datasets: [
      {
        label: 'Total Apps',
        data: {},

        backgroundColor: '#ff4082',
      },
    ],
  };
  private _categories: ProductCategory[] = [];
  @Input()
  set categories(categories: ProductCategory[]) {
    if (categories) {
      this._categories = categories.slice(0, 10);
      this.data.labels = this._categories.map((item) => item.topic);
      this.data.datasets[0].data = this._categories.map((item) => item.count);
      this.chart.update();
    }
  }
  constructor(
    @Inject(ChartBuilderToken) private buildChart: typeof chartBuilder
  ) {}

  ngOnInit(): void {
    this.createChart();
  }
  createChart() {
    this.chart = this.buildChart('canvas', {
      type: 'bar',
      data: this.data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: false,
          },
        },
      },
    });
  }
}
