/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/internal/Subject';
import { ProductPost } from '@product-daily-hunter/product-hunter-common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductHunterServices {
  private products!: ProductPost[];
  private productsSubject$ = new Subject<ProductPost[]>();

  isLoading = signal(true);
  errorFromBackend = signal(false);
  errorTooManyRequest = signal(false);

  constructor(private httpClient: HttpClient) {}

  getLoadedProducts(): Observable<ProductPost[]> {
    return this.productsSubject$;
  }

  targetDateChanged(date: Date) {
    const getDateString = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
    this.getReleasedProductByDate(getDateString);
  }

  getReleasedProductByDate(dateString: string) {
    this.isLoading.set(true);
    this.clearErrorInfo();
    this.httpClient.get(`/api/products/${dateString}`).subscribe({
      next: (data) => {
        this.products = (data as any).posts;
        this.productsSubject$.next(this.products);
        this.isLoading.set(false);
      },
      error: (err) => {
        if (err.status === 429) {
          this.errorTooManyRequest.set(true);
        }
        this.errorFromBackend.set(true);
      },
    });
  }

  clearErrorInfo() {
    this.errorFromBackend.set(false);
    this.errorTooManyRequest();
  }
}
