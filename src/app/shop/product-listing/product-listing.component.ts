import { ProductService } from '@app/core/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '@app/models/product';
import { ShoppingCartService } from '@app/core/shopping-cart.service';
import { CategoryService } from '@app/core/category.service';
import { Category } from '@app/models/category.model';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})
export class ProductListingComponent implements OnInit {

  products: Product[]

  categories: Category[]

  constructor(
    private productService: ProductService,
    public cartService: ShoppingCartService,
    public categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories

      this.productService.getProducts().subscribe(products => {
        this.products = products.sort(  (p1, p2) => {
          return (p1.name === 'Mushi Mushi te') ? -1 : 1
        })
        this.addCategories(this.products)
      })
    })
  }

  addCategories(products: Product[]) {
    products.forEach(product => {
      product.category = (!!product.categoryId) 
        ? this.categories.filter(c => product.categoryId === c.id)[0].displayName  
        : ''
    })
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

}
