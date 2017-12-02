import { Component, OnInit } from '@angular/core';
import { Product } from '@app/models/product';
import { ProductService } from '@app/core/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  product: Product = new Product();

  constructor(private productService: ProductService, private route: ActivatedRoute) {
    const id = this.route.snapshot.params.id;

    this.productService.getProductById(id).subscribe( product => {
      console.log(product)
      this.product = product
    })
   }

  ngOnInit() {
  }

  saveProduct() {
    console.log('saving product')
    
    this.productService.saveProduct(this.product)
  }
}
