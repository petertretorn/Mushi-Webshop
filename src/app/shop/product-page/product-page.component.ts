import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '@app/core/product.service';
import { Product } from '@app/models/product';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  product: Product = new Product();

  constructor(private router: Router, private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit() {

    const id = this.route.snapshot.params.id;

    const subscription = this.productService.getProductById(id).subscribe(product => {
      this.product = product
      this.product.id = id
      subscription.unsubscribe()

      this.product.description = !!this.product.description
        ? this.product.description.replace(new RegExp('\n', 'g'), "<br />")
        : ''

      this.product.instruction = !!this.product.instruction
        ? this.product.instruction.replace(new RegExp('\n', 'g'), "<br />")
        : ''


    })
  }


}
