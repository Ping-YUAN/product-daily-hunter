/* eslint-disable @typescript-eslint/no-unused-vars */
import { ProductHunterServices } from './product-hunter-services.service';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
describe('product hunter servies', () => {
  let service: ProductHunterServices;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [],
    });
    service = TestBed.inject(ProductHunterServices);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
    service.getLoadedProducts().subscribe((data) => {
      expect(data.length).toBe(0);
    });
  });

  it('should test set targetdate ', () => {
    service.targetDateChanged(new Date());
    service.getLoadedProducts().subscribe((data) => {
      expect(data).toBeGreaterThan(0);
    });

    const productPosts = {
      posts: [
        {
          id: '425759',
          name: 'PomoTimer',
          slug: 'pomotimer-2',
          discription: 'Your focus time buddy to boost your productivity',
          topics: ['productivity', 'task-management', 'time-tracking'],
          commentsCount: 2,
          votesCount: 8,
          url: 'https://www.producthunt.com/r/p/425759',
        },
      ],
      pageInfo: {
        endCursor: 'NDQ',
        hasNextPage: false,
        totalCount: 1,
      },
    };
    const today = new Date();
    const dateString = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;

    const req = httpMock.expectOne(`/api/products/${dateString}`);
    req.flush(productPosts);

    expect(req.request.method).toBe('GET');
  });
});
