import { Component, OnInit } from '@angular/core';
import { Product } from '@app/models/product';
import { ProductService } from '@app/core/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  product: Product = new Product();

  isNew: Boolean = false

  heading: string = ''

  constructor(private productService: ProductService, 
    private route: ActivatedRoute, 
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.params.id;

    if (id === 'new') this.isNew = true
    else this.fetchProduct(id)

    this.heading = (this.isNew) ? 'Ny vare' : 'Ret oplysninger'
  }

  fetchProduct(id) {
    this.productService.getProductById(id).subscribe(product => {
      this.product = product
      this.product.id = id
    })
  }

  saveProduct() {
    if (this.isNew) {
      this.productService.saveProduct(this.product).then(() => {
        this.openSnackbar('Ny vare er gemt')
        this.router.navigate(['admin/products-list'])
      })
    } else {
      this.productService.updateProduct(this.product).then(() => {
        this.openSnackbar('Rettelser er gemt')
        this.router.navigate(['admin/products-list'])
      })
    }

  }

  openSnackbar(message: string) {
    this.snackBar.open(message, 'SUCCES', { duration: 700 })
  }
}
