import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductHunterServices } from '@product-daily-hunter/product-hunter-services';
import {
  ProductCategory,
  ProductPost,
} from '@product-daily-hunter/product-hunter-common';
import { ProductHunterCardComponent } from '../product-hunter-card/product-hunter-card.component';
import { Observable, of, tap } from 'rxjs';
import { ProductHunterChartComponent } from '../product-hunter-chart/product-hunter-chart.component';

@Component({
  selector: 'product-hunter-board',
  standalone: true,
  imports: [
    CommonModule,
    ProductHunterChartComponent,
    ProductListComponent,
    ProductHunterCardComponent,
  ],
  templateUrl: './product-hunter-board.component.html',
  styleUrls: ['./product-hunter-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductHunterBoardComponent implements OnInit {
  products$!: Observable<ProductPost[]>;
  productCategories$!: Observable<ProductCategory[]>;
  hottestCategory$: Observable<ProductCategory> = of({ topic: '', count: 0 });
  totalApp$!: Observable<number>;
  mostVotedApp$!: Observable<string>;
  mostCommentApp$!: Observable<string>;

  constructor(private productApi: ProductHunterServices) {}

  ngOnInit(): void {
    this.products$ = this.productApi.getLoadedProducts().pipe(
      tap((data) => {
        this.generateAnalyzedData(data);
      })
    );
  }
  generateAnalyzedData(products: ProductPost[]): void {
    const categoryMap: Map<string, number> = new Map<string, number>();

    let mostVotedApp = '';
    let appVoteMax = 0;

    let mostCommentApp = '';
    let appCommentMax = 0;

    let hottestCategory = '';
    let categoryMax = 0;

    products.forEach((post) => {
      if (post.commentsCount > appCommentMax) {
        appCommentMax = post.commentsCount;
        mostCommentApp = post.name;
      }
      if (post.votesCount > appVoteMax) {
        appVoteMax = post.votesCount;
        mostVotedApp = post.name;
      }
      post.topics.forEach((topic) => {
        const topicCount =
          categoryMap.has(topic) && categoryMap.get(topic)
            ? (categoryMap.get(topic) ?? 0) + 1
            : 1;
        categoryMap.set(topic, topicCount);

        if (topicCount > categoryMax) {
          categoryMax = topicCount;
          hottestCategory = topic;
        }
      });
    });
    const categories: ProductCategory[] = [];
    categoryMap.forEach((value, key) => {
      categories.push({
        topic: key,
        count: value,
      });
    });

    this.productCategories$ = of(categories.sort((a, b) => b.count - a.count));
    this.totalApp$ = of(products.length);
    this.mostVotedApp$ = of(mostVotedApp);
    this.mostCommentApp$ = of(mostCommentApp);
    this.hottestCategory$ = of({
      topic: hottestCategory,
      count: categoryMax,
    });
  }
}
