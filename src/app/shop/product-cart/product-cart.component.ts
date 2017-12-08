import { Product } from './../../models/product';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '@app/core/product.service';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent implements OnInit {

  @Input() product

  constructor(private router: Router) { }

  ngOnInit() {
    
  }

  gotoProductPage(id) {
    console.log(`id: ${id}`)
    this.router.navigate(['/product-page', id])
  }

}
