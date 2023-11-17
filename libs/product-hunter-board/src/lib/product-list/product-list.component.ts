import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  WritableSignal,
  signal,
} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {
  ProductCategory,
  ProductPost,
} from '@product-daily-hunter/product-hunter-common';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'product-list',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    DatePipe,
    MatTooltipModule,
    MatButtonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent implements OnInit {
  productToList: WritableSignal<ProductPost[]> = signal([]);

  productCategoryForm = new FormControl('');
  private _productPosts: ProductPost[] = [];
  @Input()
  set productPosts(posts: ProductPost[]) {
    this._productPosts = posts;
    this.productToList.set(this.productPosts);
  }
  get productPosts() {
    return this._productPosts;
  }

  @Input() categories: ProductCategory[] = [];

  ngOnInit(): void {
    this.productCategoryForm.valueChanges.subscribe((data) => {
      if (data) {
        this.productToList.set(
          this.productPosts.filter((item) => {
            return item.topics.includes(data);
          })
        );
      } else {
        this.productToList.set(this.productPosts);
      }
    });
  }

  checkDetails(product: ProductPost) {
    window.open(product.url, '_blank');
  }
}
