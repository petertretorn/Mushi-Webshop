import { Component, OnInit } from '@angular/core';
import { ProductService } from '@app/core/product.service';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs/Observable';
import { Product } from '@app/models/product';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  products: Product[]

  displayedColumns = ['name', 'description', 'price', 'quantity']

  constructor(public productService: ProductService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {

    this.productService.getProducts().subscribe(products => {
      this.products = products
      console.log('got products')
    })
  }

  deleteProduct(id) {
    this.productService.deleteProduct(id).then(() => {
      this.snackBar.open('Vare er slettet', 'SUCCES', { duration: 700 })
    })
  }
}