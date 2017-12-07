import { ProductService } from '@app/core/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '@app/models/product';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})
export class ProductListingComponent implements OnInit {

  products: Product[]

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe( products => {
      this.products = products
    })
  }

}
