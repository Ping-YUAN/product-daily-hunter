/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListComponent],
      providers: [provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    jest.spyOn(window, 'open').mockImplementation();
    component.checkDetails({ url: './' } as any);
    expect(window.open).toHaveBeenCalled();
  });

  it('should filter according to the select', () => {
    component.productPosts = [
      {
        id: 425542,
        name: 'Cypher',
        slug: 'cypher-3',
        discription: 'Meet your AI self',
        topics: ['messaging', 'artificial-intelligence', 'entertainment'],
        commentsCount: 286,
        votesCount: 575,
        url: 'https://www.producthunt.com/r/p/425542',
      },
    ];
    component.categories = [{ topic: 'messaging', count: 1 }];

    component.productCategoryForm.patchValue('');
    expect(component.productToList().length).toBe(1);
    component.productCategoryForm.patchValue('ss');
    expect(component.productToList().length).toBe(0);
  });
});
