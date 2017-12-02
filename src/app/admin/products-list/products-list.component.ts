import { Component, OnInit } from '@angular/core';
import { ProductService } from '@app/core/product.service';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs/Observable';
import { Product } from '@app/models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  displayedColumns = ['name', 'description', 'price', 'quantity' ]

  dataSource: UserDataSource

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {

    this.dataSource = new UserDataSource(this.productService);
  }

  selectRow(product) {
    
    this.router.navigate(['admin/edit-product', product.id])
  }

}

export class UserDataSource extends DataSource<any> {

  constructor(private productService: ProductService) {
    super();
  }

  connect(): Observable<Product[]> {
    return this.productService.getProducts();
  }

  disconnect() { }
}