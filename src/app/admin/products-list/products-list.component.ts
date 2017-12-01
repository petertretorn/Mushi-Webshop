import { Component, OnInit } from '@angular/core';
import { ProductService } from '@app/core/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  constructor(private productService: ProductService) { }

  ngOnInit() {
  }

}
