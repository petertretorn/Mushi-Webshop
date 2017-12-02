import { Component, OnInit } from '@angular/core';
import { Product } from '@app/models/product';
import { ProductService } from '@app/core/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MatSnackBar } from '@angular/material';
import * as  firebase from 'firebase';
import { FileService } from '@app/core/file.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  uploadInProgress: Boolean
  file: File;
  product: Product = new Product();

  isNew: Boolean = false

  heading: string = ''

  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private fileService: FileService,
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

  handleFile(event) {

    if (!!this.product.imageUrl) {
      this.fileService.deleteFile(this.product.imageUrl)
    }

    let file = event.target.files[0]
    const name = file.name + new Date().getTime();
    
    file = new File([file], name, { type: file.type });

    this.uploadInProgress = true
    
    this.fileService.uploadFileToStorage(file).then(res => {
      this.product.imageUrl = res.metadata.downloadURLs[0]
      this.uploadInProgress = false
    })
  }

  openSnackbar(message: string) {
    this.snackBar.open(message, 'SUCCES', { duration: 1000 })
  }
}
