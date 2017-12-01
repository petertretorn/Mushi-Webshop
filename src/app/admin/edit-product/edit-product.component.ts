import { Component, OnInit } from '@angular/core';
import { Product } from '@app/models/product';
import { ProductService } from '@app/core/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  product: Product = new Product();

  constructor(private productService: ProductService) { }

  ngOnInit() {
  }

  saveProduct() {
    console.log('saving product')
    
    this.productService.saveProduct(this.product)
  }
}
